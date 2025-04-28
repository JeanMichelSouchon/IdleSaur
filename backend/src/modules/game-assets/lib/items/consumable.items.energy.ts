import { DinosaurItemDTO } from '../../models/dinosaur-item.dto';
import { DinosaurItemType, DinosaurItemCategory } from '../../models/dinosaur-item.enums';

/**
 * Items consommables pour la catégorie Energy
 */
export const consumableEnergyItems: DinosaurItemDTO[] = [
  {
    id: 0,
    name: "Energy Drink",
    description: "Restaure instantanément l'énergie.",
    price: 100,
    minLevelToBuy: 1,
    itemType: DinosaurItemType.Consumable,
    category: DinosaurItemCategory.Energy,
    levels: []
  }
];
