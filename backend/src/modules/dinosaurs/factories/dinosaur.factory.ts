import { DINOSAUR_CONSTANTS } from '../../../common/config/dinosaur.constants';
import { DatabaseDinosaur } from '../models/database-dinosaur.interface';
import { DinosaurType } from '../models/dinosaur-type.interface';
import { DinosaurDiet } from '../models/dinosaur-diet.interface';
import { Epoch } from '../models/epoch.enum';
import { DinosaurRepository } from '../repositories/dinosaur.repository';
import { FrontendDinosaurDTO } from '../models/frontend-dinosaur.dto';
import { DinosaurEvent } from '../models/dinosaur-event.interface';
import { StatModifier } from '../models/stats-modifiers.types';

/**
 * Extrait la valeur d'un modificateur ciblant une propriété donnée.
 * @param modifiers Tableau de modificateurs.
 * @param target La propriété ciblée (ex: "base_max_energy").
 * @returns La valeur trouvée ou 0.
 */
const getModifierValue = (
  modifiers: { target: string; type: string; value: number; source: string }[],
  target: string
): number => {
  const mod = modifiers.find(m => m.target === target);
  return mod ? mod.value : 0;
};

/**
 * Retourne un nom de dinosaure aléatoire.
 */
const generateRandomName = (): string => {
  const names: string[] = [
    'Rex', 'Bella', 'Spike', 'Tina', 'Dino', 'Luna',
    'Thor', 'Milo', 'Zara', 'Rocky', 'Sasha', 'Leo',
    'Nina', 'Gus', 'Ruby', 'Max', 'Maya', 'Oscar',
    'Charlie', 'Lily', 'Buddy', 'Molly', 'Jack', 'Daisy',
    'Toby', 'Sadie', 'Buster', 'Chloe', 'Bear', 'Coco',
    'Duke', 'Penny', 'Murphy', 'Rosie', 'Zeus', 'Gracie',
    'Sam', 'Abby'
  ];
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
};

/**
 * Calcule une statistique finale en appliquant des modificateurs.
 * @param base La valeur de base.
 * @param modifiers Les modificateurs à appliquer.
 * @returns La valeur finale.
 */
const calculateFinalStat = (base: number, modifiers: StatModifier[]): number => {
  let additive = 0;
  let multiplicative = 1;
  modifiers.forEach(mod => {
    if (mod.type === 'additive') {
      additive += mod.value;
    } else if (mod.type === 'multiplicative') {
      multiplicative *= (1 + mod.value);
    }
  });
  return (base + additive) * multiplicative;
};

/**
 * 
 * @param level 
 * @returns 
 */
const getLevelModifiers = (level: number): StatModifier[] => {
  if (level <= 1) return [];
  const factor = 0.05 * (level - 1);
  return [
    { source: "level", type: "multiplicative", value: factor, target: "base_max_energy" },
    { source: "level", type: "multiplicative", value: factor, target: "base_max_food" },
    { source: "level", type: "multiplicative", value: factor, target: "base_max_hunger" },
    { source: "level", type: "multiplicative", value: factor, target: "energy_recovery_multiplier" },
    { source: "level", type: "multiplicative", value: factor, target: "hunger_increase_multiplier" },
    // Logique réelle a définir et  implementer.
  ];
};



/**
 * Factory pour créer un nouveau dinosaure (DatabaseDinosaur).
 * 
 * Processus en 3 étapes :
 * 1. Récupérer la liste complète des types et diètes via le repository.
 * 2. Sélectionner aléatoirement un type et une diète.
 * 3. Combiner les constantes (dans DINOSAUR_CONSTANTS) avec les modificateurs du type
 *    pour déterminer les valeurs de référence.
 * 
 * @param userId L'ID de l'utilisateur auquel le dinosaure appartient.
 * @returns Un objet DatabaseDinosaur prêt à être inséré en base.
 */
