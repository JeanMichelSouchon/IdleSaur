import { DinosaurItemDTO } from '../../models/dinosaur-item.dto';
import { DinosaurItemType, DinosaurItemCategory } from '../../models/dinosaur-item.enums';

/**
 * Item persistant pour la catégorie Food
 */
export const persistentFoodItems: DinosaurItemDTO[] = [
  {
    id: 0,
    name: "Bowl of Ancient Grains",
    description: "Augmente de façon permanente la capacité de stockage de nourriture.",
    price: 400,
    minLevelToBuy: 4,
    itemType: DinosaurItemType.Persistent,
    category: DinosaurItemCategory.Food,
    levels: [
      {
        level: 1,
        price: 5000,
        statModifiers: [
          { source: "item", target: "base_max_food", type: "additive", value: 5000 }
        ]
      },
      {
        level: 2,
        price: 5000,
        statModifiers: [
          { source: "item", target: "base_max_food", type: "additive", value: 7500 }
        ]
      }
    ]
  }
];
