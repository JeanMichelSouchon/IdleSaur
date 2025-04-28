import { DinosaurSkillDTO } from '../../models/dinosaur-skill.dto';
import { DinosaurSkillCategory, DinosaurSkillType } from '../../models/dinosaur-skill.enums';

/**
 * Skills de la catégorie "Karma"
 */
export const karmaSkills: DinosaurSkillDTO[] = [
  {
    id: 0,
    name: "Earn 100% Karma",
    description: "Augmente de façon permanente la production de karma.",
    price: 1000,
    minLevelToBuy: 1,
    category: DinosaurSkillCategory.Karma,
    type: DinosaurSkillType.Permanent,
    tier: 1,
    statModifiers: [
      { source: "skill", target: "earn_karma_multiplier", type: "multiplicative", value: 1 }
    ]
  }
];
