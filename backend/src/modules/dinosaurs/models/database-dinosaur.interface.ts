import { DinosaurType } from './dinosaur-type.interface';
import { DinosaurDiet } from './dinosaur-diet.interface';
import { Epoch } from './epoch.enum';

/**
 * Interface représentant le dinosaure stocké en base de données.
 * Ce modèle contient l'état persistant du dinosaure, sans les calculs finaux.
 *
 * - Les champs "energy", "food" et "hunger" correspondent aux valeurs courantes.
 * - Les champs "base_max_*" servent de référence pour le calcul des valeurs finales.
 * - Les earn multipliers modulent les gains lors des actions.
 * - Les nouveaux multipliers d'évolution (energy_recovery, energy_decay, etc.)
 *   s'appliquent aux modifications de la capacité maximale et à l'évolution des stats.
 * - Les objets "type" et "diet" contiennent les données complètes issues des tables,
 *   y compris leurs modificateurs (stockés en JSON).
 */
export interface DatabaseDinosaur {
  id: number;
  name: string;
  userId: number;
  
  // Génétique du dinosaure
  type: DinosaurType;
  diet: DinosaurDiet;
  
  // Valeurs courantes
  energy: number;
  food: number;
  hunger: number;
  karma: number;
  experience: number;
  level: number;
  money: number;
  skill_points: number;
  epoch: Epoch;

  // Valeurs de référence pour les max
  base_max_energy: number;
  energy_decay_per_second: number;
  energy_recovery_per_second: number;
  base_max_food: number;
  base_max_hunger: number;
  hunger_increase_per_second: number;
  hunger_increase_per_second_when_recovery: number;
  karma_width: number;
  
  // Informations techniques
  created_at: Date;
  last_reborn: Date;
  reborn_amount: number;
  last_update_by_time_service: Date;
  is_sleeping: boolean;
  is_dead: boolean;
}