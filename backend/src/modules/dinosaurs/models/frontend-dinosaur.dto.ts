import { Exclude, Expose, Type } from 'class-transformer';
import { Epoch } from './epoch.enum'; 
import { DinosaurType } from './dinosaur-type.interface';
import { DinosaurDiet } from './dinosaur-diet.interface';
import { StatModifier } from './stats-modifiers.types';
import { DinosaurSkillInstanceDTO } from './dinosaur-skill-instance.dto';
import { DinosaurItemInstanceDTO } from './dinosaur-item-instance.dto';
import { DinosaurBuildingInstanceDTO } from './dinosaur-building-instance.dto';
import { DinosaurLifeDTO } from './dinosaur-life.dto';
import { DinosaurSoulSkillInstanceDTO } from './dinosaur-soul-skill-instance.dto';

/**
 * DTO destiné au frontend.
 * Expose les données stockées (valeurs courantes, earn multipliers, etc.)
 * ainsi que les valeurs finales calculées (sans le préfixe "base_") pour l'affichage.
 */
@Exclude()
export class FrontendDinosaurDTO {

  /*
  * Identifiants et nom du dinosaure
  */
  @Expose() id!: number;
  @Expose() userId!: number;
  @Expose() name!: string;

  //Historique des vies (et scores)
  @Expose() @Type(() => DinosaurLifeDTO) lives!: DinosaurLifeDTO[];
  

  // Assets détenus par le dinosaure ajouté recemments
  @Expose() @Type(() => DinosaurSkillInstanceDTO) skills!: DinosaurSkillInstanceDTO[];
  @Expose() @Type(() => DinosaurItemInstanceDTO) items!: DinosaurItemInstanceDTO[];
  @Expose() @Type(() => DinosaurBuildingInstanceDTO) buildings!: DinosaurBuildingInstanceDTO[];
  @Expose() @Type(() => DinosaurSoulSkillInstanceDTO) soulSkills!: DinosaurSoulSkillInstanceDTO[];

  /*
  * Valeurs de bases du dinosaure
  * Identiques pour tous les dinosaures.
  */
 
  // Calculéessur la base des stats / de l'historique des vie du dino
  @Expose() past_lives_average_karma!: number;
  @Expose() initial_luck_factor!: number;

  // issues des constantes du jeu
  @Expose() initial_age_factor!: number;
  @Expose() initial_base_max_energy!: number;
  @Expose() initial_energy_decay_per_second!: number;
  @Expose() initial_energy_recovery_per_second!: number;
  @Expose() initial_energy_recovery_per_second_when_sleeping!: number;
  @Expose() initial_base_max_food!: number;
  @Expose() initial_base_max_hunger!: number;
  @Expose() initial_hunger_increase_per_second!: number;
  @Expose() initial_hunger_increase_per_second_when_recovery!: number;
  @Expose() initial_karma_width!: number;

  /*
  * Valeurs de bases apres application des modificateurs
  * 
  */
 
  @Expose() base_max_energy!: number;
  @Expose() energy_decay_per_second!: number;
  @Expose() energy_recovery_per_second!: number;
  @Expose() energy_recovery_per_second_when_sleeping!: number;
  @Expose() base_max_food!: number;
  @Expose() base_max_hunger!: number;
  @Expose() hunger_increase_per_second!: number;
  @Expose() hunger_increase_per_second_when_recovery!: number;
  @Expose() karma_width!: number;

 

  /*
  * Valeurs calculées du systeme karmique
  * 
  */ 
  
  /*
  * Details techniques
  */
  @Expose() created_at!: Date;
  @Expose() death_date!: Date | null;
  @Expose() last_reborn!: Date;
  @Expose() reborn_amount!: number;
  @Expose() last_update_by_time_service!: Date;
  @Expose() is_sleeping!: boolean;
  @Expose() is_dead!: boolean;
  
  
  /*
  * Valeurs courantes du dinosaure
  * Elles sont modifiées par les actions du joueur et les calculs de temps.
  */

  //- Leveling
  @Expose() age!: number;
  @Expose() experience!: number;
  @Expose() level!: number;
  @Expose() money!: number;
  @Expose() skill_points!: number;
  @Expose() epoch!: Epoch;

  // Karma
  @Expose() karma!: number;

  //- Vitals
  @Expose() energy!: number;
  @Expose() food!: number;
  @Expose() hunger!: number;

  //- Advanced
  @Expose() weapons!: number;
  @Expose() armors!: number;
  @Expose() friends!: number;
  @Expose() employees!: number;
  
  
  /*
  * Génétique du dinosaure
  * incluant leurs modificateurs (stockés en JSON).
  */
  @Expose() @Type(() => Object) type!: DinosaurType;
  @Expose() @Type(() => Object) diet!: DinosaurDiet;

  
  /*
  * Modificateurs de stats issus des différentes systemes
  * (level, karma, etc...)
  */
  @Expose() stats_modifiers!: StatModifier[];
  
  /*
  * Multiplicateurs finaux apres application des modificateurs
  */
  @Expose() final_age_factor!: number;
  @Expose() final_luck_factor!: number;
  @Expose() final_max_energy!: number;
  @Expose() final_max_food!: number;
  @Expose() final_max_hunger!: number;
  @Expose() final_energy_recovery!: number;
  @Expose() final_energy_decay!: number;
  @Expose() final_hunger_increase!: number;
  @Expose() final_hunger_increase_when_recovery!: number;

  @Expose() final_food_production!: number;
  @Expose() final_weapon_production!: number;
  @Expose() final_armor_production!: number;
  @Expose() final_friend_production!: number;
  @Expose() final_employee_production!: number; 

  @Expose() final_luck_factor_multiplier!: number;
  @Expose() final_earn_food_global_multiplier!: number;
  @Expose() final_earn_food_herbi_multiplier!: number;
  @Expose() final_earn_food_carni_multiplier!: number;
  @Expose() final_earn_experience_multiplier!: number;
  @Expose() final_earn_skill_point_multiplier!: number;
  @Expose() final_earn_money_multiplier!: number;
  @Expose() final_earn_karma_multiplier!: number;
}
