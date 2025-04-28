import { DinosaurItemDTO } from '../../models/dinosaur-item.dto';
import { DinosaurItemType, DinosaurItemCategory } from '../../models/dinosaur-item.enums';

/**
 * Item persistant pour la catégorie Money
 */
export const persistentMoneyItems: DinosaurItemDTO[] = [
  {
    id: 0,
    name: "Golden Crown",
    description: "Augmente de façon permanente le gain de monnaie.",
    price: 500,
    minLevelToBuy: 5,
    itemType: DinosaurItemType.Persistent,
    category: DinosaurItemCategory.Money,
    levels: [
      {
        level: 1,
        price: 2500,
        statModifiers: [
          { source: "item", target: "earn_money_multiplier", type: "multiplicative", value: 0.1 }
        ]
      },
      {
        level: 2,
        price: 5000,
        statModifiers: [
          { source: "item", target: "earn_money_multiplier", type: "multiplicative", value: 0.15 }
        ]
      }
    ]
  }
];
