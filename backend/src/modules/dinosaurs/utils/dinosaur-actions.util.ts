import { DinosaurAction } from '../models/dinosaur-action.enum';
import { DinosaurEvent } from '../models/dinosaur-event.interface';
import { DinosaurActionsMap } from '../libs/dinosaur-actions.mapping';
import {
  BASE_EXP_REQUIRED,
  EXP_ADDITIONAL_PER_TEN_LEVEL,
  EXP_ADDITIONAL_STEP,
  EXP_ADDITIONAL_FACTOR,
  EXP_ADDITIONAL_FACTOR_STEP,
  LEVEL_MAX,
  SKILL_POINTS_EARNING_BASE,
  SKILL_POINTS_EARNING_ADDITIONAL,
  SKILL_POINTS_EARNING_ADDITIONAL_STEP,
  SKILL_POINT_ADDITIONAL_FACTOR_STEP,
  SKILL_POINTS_EARNING_ADDITIONAL_FACTOR
} from '../../../common/config/leveling.constants';
import { DinosaurActionDTO } from '../models/dinosaur-action.dto';
import { DinosaurFactory } from '../factories/dinosaur.factory';
import { FrontendDinosaurDTO } from '../models/frontend-dinosaur.dto';
import { DynamicEventRepository } from '../repositories/dynamic-event.repository';
import { DynamicEvent } from '../models/dynamic-event';

/**
 * Retourne la liste des actions disponibles pour le dinosaure,
 * chaque action étant encapsulée dans un DinosaurActionDTO.
 */
export function getAvailableActions(dinosaur: FrontendDinosaurDTO): DinosaurActionDTO[] {
  return Object.values(DinosaurActionsMap).map((actionDetails) => {
    const canPerform = actionDetails.canPerform(dinosaur);
    return new DinosaurActionDTO(
      actionDetails.name,
      actionDetails.description,
      actionDetails.levelRequired,
      canPerform,
      actionDetails.endpoint,
      actionDetails.image
    );
  });
}

/**
 * Sélectionne aléatoirement un event pour une action donnée en utilisant le système dynamique.
 * Cette fonction utilise le DynamicEventRepository pour récupérer les templates dynamiques,
 * filtre ceux éligibles selon le niveau du dinosaure, effectue une sélection pondérée et
 * génère l'événement final via la classe DynamicEvent.
 *
 * @param action L'action effectuée.
 * @param dinosaurLevel Le niveau du dinosaure.
 * @returns Une promesse résolvant l'événement dynamique généré.
 */
export async function getRandomEventForAction(
  action: DinosaurAction,
  dinosaurLevel: number
): Promise<DinosaurEvent> {
  const repo = new DynamicEventRepository();

  await repo.seedDynamicEventsIfEmpty();

  // Récupérer tous les templates dynamiques pour l'action donnée
  const dynamicEventsData = await repo.getDynamicEventsByAction(action);
  // Filtrer ceux dont le niveau minimum est inférieur ou égal au niveau du dinosaure
  const eligibleTemplates = dynamicEventsData.filter(eventData => eventData.minLevel <= dinosaurLevel);
  if (eligibleTemplates.length === 0) {
    throw new Error(`Aucun event dynamique disponible pour l'action ${action} et le niveau ${dinosaurLevel}`);
  }
  // Sélection pondérée selon le champ weight
  const totalWeight = eligibleTemplates.reduce((sum, eventData) => sum + eventData.weight, 0);
  let randomWeight = Math.random() * totalWeight;
  let chosenTemplate = eligibleTemplates[eligibleTemplates.length - 1];
  for (const eventData of eligibleTemplates) {
    if (randomWeight < eventData.weight) {
      chosenTemplate = eventData;
      break;
    }
    randomWeight -= eventData.weight;
  }
  // Générer l'event final à partir du template choisi
  const dynamicEvent = new DynamicEvent(chosenTemplate);
  return dynamicEvent.generateEvent(dinosaurLevel);
}

