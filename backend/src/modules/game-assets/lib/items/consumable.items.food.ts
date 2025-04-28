import { DinosaurItemDTO } from '../../models/dinosaur-item.dto';
import { DinosaurItemType, DinosaurItemCategory } from '../../models/dinosaur-item.enums';

/**
 * Items consommables pour la catégorie Food
 */
export const consumableFoodItems: DinosaurItemDTO[] = [
  {
    id: 0,
    name: "Barre chocolatée",
    description: "Restaure partiellement la valeur de nourriture.",
    price: 100,
    minLevelToBuy: 1,
    itemType: DinosaurItemType.Consumable,
    category: DinosaurItemCategory.Food,
    levels: []
  }
];