export class DinosaurFactory {
  public static async createDinosaur(userId: number): Promise<DatabaseDinosaur> {
    const dinosaurRepo = new DinosaurRepository();
    const allTypes: DinosaurType[] = await dinosaurRepo.getAllDinosaurTypes();
    const allDiets: DinosaurDiet[] = await dinosaurRepo.getAllDinosaurDiets();

    // Sélection aléatoire
    const type: DinosaurType = allTypes[Math.floor(Math.random() * allTypes.length)];
    const diet: DinosaurDiet = allDiets[Math.floor(Math.random() * allDiets.length)];
    const name = generateRandomName();

    // Valeurs initiales (courantes)
    const energy = DINOSAUR_CONSTANTS.INITIAL_ENERGY;
    const food = DINOSAUR_CONSTANTS.INITIAL_FOOD;
    const hunger = DINOSAUR_CONSTANTS.INITIAL_HUNGER;

    // Valeurs de référence pour les max (constantes + modificateurs du type)
    const base_max_energy = DINOSAUR_CONSTANTS.BASE_MAX_ENERGY + getModifierValue(type.statModifiers, 'base_max_energy');
    const base_max_food = DINOSAUR_CONSTANTS.BASE_MAX_FOOD + getModifierValue(type.statModifiers, 'base_max_food');
    const base_max_hunger = DINOSAUR_CONSTANTS.BASE_MAX_HUNGER + getModifierValue(type.statModifiers, 'base_max_hunger');

    // Construction de l'objet DatabaseDinosaur
    const dinosaur: DatabaseDinosaur = {
      id: 0, // Généré en base lors de l'insertion
      name,
      userId,
      type,
      diet,
      energy,
      food,
      hunger,
      karma: 0,
      experience: 0,
      level: 1,
      money: 0,
      skill_points: 0,
      epoch: Epoch.Ancient_Epoch1,
      base_max_energy,
      energy_decay_per_second: DINOSAUR_CONSTANTS.ENERGY_DECAY_PER_SECOND,
      energy_recovery_per_second: DINOSAUR_CONSTANTS.ENERGY_RECOVERY_PER_SECOND,
      base_max_food,
      base_max_hunger,
      hunger_increase_per_second: DINOSAUR_CONSTANTS.HUNGER_INCREASE_PER_SECOND,
      hunger_increase_per_second_when_recovery: DINOSAUR_CONSTANTS.HUNGER_INCREASE_PER_SECOND_WHEN_RECOVERY,
      karma_width: DINOSAUR_CONSTANTS.KARMA_WIDTH, 
      created_at: new Date(),
      last_reborn: new Date(),
      reborn_amount: 0,
      last_update_by_time_service: new Date(),
      is_sleeping: false,
      is_dead: false,
    };

    return dinosaur;
  }

