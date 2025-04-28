import { DinosaurItemDTO } from '../../models/dinosaur-item.dto';
import { DinosaurItemType, DinosaurItemCategory } from '../../models/dinosaur-item.enums';

/**
 * Item persistant pour la catégorie Experience
 */
export const persistentExperienceItems: DinosaurItemDTO[] = [
  {
    id: 0,
    name: "Ancient Scroll",
    description: "Augmente de façon permanente le gain d'expérience.",
    price: 600,
    minLevelToBuy: 6,
    itemType: DinosaurItemType.Persistent,
    category: DinosaurItemCategory.Experience,
    levels: [
      {
        level: 1,
        price: 2500,
        statModifiers: [
          { source: "item", target: "earn_experience_multiplier", type: "multiplicative", value: 0.1 }
        ]
      },
      {
        level: 2,
        price: 5000,
        statModifiers: [
          { source: "item", target: "earn_experience_multiplier", type: "multiplicative", value: 0.15 }
        ]
      }
    ]
  }
];
