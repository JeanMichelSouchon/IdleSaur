import { DinosaurItemDTO } from '../../models/dinosaur-item.dto';
import { DinosaurItemType, DinosaurItemCategory } from '../../models/dinosaur-item.enums';

/**
 * Item persistant pour la catégorie Karma
 */
export const persistentKarmaItems: DinosaurItemDTO[] = [
  {
    id: 0,
    name: "Sacred Talisman",
    description: "Augmente de façon permanente le gain de karma.",
    price: 1000,
    minLevelToBuy: 5,
    itemType: DinosaurItemType.Persistent,
    category: DinosaurItemCategory.Karma,
    levels: [
      {
        level: 1,
        price: 2500,
        statModifiers: [
          { source: "item", target: "earn_karma_multiplier", type: "multiplicative", value: 0.1 }
        ]
      },
      {
        level: 2,
        price: 5000,
        statModifiers: [
          { source: "item", target: "earn_karma_multiplier", type: "multiplicative", value: 0.15 }
        ]
      }
    ]
  }
];