  /**
   * Ressuscite un dinosaure en appliquant les changements d'un événement.
   * Pour la résurrection, on change le type selon l'événement et on génère une diète aléatoire.
   * 
   * @param dinosaur Le dinosaure (FrontendDinosaurDTO) à ressusciter.
   * @param event L'événement de résurrection.
   * @returns Le dinosaure ressuscité sous forme de FrontendDinosaurDTO.
   */
  public static async resurrectDinosaur(
    dinosaur: FrontendDinosaurDTO
  ): Promise<FrontendDinosaurDTO> {
    const dinosaurRepo = new DinosaurRepository();
    // Sélectionner aléatoirement un nouveau type et une nouvelle diète
    const allTypes = await dinosaurRepo.getAllDinosaurTypes();
    const newType = allTypes[Math.floor(Math.random() * allTypes.length)];
    const allDiets = await dinosaurRepo.getAllDinosaurDiets();
    const newDiet = allDiets[Math.floor(Math.random() * allDiets.length)];

    // Construction d'un nouvel objet DatabaseDinosaur en réinitialisant les valeurs
    const resurrectedDatabaseDino: DatabaseDinosaur = {
      id: dinosaur.id,
      name: generateRandomName(), // Nouveau nom aléatoire
      userId: dinosaur.userId,
      type: newType,
      diet: newDiet,
      // Réinitialisation aux valeurs initiales
      energy: DINOSAUR_CONSTANTS.INITIAL_ENERGY,
      food: DINOSAUR_CONSTANTS.INITIAL_FOOD,
      hunger: DINOSAUR_CONSTANTS.INITIAL_HUNGER,
      // Karma augmenté d'un bonus
      karma: dinosaur.karma + DINOSAUR_CONSTANTS.KARMA_GAIN_AFTER_DEATH,
      experience: 0,
      level: 1,
      money: 0,
      skill_points: 0,
      epoch: Epoch.Ancient_Epoch1,
      // Recalcul des valeurs de référence à partir du nouveau type
      base_max_energy: DINOSAUR_CONSTANTS.BASE_MAX_ENERGY + getModifierValue(newType.statModifiers, 'base_max_energy'),
      energy_decay_per_second: DINOSAUR_CONSTANTS.ENERGY_DECAY_PER_SECOND,
      energy_recovery_per_second: DINOSAUR_CONSTANTS.ENERGY_RECOVERY_PER_SECOND,
      base_max_food: DINOSAUR_CONSTANTS.BASE_MAX_FOOD + getModifierValue(newType.statModifiers, 'base_max_food'),
      base_max_hunger: DINOSAUR_CONSTANTS.BASE_MAX_HUNGER + getModifierValue(newType.statModifiers, 'base_max_hunger'),
      hunger_increase_per_second: DINOSAUR_CONSTANTS.HUNGER_INCREASE_PER_SECOND,
      hunger_increase_per_second_when_recovery: DINOSAUR_CONSTANTS.HUNGER_INCREASE_PER_SECOND_WHEN_RECOVERY,
      karma_width: DINOSAUR_CONSTANTS.KARMA_WIDTH,
      created_at: dinosaur.created_at,
      last_reborn: new Date(),
      reborn_amount: dinosaur.reborn_amount + 1,
      last_update_by_time_service: new Date(),
      is_sleeping: false,
      is_dead: false,
    };

    return DinosaurFactory.convertToFrontendDinosaur(resurrectedDatabaseDino);
  }

