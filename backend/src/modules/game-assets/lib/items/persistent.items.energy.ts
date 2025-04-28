import { DinosaurItemDTO } from '../../models/dinosaur-item.dto';
import { DinosaurItemType, DinosaurItemCategory } from '../../models/dinosaur-item.enums';

/**
 * Item persistant pour la catégorie Energy
 */
export const persistentEnergyItems: DinosaurItemDTO[] = [
  {
    id: 0,
    name: "Pendentif Dent de T-Rex",
    description: "Augmente de façon permanente l'énergie maximale.",
    price: 300,
    minLevelToBuy: 5,
    itemType: DinosaurItemType.Persistent,
    category: DinosaurItemCategory.Energy,
    levels: [
      {
        level: 1,
        price: 2500,
        statModifiers: [
          { source: "item", target: "base_max_energy", type: "additive", value: 5000 }
        ]
      },
      {
        level: 2,
        price: 5000,
        statModifiers: [
          { source: "item", target: "base_max_energy", type: "additive", value: 7500 }
        ]
      },
      {
        level: 3,
        price: 7500,
        statModifiers: [
          { source: "item", target: "base_max_energy", type: "additive", value: 10000 }
        ]
      }
    ]
  }
];
