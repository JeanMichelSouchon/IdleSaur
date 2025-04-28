
import { DinosaurSkillCategory, DinosaurSkillType } from './dinosaur-skill.enums';
import { StatModifier } from './stats-modifiers.types';

/**
 * DTO de définition d'une compétence (skill) pour le module Game-Assets.
 * Cette définition est utilisée pour peupler la base et référencer les skills disponibles.
 */
export class DinosaurSkillDTO {
  id!: number;
  name!: string;
  description?: string;
  price!: number;
  minLevelToBuy!: number;
  category!: DinosaurSkillCategory;
  type!: DinosaurSkillType;
  tier!: number;
  /**
   * Pour les skills de type Triggered, indique la durée en secondes de l'effet.
   * Pour un skill permanent, ce champ restera nul.
   */
  duration?: number;
  statModifiers!: StatModifier[];
}
