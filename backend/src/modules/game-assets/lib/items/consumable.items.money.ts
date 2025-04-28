import { DinosaurItemDTO } from '../../models/dinosaur-item.dto';
import { DinosaurItemType, DinosaurItemCategory } from '../../models/dinosaur-item.enums';

/**
 * Items consommables pour la catégorie Money
 */
export const consumableMoneyItems: DinosaurItemDTO[] = [
  {
    id: 0,
    name: "Gold Nugget",
    description: "Augmente temporairement la production de monnaie.",
    price: 250,
    minLevelToBuy: 1,
    itemType: DinosaurItemType.Consumable,
    category: DinosaurItemCategory.Money,
    levels: []
  }
];
