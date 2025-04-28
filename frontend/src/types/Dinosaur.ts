import { DinosaurDiet } from './DinosaurDiet';
import { DinosaurType } from './DinosaurType';
import { Epoch } from './Epoch';
import { StatModifier } from './stats-modifiers.types';

export interface Dinosaur {
  id: number;
  userId: number;
  name: string;
  // Valeurs de base
  base_max_energy: number;
  energy_decay_per_second: number;
  energy_recovery_per_second: number;
  base_max_food: number;
  base_max_hunger: number;
  hunger_increase_per_second: number;
  karma_width: number;
  // Détails techniques
  created_at: string;
  last_reborn: string;
  reborn_amount: number;
  last_update_by_time_service: string;
  is_sleeping: boolean;
  is_dead: boolean;
  // Valeurs courantes
  karma: number;
  experience: number;
  level: number;
  money: number;
  skill_points: number;
  epoch: Epoch;
  energy: number;
  food: number;
  hunger: number;
  // Génétique
  type: DinosaurType;
  diet: DinosaurDiet;
  // Modificateurs
  stats_modifiers: StatModifier[];
  // Multiplicateurs finaux
  final_max_energy: number;
  final_max_food: number;
  final_max_hunger: number;
  final_energy_recovery: number;
  final_energy_decay: number;
  final_hunger_increase: number;
  final_earn_food_global_multiplier: number;
  final_earn_food_herbi_multiplier: number;
  final_earn_food_carni_multiplier: number;
  final_earn_experience_multiplier: number;
  final_earn_skill_point_multiplier: number;
  final_earn_money_multiplier: number;
  final_earn_karma_multiplier: number;
}
