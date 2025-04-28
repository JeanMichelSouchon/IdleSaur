import { DinosaurSkillDTO } from '../../models/dinosaur-skill.dto';
import { DinosaurSkillCategory, DinosaurSkillType } from '../../models/dinosaur-skill.enums';

/**
 * Skills de la catégorie "Food"
 */
export const foodSkills: DinosaurSkillDTO[] = [
  {
    id: 0, // sera auto-généré lors de l'insertion
    name: "Earn 100% Food",
    description: "Augmente la production de nourriture.",
    price: 500,
    minLevelToBuy: 1,
    category: DinosaurSkillCategory.Food,
    type: DinosaurSkillType.Permanent,
    tier: 1,
    statModifiers: [
      { source: "skill", target: "earn_food_global_multiplier", type: "multiplicative", value: 1 }
    ]
  }
];
