import { DINOSAUR_CONSTANTS } from '../../../common/config/dinosaur.constants';
import { DatabaseDinosaur } from '../models/database-dinosaur.interface';
import { DinosaurType } from '../models/dinosaur-type.interface';
import { DinosaurDiet } from '../models/dinosaur-diet.interface';
import { Epoch } from '../models/epoch.enum';
import { DinosaurRepository } from '../repositories/dinosaur.repository';
import { FrontendDinosaurDTO } from '../models/frontend-dinosaur.dto';
import { StatModifier } from '../models/stats-modifiers.types';
import { getLevelModifiers } from '../utils/levelModifiers';

/**
 * Factory pour créer ou ressusciter un dinosaure.
 * Construite avec une instance de DinosaurRepository afin d'éviter les instanciations multiples.
 */
export class DinosaurFactory {
  private dinosaurRepo: DinosaurRepository;

  constructor(dinosaurRepo: DinosaurRepository) {
    this.dinosaurRepo = dinosaurRepo;
  }

  public async createDinosaur(userId: number, isAdmin: boolean = false): Promise<DatabaseDinosaur> {
    const allTypes: DinosaurType[] = await this.dinosaurRepo.getAllDinosaurTypes();
    const allDiets: DinosaurDiet[] = await this.dinosaurRepo.getAllDinosaurDiets();

    const type: DinosaurType = allTypes[Math.floor(Math.random() * allTypes.length)];
    const diet: DinosaurDiet = allDiets[Math.floor(Math.random() * allDiets.length)];
    const name = generateRandomName();

    const dinosaur: DatabaseDinosaur = {
      id: 0, // sera généré en base lors de l'insertion
      name,
      userId,
      lives: [],
      type,
      diet,
      energy: DINOSAUR_CONSTANTS.INITIAL_ENERGY,
      food: DINOSAUR_CONSTANTS.INITIAL_FOOD,
      hunger: DINOSAUR_CONSTANTS.INITIAL_HUNGER,
      karma: 0,
      experience: isAdmin ? 100000 : 0,   
      level: 1,     
      epoch: Epoch.Ancient_Epoch1,
      created_at: new Date(),
      death_date: null,
      last_reborn: new Date(),
      reborn_amount: 0,
      last_update_by_time_service: new Date(),
      is_sleeping: false,
      is_dead: false
    };

    return dinosaur;
  }

  public async resurrectDinosaur(dinoDto: FrontendDinosaurDTO, isAdmin: boolean = false): Promise<FrontendDinosaurDTO> {
    const allTypes = await this.dinosaurRepo.getAllDinosaurTypes();
    const newType = allTypes[Math.floor(Math.random() * allTypes.length)];
    const allDiets = await this.dinosaurRepo.getAllDinosaurDiets();
    const newDiet = allDiets[Math.floor(Math.random() * allDiets.length)];

    const resurrectedDino: DatabaseDinosaur = {
      id: dinoDto.id,
      name: generateRandomName(),
      userId: dinoDto.userId,
      lives: dinoDto.lives,
      type: newType,
      diet: newDiet,
      energy: DINOSAUR_CONSTANTS.INITIAL_ENERGY,
      food: DINOSAUR_CONSTANTS.INITIAL_FOOD,
      hunger: DINOSAUR_CONSTANTS.INITIAL_HUNGER,
      karma: (dinoDto.karma * DINOSAUR_CONSTANTS.KARMA_REDUCTION_FACTOR_AFTER_DEATH ) + DINOSAUR_CONSTANTS.KARMA_GAIN_AFTER_DEATH_REDUCTION,
      experience: isAdmin ? 100000 : 0,   
      level: 1,
      epoch: Epoch.Ancient_Epoch1,
      created_at: dinoDto.created_at,
      death_date: null,
      last_reborn: new Date(),
      reborn_amount: dinoDto.reborn_amount + 1,
      last_update_by_time_service: new Date(),
      is_sleeping: false,
      is_dead: false
    };

    return this.convertToFrontendDinosaur(resurrectedDino);
  }

