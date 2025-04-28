import { DinosaurSkillDTO } from '../../models/dinosaur-skill.dto';
import { DinosaurSkillCategory, DinosaurSkillType } from '../../models/dinosaur-skill.enums';

/**
 * Skills de la catégorie "Advanced"
 * Ces skills viennent booster la production d'armes, armures, amis et employés.
 * Préparez-vous à faire rugir votre côté stratège !
 */
export const advancedSkills: DinosaurSkillDTO[] = [
  {
    id: 0, // ID auto-généré lors de l'insertion
    name: "Weapon Mastery",
    description: "Augmente significativement la production d'armes. Libérez le guerrier qui sommeille en vous !",
    price: 1200,
    minLevelToBuy: 1,
    category: DinosaurSkillCategory.Advanced,
    type: DinosaurSkillType.Permanent,
    tier: 1,
    statModifiers: [
      { source: "skill", target: "weapon_production", type: "multiplicative", value: 1 }
    ]
  },
  {
    id: 0,
    name: "Armor Expertise",
    description: "Optimise votre production d'armures pour une défense inébranlable. Prêt à encaisser les coups ?",
    price: 1200,
    minLevelToBuy: 1,
    category: DinosaurSkillCategory.Advanced,
    type: DinosaurSkillType.Permanent,
    tier: 1,
    statModifiers: [
      { source: "skill", target: "armor_production", type: "multiplicative", value: 1 }
    ]
  },
  {
    id: 0,
    name: "Friendship Boost",
    description: "Faites le plein d'amis pour booster votre production de soutien. Parce qu'ensemble, on est plus forts !",
    price: 5000,
    minLevelToBuy: 1,
    category: DinosaurSkillCategory.Advanced,
    type: DinosaurSkillType.Permanent,
    tier: 1,
    statModifiers: [
      { source: "skill", target: "friend_production", type: "multiplicative", value: 0.1 }
    ]
  },
  {
    id: 0,
    name: "Employee Efficiency",
    description: "Optimise la gestion de vos équipes pour une productivité maximale. Faites travailler vos dinos à plein régime !",
    price: 5000,
    minLevelToBuy: 1,
    category: DinosaurSkillCategory.Advanced,
    type: DinosaurSkillType.Permanent,
    tier: 1,
    statModifiers: [
      { source: "skill", target: "employee_production", type: "multiplicative", value: 0.1 }
    ]
  }
];
