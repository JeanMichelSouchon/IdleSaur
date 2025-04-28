import { DinosaurSkillDTO } from '../../models/dinosaur-skill.dto';
import { DinosaurSkillCategory, DinosaurSkillType } from '../../models/dinosaur-skill.enums';

/**
 * Skills de la catégorie "Experience"
 */
export const experienceSkills: DinosaurSkillDTO[] = [
  {
    id: 0,
    name: "Earn 100% Experience",
    description: "Augmente de façon permanente la production d'expérience.",
    price: 500,
    minLevelToBuy: 1,
    category: DinosaurSkillCategory.Experience,
    type: DinosaurSkillType.Permanent,
    tier: 1,
    statModifiers: [
      { source: "skill", target: "earn_experience_multiplier", type: "multiplicative", value: 1 }
    ]
  }
];
