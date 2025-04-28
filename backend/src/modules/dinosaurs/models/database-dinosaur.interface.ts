import { DinosaurType } from './dinosaur-type.interface';
import { DinosaurDiet } from './dinosaur-diet.interface';
import { Epoch } from './epoch.enum';
import { DinosaurSkillInstanceDTO } from './dinosaur-skill-instance.dto';
import { DinosaurItemInstanceDTO } from './dinosaur-item-instance.dto';
import { DinosaurBuildingInstanceDTO } from './dinosaur-building-instance.dto';
import { DinosaurLifeDTO } from './dinosaur-life.dto';
import { DinosaurSoulSkillInstanceDTO } from './dinosaur-soul-skill-instance.dto';

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
 *
 * Ajouté : les assets détenus par le dinosaure.
 */
export interface DatabaseDinosaur {
  id: number;
  name: string;
  userId: number;

  //Historique des vies (et scores)
  lives: DinosaurLifeDTO[];
  
  // Génétique du dinosaure
  type: DinosaurType;
  diet: DinosaurDiet;
  
  // Valeurs courantes
  energy: number;
  food: number;
  hunger: number;
  weapons: number;
  armors: number;
  friends: number;
  employees: number;
  karma: number;
  experience: number;
  level: number;
  money: number;
  skill_points: number;
  epoch: Epoch;
  
  // Informations techniques
  created_at: Date;
  death_date: Date | null;
  last_reborn: Date;
  reborn_amount: number;
  last_update_by_time_service: Date;
  is_sleeping: boolean;
  is_dead: boolean;
  
  // Assets détenus par le dinosaure (instances issues des modules Game‑Assets)
  skills: DinosaurSkillInstanceDTO[];
  items: DinosaurItemInstanceDTO[];
  buildings: DinosaurBuildingInstanceDTO[];
  soul_skills: DinosaurSoulSkillInstanceDTO[];
}