  /**
   * Convertit un DatabaseDinosaur en un objet FrontendDinosaurDTO.
   * Cette méthode applique un multiplicateur de niveau pour calculer les valeurs finales.
   * La logique de calcul pourra être améliorée ultérieurement via un service dédié.
   * 
   * @param dbDino Le dinosaure tel qu'enregistré en base.
   * @returns Un objet FrontendDinosaurDTO.
   */
  public static convertToFrontendDinosaur(dbDino: DatabaseDinosaur): FrontendDinosaurDTO {
    // Récupérer les modificateurs de niveau
    const levelModifiers = getLevelModifiers(dbDino.level);
    // Combiner les modificateurs issus du type, de la diète et du niveau
    const allModifiers: StatModifier[] = [
      ...dbDino.type.statModifiers,
      ...dbDino.diet.statModifiers,
      ...levelModifiers
    ];

    // Calcul des valeurs finales pour les capacités et taux
    const final_max_energy = calculateFinalStat(dbDino.base_max_energy, allModifiers.filter(mod => mod.target === "base_max_energy"));
    const final_max_food = calculateFinalStat(dbDino.base_max_food, allModifiers.filter(mod => mod.target === "base_max_food"));
    const final_max_hunger = calculateFinalStat(dbDino.base_max_hunger, allModifiers.filter(mod => mod.target === "base_max_hunger"));
    const final_energy_recovery = calculateFinalStat(dbDino.energy_recovery_per_second, allModifiers.filter(mod => mod.target === "energy_recovery_multiplier"));
    const final_energy_decay = calculateFinalStat(dbDino.energy_decay_per_second, allModifiers.filter(mod => mod.target === "energy_decay_multiplier"));
    const final_hunger_increase = calculateFinalStat(dbDino.hunger_increase_per_second, allModifiers.filter(mod => mod.target === "hunger_increase_multiplier"));
    const final_hunger_increase_when_recovery = calculateFinalStat(dbDino.hunger_increase_per_second_when_recovery, allModifiers.filter(mod => mod.target === "hunger_increase_multiplier"));

    // Calcul des earn multipliers (base = 1)
    const final_earn_food_global_multiplier = calculateFinalStat(1, allModifiers.filter(mod => mod.target === "earn_food_global_multiplier"));
    const final_earn_food_herbi_multiplier = calculateFinalStat(1, allModifiers.filter(mod => mod.target === "earn_food_herbi_multiplier"));
    const final_earn_food_carni_multiplier = calculateFinalStat(1, allModifiers.filter(mod => mod.target === "earn_food_carni_multiplier"));
    const final_earn_experience_multiplier = calculateFinalStat(1, allModifiers.filter(mod => mod.target === "earn_experience_multiplier"));
    const final_earn_skill_point_multiplier = calculateFinalStat(1, allModifiers.filter(mod => mod.target === "earn_skill_point_multiplier"));
    const final_earn_money_multiplier = calculateFinalStat(1, allModifiers.filter(mod => mod.target === "earn_money_multiplier"));
    const final_earn_karma_multiplier = calculateFinalStat(1, allModifiers.filter(mod => mod.target === "earn_karma_multiplier"));

    // Construction du DTO Frontend
    const frontendDino: FrontendDinosaurDTO = {
      id: dbDino.id,
      userId: dbDino.userId,
      name: dbDino.name,
      // Valeurs de base
      base_max_energy: dbDino.base_max_energy,
      energy_decay_per_second: dbDino.energy_decay_per_second,
      energy_recovery_per_second: dbDino.energy_recovery_per_second,
      base_max_food: dbDino.base_max_food,
      base_max_hunger: dbDino.base_max_hunger, 
      hunger_increase_per_second: dbDino.hunger_increase_per_second,
      hunger_increase_per_second_when_recovery: dbDino.hunger_increase_per_second_when_recovery,
      karma_width: dbDino.karma_width, 
      // Détails techniques
      created_at: dbDino.created_at,
      last_reborn: dbDino.last_reborn,
      reborn_amount: dbDino.reborn_amount,
      last_update_by_time_service: dbDino.last_update_by_time_service,
      is_sleeping: dbDino.is_sleeping,
      is_dead: dbDino.is_dead,
      // Valeurs courantes
      karma: dbDino.karma,
      experience: dbDino.experience,
      level: dbDino.level,
      money: dbDino.money,
      skill_points: dbDino.skill_points,
      epoch: dbDino.epoch,
      energy: dbDino.energy,
      food: dbDino.food,
      hunger: dbDino.hunger,
      // Génétique
      type: dbDino.type,
      diet: dbDino.diet,
      // Modificateurs additionnels (seuls ceux originaires du type et de la diète)
      stats_modifiers: [
        ...dbDino.type.statModifiers,
        ...dbDino.diet.statModifiers
      ],
      // Multiplicateurs finaux calculés
      final_max_energy,
      final_max_food,
      final_max_hunger,
      final_energy_recovery,
      final_energy_decay,
      final_hunger_increase,
      final_hunger_increase_when_recovery,
      final_earn_food_global_multiplier,
      final_earn_food_herbi_multiplier,
      final_earn_food_carni_multiplier,
      final_earn_experience_multiplier,
      final_earn_skill_point_multiplier,
      final_earn_money_multiplier,
      final_earn_karma_multiplier
    };

    return frontendDino;
  }
}
