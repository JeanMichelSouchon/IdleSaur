import { DinosaurAction } from '../models/dinosaur-action.enum';
import { DinosaurEvent } from '../models/dinosaur-event.interface';
import { DinosaurActionsMap } from '../libs/dinosaur-actions.mapping';
import { DinosaurActionDTO } from '../models/dinosaur-action.dto';
import { FrontendDinosaurDTO } from '../models/frontend-dinosaur.dto';
import { DynamicEventRepository } from '../repositories/dynamic-event.repository';
import { DynamicEvent } from '../models/dynamic-event';
import { AfterlifeService } from './afterlife.service';
import { DinosaurFactory } from '../factories/dinosaur.factory';
import { getExperienceThresholdForLevel } from '../utils/levelThresholds';
import { DynamicEventData } from '../models/dynamic-event-data.interface';

/**
 * Service pour gérer les événements liés aux actions du dinosaure.
 * Il encapsule la logique pour :
 * - Récupérer les actions disponibles pour un dinosaure,
 * - Sélectionner un événement dynamique adapté à une action,
 * - Appliquer les effets de l'événement sur le dinosaure,
 * - Gérer la résurrection en enregistrant l'historique de vie (afterlife).
 */
export class DinosaurEventService {
  private dynamicEventRepo: DynamicEventRepository;
  private afterlifeService: AfterlifeService;
  private dinosaurFactory: DinosaurFactory;

  /**
   * Constructeur du service.
   * @param dynamicEventRepo Instance du repository pour les événements dynamiques.
   * @param afterlifeService Instance du service afterlife pour enregistrer l'historique des vies.
   * @param dinosaurFactory Instance de la factory pour la résurrection du dinosaure.
   */
  constructor(
    dynamicEventRepo: DynamicEventRepository,
    afterlifeService: AfterlifeService,
    dinosaurFactory: DinosaurFactory
  ) {
    this.dynamicEventRepo = dynamicEventRepo;
    this.afterlifeService = afterlifeService;
    this.dinosaurFactory = dinosaurFactory;
  }