  public convertToFrontendDinosaur(dbDino: DatabaseDinosaur): FrontendDinosaurDTO {
    // Calcul des valeurs de base via les constantes et modificateurs du type
    const base_max_energy = DINOSAUR_CONSTANTS.BASE_MAX_ENERGY + getModifierValue(dbDino.type.statModifiers, 'base_max_energy');
    const base_max_food = DINOSAUR_CONSTANTS.BASE_MAX_FOOD + getModifierValue(dbDino.type.statModifiers, 'base_max_food');
    const base_max_hunger = DINOSAUR_CONSTANTS.BASE_MAX_HUNGER + getModifierValue(dbDino.type.statModifiers, 'base_max_hunger');

    const levelModifiers = getLevelModifiers(dbDino.level);
    let allModifiers: StatModifier[] = [
      ...dbDino.type.statModifiers,
      ...dbDino.diet.statModifiers,
      ...levelModifiers
    ];


    const final_max_energy = calculateFinalStat(base_max_energy, allModifiers.filter(mod => mod.target === "base_max_energy"));
    const final_max_food = calculateFinalStat(base_max_food, allModifiers.filter(mod => mod.target === "base_max_food"));
    const final_max_hunger = calculateFinalStat(base_max_hunger, allModifiers.filter(mod => mod.target === "base_max_hunger"));
    const final_energy_recovery = calculateFinalStat(DINOSAUR_CONSTANTS.ENERGY_RECOVERY_PER_SECOND, allModifiers.filter(mod => mod.target === "energy_recovery_multiplier"));
    const final_energy_decay = calculateFinalStat(DINOSAUR_CONSTANTS.ENERGY_DECAY_PER_SECOND, allModifiers.filter(mod => mod.target === "energy_decay_multiplier"));
    const final_hunger_increase = calculateFinalStat(DINOSAUR_CONSTANTS.HUNGER_INCREASE_PER_SECOND, allModifiers.filter(mod => mod.target === "hunger_increase_multiplier"));
    const final_hunger_increase_when_recovery = calculateFinalStat(DINOSAUR_CONSTANTS.HUNGER_INCREASE_PER_SECOND_WHEN_RECOVERY, allModifiers.filter(mod => mod.target === "hunger_increase_multiplier"));

    const final_earn_food_global_multiplier = calculateFinalStat(1, allModifiers.filter(mod => mod.target === "earn_food_global_multiplier"));
    const final_earn_food_herbi_multiplier = calculateFinalStat(1, allModifiers.filter(mod => mod.target === "earn_food_herbi_multiplier"));
    const final_earn_food_carni_multiplier = calculateFinalStat(1, allModifiers.filter(mod => mod.target === "earn_food_carni_multiplier"));
    const final_earn_experience_multiplier = calculateFinalStat(1, allModifiers.filter(mod => mod.target === "earn_experience_multiplier"));
    const final_earn_karma_multiplier = calculateFinalStat(1, allModifiers.filter(mod => mod.target === "earn_karma_multiplier"));

    // Calcul des valeurs finales pour les attributs de base
    // les modificateurs sont appliqués aux valeurs "constantes" définies dans le fichier de configuration
    const final_energy_recovery_per_second = calculateFinalStat(
      DINOSAUR_CONSTANTS.ENERGY_RECOVERY_PER_SECOND,
      allModifiers.filter(mod => mod.target === "energy_recovery_per_second")
    );
    // NEW: Calcul de energy_recovery_per_second_when_sleeping
    const final_energy_recovery_per_second_when_sleeping = calculateFinalStat(
      DINOSAUR_CONSTANTS.ENERGY_RECOVERY_PER_SECOND,
      allModifiers.filter(mod => mod.target === "energy_recovery_per_second_when_sleeping")
    );
    const final_energy_decay_per_second = calculateFinalStat(
      DINOSAUR_CONSTANTS.ENERGY_DECAY_PER_SECOND,
      allModifiers.filter(mod => mod.target === "energy_decay_per_second")
    );
    const final_hunger_increase_per_second = calculateFinalStat(
      DINOSAUR_CONSTANTS.HUNGER_INCREASE_PER_SECOND,
      allModifiers.filter(mod => mod.target === "hunger_increase_per_second")
    );
    const final_hunger_increase_per_second_when_recovery = calculateFinalStat(
      DINOSAUR_CONSTANTS.HUNGER_INCREASE_PER_SECOND_WHEN_RECOVERY,
      allModifiers.filter(mod => mod.target === "hunger_increase_per_second_when_recovery")
    );

    const final_karma_width = calculateFinalStat(
      DINOSAUR_CONSTANTS.KARMA_WIDTH,
      allModifiers.filter(mod => mod.target === "karma_width")
    );
    
    // --- Nouveaux calculs pour le luck factor ---
    // 1. Calcul de la moyenne du karma des vies passées
    const pastLivesAverageKarma = dbDino.lives.length > 0 
      ? dbDino.lives.reduce((sum, life) => sum + life.karma, 0) / dbDino.lives.length 
      : 0;

    // 2. Calcul de l'initial_luck_factor sous forme de ratio normalisé de 0 à 1
    // La moyenne entre le karma actuel et la moyenne des vies passées
    const avgKarma = (dbDino.karma + pastLivesAverageKarma) / 2;
    let initialLuckFactor = (avgKarma + final_karma_width) / (2 * final_karma_width);
    // On s'assure que le ratio soit bien entre 0 et 1
    const clampedInitialLuckFactor = Math.max(0, Math.min(1, initialLuckFactor));

    // 3. Calcul du multiplicateur final pour le luck factor à partir des modificateurs ciblant "luck_factor_multiplier"
    const finalLuckFactorMultiplier = calculateFinalStat(1, allModifiers.filter(mod => mod.target === "luck_factor_multiplier"));

    // 4. Le luck factor final est le produit du ratio normalisé par le multiplicateur
    const luckFactor = clampedInitialLuckFactor * finalLuckFactorMultiplier;

  
    // Calcul de l'âge et du facteur d'âge pour obtenir l'âge réel

    let referenceTime = Date.now();
    if (dbDino.is_dead && dbDino.death_date) {
      referenceTime = dbDino.death_date.getTime();
    }
    const rawAge = referenceTime - dbDino.last_reborn.getTime();
    const computedAgeFactor = calculateFinalStat(DINOSAUR_CONSTANTS.INITIAL_AGE_FACTOR, allModifiers.filter(mod => mod.target === "age_factor"));
    const realAge = rawAge * computedAgeFactor;
    const dinoAge = realAge;
    const dinoInitialAgeFactor = DINOSAUR_CONSTANTS.INITIAL_AGE_FACTOR;
    const dinoComputedAgefactor = computedAgeFactor;

    const frontendDino: FrontendDinosaurDTO = {
      id: dbDino.id,
      userId: dbDino.userId,
      name: dbDino.name,
      lives: dbDino.lives,
      // Valeurs initiales
      initial_age_factor: dinoInitialAgeFactor,
      initial_base_max_energy: DINOSAUR_CONSTANTS.BASE_MAX_ENERGY,
      initial_energy_decay_per_second: DINOSAUR_CONSTANTS.ENERGY_DECAY_PER_SECOND,
      initial_energy_recovery_per_second: DINOSAUR_CONSTANTS.ENERGY_RECOVERY_PER_SECOND,
      initial_energy_recovery_per_second_when_sleeping: DINOSAUR_CONSTANTS.ENERGY_RECOVERY_PER_SECOND,
      initial_base_max_food: DINOSAUR_CONSTANTS.BASE_MAX_FOOD,
      initial_base_max_hunger: DINOSAUR_CONSTANTS.BASE_MAX_HUNGER,
      initial_hunger_increase_per_second: DINOSAUR_CONSTANTS.HUNGER_INCREASE_PER_SECOND,
      initial_hunger_increase_per_second_when_recovery: DINOSAUR_CONSTANTS.HUNGER_INCREASE_PER_SECOND_WHEN_RECOVERY,
      initial_karma_width: DINOSAUR_CONSTANTS.KARMA_WIDTH,
      // Valeurs après modificateurs (de base)
      age: dinoAge,
      base_max_energy,
      energy_decay_per_second: final_energy_decay_per_second,
      energy_recovery_per_second: final_energy_recovery_per_second,
      energy_recovery_per_second_when_sleeping: final_energy_recovery_per_second_when_sleeping,
      base_max_food,
      base_max_hunger,
      hunger_increase_per_second: final_hunger_increase_per_second,
      hunger_increase_per_second_when_recovery: final_hunger_increase_per_second_when_recovery,
      karma_width: final_karma_width,
      // Détails techniques
      death_date: dbDino.death_date,
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
      epoch: dbDino.epoch,
      energy: dbDino.energy,
      food: dbDino.food,
      hunger: dbDino.hunger,
      // Génétique
      type: dbDino.type,
      diet: dbDino.diet,
      // Modificateurs
      stats_modifiers: allModifiers,
      // Multiplicateurs et productions finales
      final_age_factor: dinoComputedAgefactor,
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
      final_earn_karma_multiplier,
      // Nouveaux attributs pour le luck factor
      past_lives_average_karma: pastLivesAverageKarma,
      initial_luck_factor: clampedInitialLuckFactor,
      final_luck_factor_multiplier: finalLuckFactorMultiplier,
      final_luck_factor: luckFactor,
    };

    return frontendDino;
  }
}

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

const getModifierValue = (
  modifiers: StatModifier[],
  target: string
): number => {
  const mod = modifiers.find(m => m.target === target);
  return mod ? mod.value : 0;
};
