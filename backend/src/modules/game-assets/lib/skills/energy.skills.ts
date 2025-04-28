import { DinosaurSkillDTO } from '../../models/dinosaur-skill.dto';
import { DinosaurSkillCategory, DinosaurSkillType } from '../../models/dinosaur-skill.enums';

/**
 * Skills de la catégorie "Energy"
 */
export const energySkills: DinosaurSkillDTO[] = [
  {
    id: 0,
    name: "Earn 100% Energy",
    description: "Augmente temporairement la récupération d'énergie.",
    price: 500,
    minLevelToBuy: 1,
    category: DinosaurSkillCategory.Energy,
    type: DinosaurSkillType.Permanent,
    tier: 1,
    statModifiers: [
      { source: "skill", target: "energy_recovery_multiplier", type: "multiplicative", value: 1 }
    ]
  }
];
