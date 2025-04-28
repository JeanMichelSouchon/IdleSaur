import { Exclude, Expose } from 'class-transformer';
import { StatModifier } from '../../dinosaurs/models/stats-modifiers.types';
import { DinosaurSkillCategory, DinosaurSkillType } from './dinosaur-skill.enums';

/**
 * DTO de définition d'une compétence (skill) pour le module Game-Assets.
 * Cette définition est utilisée pour peupler la base et référencer les skills disponibles.
 */
@Exclude()
export class DinosaurSkillDTO {
  @Expose() id!: number;
  @Expose() name!: string;
  @Expose() description?: string;
  @Expose() price!: number;
  @Expose() minLevelToBuy!: number;
  @Expose() category!: DinosaurSkillCategory;
  @Expose() type!: DinosaurSkillType;
  @Expose() tier!: number;
  /**
   * Pour les skills de type Triggered, indique la durée en secondes de l'effet.
   * Pour un skill permanent, ce champ restera nul.
   */
  @Expose() duration?: number;
  @Expose() statModifiers!: StatModifier[];
}