/**
 * Applique les effets d'un event au dinosaure en utilisant les modifiers définis dans l'event.
 * Pour l'action "Resurrect", la délégation se fait vers la factory.
 * 
 * Chaque modifier est appliqué sur la propriété correspondante du dinosaure :
 * - S'il est de type 'additive', la valeur est ajoutée.
 * - S'il est de type 'multiplicative', la valeur est utilisée pour multiplier la valeur courante.
 * 
 * Une table de correspondance (targetMapping) permet de faire le lien entre le target du modifier
 * et la propriété du FrontendDinosaurDTO.
 * 
 * Après application des modifiers, la fonction gère la montée de niveau et l'ajout des skill points.
 * 
 * @param dinosaur Le DTO du dinosaure à mettre à jour.
 * @param action L'action effectuée.
 * @param event L'événement à appliquer.
 * @returns Une promesse résolvant le dinosaure mis à jour.
 */
export async function applyEventToDinosaur(
    dinosaur: FrontendDinosaurDTO,
    action: DinosaurAction,
    event: DinosaurEvent
  ): Promise<FrontendDinosaurDTO> {
    // Pour l'action de résurrection, déléguer à la factory
    if (action === DinosaurAction.Resurrect) {
      return await DinosaurFactory.resurrectDinosaur(dinosaur);
    }

  // Table de correspondance entre le target du modifier et la propriété du DTO
  const targetMapping = {
    energy: "energy",
    food: "food",
    hunger: "hunger",
    experience: "experience",
    karma: "karma",
    money: "money",
    skillPoints: "skill_points",
  } as const;

  // Appliquer chaque modifier de l'événement
  for (const modifier of event.modifiers) {
    const targetProperty = targetMapping[modifier.target];
    if (!targetProperty) {
      console.warn(`Modifier target "${modifier.target}" non reconnu`);
      continue;
    }
    // Utiliser une conversion vers Record<string, any> pour accéder à la propriété
    const dinosaurRecord = dinosaur as Record<string, any>;
    const currentValue = dinosaurRecord[targetProperty] as number;
    let newValue = currentValue;
    if (modifier.type === 'additive') {
      newValue = currentValue + modifier.value;
    } else if (modifier.type === 'multiplicative') {
      newValue = currentValue * modifier.value;
    }
    dinosaurRecord[targetProperty] = newValue;
  }

  // Gestion de la montée de niveau et gain de skill points
  let experienceThreshold = getExperienceThresholdForLevel(dinosaur.level + 1);
  while (dinosaur.experience >= experienceThreshold) {
    dinosaur.level += 1;
    dinosaur.experience -= experienceThreshold;
    dinosaur.skill_points += getSkillPointsForLevel(dinosaur.level);
    experienceThreshold = getExperienceThresholdForLevel(dinosaur.level + 1);
  }

  // Plafonner certaines valeurs selon les bornes définies dans le DTO
  dinosaur.food = Math.min(dinosaur.food, dinosaur.final_max_food);
  dinosaur.energy = Math.max(dinosaur.energy, 0);
  dinosaur.hunger = Math.max(dinosaur.hunger, 0);
  dinosaur.karma = Math.max(-dinosaur.karma_width, Math.min(dinosaur.karma, dinosaur.karma_width));

  return dinosaur;
}

/**
 * Calcule le seuil d'expérience nécessaire pour atteindre un niveau donné.
 * @param level Le niveau pour lequel on calcule le seuil.
 * @returns Le seuil d'expérience requis.
 */
export function getExperienceThresholdForLevel(level: number): number {
  if (level > LEVEL_MAX) level = LEVEL_MAX;

  return Math.floor(
    BASE_EXP_REQUIRED +
    Math.floor(level / EXP_ADDITIONAL_STEP) * EXP_ADDITIONAL_PER_TEN_LEVEL +
    Math.floor(level / EXP_ADDITIONAL_FACTOR_STEP) * BASE_EXP_REQUIRED * EXP_ADDITIONAL_FACTOR
  );
}

/**
 * Calcule le nombre de skill points gagnés lors de la montée en niveau.
 * @param level Le niveau atteint.
 * @returns Le nombre de skill points à ajouter.
 */
export function getSkillPointsForLevel(level: number): number {
  if (level > LEVEL_MAX) level = LEVEL_MAX;

  return Math.floor(
    SKILL_POINTS_EARNING_BASE +
    Math.floor(level / SKILL_POINTS_EARNING_ADDITIONAL_STEP) * SKILL_POINTS_EARNING_ADDITIONAL +
    Math.floor(level / SKILL_POINT_ADDITIONAL_FACTOR_STEP) * SKILL_POINTS_EARNING_BASE * SKILL_POINTS_EARNING_ADDITIONAL_FACTOR
  );
}
