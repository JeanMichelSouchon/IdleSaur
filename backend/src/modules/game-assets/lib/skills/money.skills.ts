import { DinosaurSkillDTO } from '../../models/dinosaur-skill.dto';
import { DinosaurSkillCategory, DinosaurSkillType } from '../../models/dinosaur-skill.enums';

/**
 * Skills de la catégorie "Money"
 */
export const moneySkills: DinosaurSkillDTO[] = [
  {
    id: 0,
    name: "Earn 100% Money",
    description: "Augmente de façon permanente la production de monnaie.",
    price: 600,
    minLevelToBuy: 1,
    category: DinosaurSkillCategory.Money,
    type: DinosaurSkillType.Permanent,
    tier: 1,
    statModifiers: [
      { source: "skill", target: "earn_money_multiplier", type: "multiplicative", value: 1 }
    ]
  },
  {
    id: 0,
    name: "Taxation",
    description: "Le dinosaure impose une taxe aux autre dinosaure qui vivent sur son territoire.",
    price: 2000,
    minLevelToBuy: 10,
    category: DinosaurSkillCategory.Money,
    type: DinosaurSkillType.Permanent,
    tier: 2,
    statModifiers: [
      { source: "skill", target: "earn_money_multiplier", type: "multiplicative", value: 1 }
    ]
  },
  {
    id: 0,
    name: "Print Money",
    description: "Le dinosaure fait tourner la planche a billet, s'enrichissant en créant de l'inflation.",
    price: 1000,
    minLevelToBuy: 5,
    category: DinosaurSkillCategory.Money,
    type: DinosaurSkillType.Triggered,
    duration: 10,
    tier: 2,
    statModifiers: [
      { source: "skill", target: "earn_money_multiplier", type: "multiplicative", value: 5 }
    ]
  }
];