  /**
   * Retourne la liste des actions disponibles pour le dinosaure,
   * chaque action étant encapsulée dans un DinosaurActionDTO.
   * @param dinosaur Le dinosaure concerné.
   * @returns La liste des actions disponibles.
   */
  public getAvailableActions(dinosaur: FrontendDinosaurDTO): DinosaurActionDTO[] {
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
   * Sélectionne aléatoirement un événement pour une action donnée en utilisant le système "loi de l'attraction".
   * La fonction normalise les scores de positivité de l'ensemble des événements éligibles (échelle 0–100),
   * convertit le luck factor du dinosaure en échelle 0–100, puis module le poids initial de chaque événement
   * en fonction de la proximité entre son score relatif et la chance du joueur.
   * 
   * Ainsi, le dinosaure "attire" les événements dont le score est le plus proche de sa chance.
   *
   * @param action L'action effectuée.
   * @param dinosaur Le dinosaure courant (DTO), qui doit inclure la propriété luck_factor.
   * @returns Une promesse résolvant l'événement dynamique généré.
   */
  public async getRandomEventForAction(
    action: DinosaurAction,
    dinosaur: FrontendDinosaurDTO
  ): Promise<DinosaurEvent> {
    // Récupérer tous les templates dynamiques pour l'action donnée
    const dynamicEventsData = await this.dynamicEventRepo.getDynamicEventsByAction(action);

    // Filtrer ceux dont le niveau minimum est inférieur ou égal au niveau du dinosaure
    const eligibleTemplates = dynamicEventsData.filter(eventData => eventData.minLevel <= dinosaur.level);
    if (eligibleTemplates.length === 0) {
      throw new Error(`Aucun event dynamique disponible pour l'action ${action} et le niveau ${dinosaur.level}`);
    }

    // Pour ajouter temporairement des propriétés de calcul, on étend l'interface DynamicEventData
    interface EnhancedDynamicEventData extends DynamicEventData {
      relativePositivity: number; // Score de positivité normalisé entre 0 et 100
      adjustedWeight: number;     // Poids modulé par la proximité avec la chance du joueur
    }

    // Création d'un tableau d'objets étendus
    const enhancedTemplates: EnhancedDynamicEventData[] = eligibleTemplates.map(eventData => ({
      ...eventData,
      relativePositivity: 0,
      adjustedWeight: 0,
    }));

    // 1. Normalisation des scores de positivité
    // On extrait les positivityScore et on calcule le min et le max
    const positivityScores = enhancedTemplates.map(e => e.positivityScore);
    const minPositivity = Math.min(...positivityScores);
    const maxPositivity = Math.max(...positivityScores);
    const rangePositivity = maxPositivity - minPositivity;

    enhancedTemplates.forEach(eventData => {
      // Si tous les events ont le même score, on leur attribue une valeur neutre (50)
      eventData.relativePositivity = rangePositivity === 0 
        ? 50 
        : ((eventData.positivityScore - minPositivity) / rangePositivity) * 100;
    });

    // 2. Conversion du luck factor du dinosaure en échelle 0–100.
    // On suppose ici que dinosaur.luck_factor est initialement entre 0 et 1.
    const playerLuck = dinosaur.final_luck_factor * 100;

    // 3. Calcul de la distance maximale parmi les scores relatifs (pour normaliser la différence)
    const relativeScores = enhancedTemplates.map(e => e.relativePositivity);
    const minRelative = Math.min(...relativeScores);
    const maxRelative = Math.max(...relativeScores);
    const maxDistance = maxRelative - minRelative || 1; // pour éviter une division par zéro

    // 4. Calcul du poids ajusté pour chaque événement
    // Plus la distance entre le score relatif de l'événement et playerLuck est faible, plus le facteur de modulation est proche de 1.
    enhancedTemplates.forEach(eventData => {
      let modulationFactor: number;
      if (rangePositivity === 0) {
        // Tous les événements ont le même score, on ne module pas le poids
        modulationFactor = 1;
      } else {
        const distance = Math.abs(eventData.relativePositivity - playerLuck);
        modulationFactor = 1 - (distance / maxDistance);
      }
      eventData.adjustedWeight = eventData.weight * modulationFactor;
    });    

    // Vérifier que la somme des poids ajustés est supérieure à 0
    const totalAdjustedWeight = enhancedTemplates.reduce((sum, eventData) => sum + eventData.adjustedWeight, 0);
    if (totalAdjustedWeight <= 0) {
      throw new Error('Aucun event dynamique n\'a un poids ajusté supérieur à 0.');
    }

    // 5. Sélection pondérée avec les poids ajustés
    let randomWeight = Math.random() * totalAdjustedWeight;
    let chosenTemplate: EnhancedDynamicEventData = enhancedTemplates[enhancedTemplates.length - 1];
    for (const eventData of enhancedTemplates) {
      if (randomWeight < eventData.adjustedWeight) {
        chosenTemplate = eventData;
        break;
      }
      randomWeight -= eventData.adjustedWeight;
    }

    // Générer l'événement final à partir du template choisi.
    const dynamicEvent = new DynamicEvent(chosenTemplate);
    return dynamicEvent.generateEvent(dinosaur.level);
  }


  /**
   * Applique les effets d'un événement au dinosaure en utilisant les modifiers définis dans l'événement.
   * Pour l'action "Resurrect", la méthode :
   * - Enregistre l'historique de vie via l'AfterlifeService,
   * - Délègue la résurrection à la DinosaurFactory.
   * 
   * Pour les autres actions, chaque modifier est appliqué sur la propriété correspondante du dinosaure :
   * - 'additive' : la valeur est ajoutée.
   * - 'multiplicative' : la valeur multiplie la valeur courante.
   * 
   * Une table de correspondance (targetMapping) permet de faire le lien entre le target du modifier et la propriété du DTO.
   * 
   * Après application des modifiers, la méthode gère la montée de niveau et l'ajout des skill points.
   * 
   * @param dinosaur Le DTO du dinosaure à mettre à jour.
   * @param action L'action effectuée.
   * @param event L'événement à appliquer.
   * @returns Une promesse résolvant le dinosaure mis à jour.
   */
  public async applyEventToDinosaur(
    dinosaur: FrontendDinosaurDTO,
    action: DinosaurAction,
    event: DinosaurEvent,
    isAdmin: boolean = false
  ): Promise<FrontendDinosaurDTO> {
    if (action === DinosaurAction.Resurrect) {
      // Enregistrer l'historique de vie avant résurrection
      await this.afterlifeService.processAfterlife(dinosaur);
      // Utiliser la factory injectée pour ressusciter le dinosaure
      return await this.dinosaurFactory.resurrectDinosaur(dinosaur, isAdmin);
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
      weapons: "weapons",
      armors: "armors",
      friends: "friends",
      employees: "employees"
    } as const;

    // Appliquer chaque modifier de l'événement
    for (const modifier of event.modifiers) {
      const targetProperty = targetMapping[modifier.target];
      if (!targetProperty) {
        continue;
      }
      // Accéder à la propriété du dinosaure
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
      experienceThreshold = getExperienceThresholdForLevel(dinosaur.level + 1);
    }

    // Plafonner certaines valeurs selon les bornes définies dans le DTO
    dinosaur.food = Math.min(dinosaur.food, dinosaur.final_max_food);
    dinosaur.energy = Math.max(dinosaur.energy, 0);
    dinosaur.hunger = Math.max(dinosaur.hunger, 0);
    dinosaur.karma = Math.max(-dinosaur.karma_width, Math.min(dinosaur.karma, dinosaur.karma_width));

    return dinosaur;
  }
}
