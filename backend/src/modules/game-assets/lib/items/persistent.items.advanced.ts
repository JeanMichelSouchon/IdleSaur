import { DinosaurItemDTO } from '../../models/dinosaur-item.dto';
import { DinosaurItemType, DinosaurItemCategory } from '../../models/dinosaur-item.enums';

/**
 * Items persistants pour la catégorie "Advanced"
 * Ces items offrent des améliorations permanentes pour la production d'armes, armures, amis et employés.
 * Investissez judicieusement pour voir votre empire se renforcer au fil des niveaux !
 */
export const persistentAdvancedItems: DinosaurItemDTO[] = [
  {
    id: 0,
    name: "Ancient Weapon Blueprint",
    description: "Un plan ancien qui augmente de façon permanente la production d'armes.",
    price: 800,
    minLevelToBuy: 4,
    itemType: DinosaurItemType.Persistent,
    category: DinosaurItemCategory.Advanced,
    levels: [
      {
        level: 1,
        price: 3000,
        statModifiers: [
          { source: "item", target: "weapon_production", type: "multiplicative", value: 1 }
        ]
      },
      {
        level: 2,
        price: 6000,
        statModifiers: [
          { source: "item", target: "weapon_production", type: "multiplicative", value: 1.5 }
        ]
      }
    ]
  },
  {
    id: 0,
    name: "Legendary Armor Blueprint",
    description: "Un plan légendaire qui renforce de façon permanente la production d'armures.",
    price: 800,
    minLevelToBuy: 4,
    itemType: DinosaurItemType.Persistent,
    category: DinosaurItemCategory.Advanced,
    levels: [
      {
        level: 1,
        price: 3000,
        statModifiers: [
          { source: "item", target: "armor_production", type: "multiplicative", value: 1 }
        ]
      },
      {
        level: 2,
        price: 6000,
        statModifiers: [
          { source: "item", target: "armor_production", type: "multiplicative", value: 1.5 }
        ]
      }
    ]
  },
  {
    id: 0,
    name: "Ancient Friendship Scroll",
    description: "Un parchemin ancien qui augmente de façon permanente la production d'amis.",
    price: 1000,
    minLevelToBuy: 5,
    itemType: DinosaurItemType.Persistent,
    category: DinosaurItemCategory.Advanced,
    levels: [
      {
        level: 1,
        price: 3000,
        statModifiers: [
          { source: "item", target: "friend_production", type: "multiplicative", value: 0.1 }
        ]
      },
      {
        level: 2,
        price: 6000,
        statModifiers: [
          { source: "item", target: "friend_production", type: "multiplicative", value: 0.15 }
        ]
      }
    ]
  },
  {
    id: 0,
    name: "Employee Handbook",
    description: "Un manuel indispensable qui augmente de façon permanente la production d'employés.",
    price: 1000,
    minLevelToBuy: 5,
    itemType: DinosaurItemType.Persistent,
    category: DinosaurItemCategory.Advanced,
    levels: [
      {
        level: 1,
        price: 3000,
        statModifiers: [
          { source: "item", target: "employee_production", type: "multiplicative", value: 0.1 }
        ]
      },
      {
        level: 2,
        price: 6000,
        statModifiers: [
          { source: "item", target: "employee_production", type: "multiplicative", value: 0.15 }
        ]
      }
    ]
  }
];
