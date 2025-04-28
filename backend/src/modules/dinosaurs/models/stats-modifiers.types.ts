/**
 * Type de modificateur.
 * - 'additive' : la valeur sera ajoutée.
 * - 'multiplicative' : la valeur sera utilisée en multiplication.
 */
export type ModifierType = 'additive' | 'multiplicative';

export type StatTarget =
  | "base_max_energy"
  | "base_max_food"
  | "base_max_hunger"
  | "energy_recovery_multiplier"
  | "energy_decay_multiplier"
  | "hunger_increase_multiplier"
  | "food_production"
  | "earn_food_global_multiplier"
  | "earn_food_herbi_multiplier"
  | "earn_food_carni_multiplier"
  | "earn_experience_multiplier"
  | "earn_skill_point_multiplier"
  | "earn_karma_multiplier"
  | "energy_decay_per_second"
  | "energy_recovery_per_second"
  | "energy_recovery_per_second_when_sleeping"
  | "hunger_increase_per_second"
  | "hunger_increase_per_second_when_recovery"
  | "karma_width"
  | "luck_factor_multiplier"
  | "age_factor";


/**
 * Interface représentant un modificateur appliqué à une statistique.
 * @property source La provenance du modificateur (ex. "type", "diet", "level", etc.)
 * @property type Le type du modificateur (additive ou multiplicative).
 * @property value La valeur numérique du modificateur.
 * @property target La statistique cible (ex. "base_energy", "earn_food_global_multiplier", etc.)
 */
export interface StatModifier {
  source: string;
  type: ModifierType;
  value: number;
  target: StatTarget;
}
