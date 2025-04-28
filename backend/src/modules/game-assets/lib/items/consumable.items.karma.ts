import { DinosaurItemDTO } from '../../models/dinosaur-item.dto';
import { DinosaurItemType, DinosaurItemCategory } from '../../models/dinosaur-item.enums';

/**
 * Items consommables pour la catégorie Karma
 */
export const consumableKarmaItems: DinosaurItemDTO[] = [
  {
    id: 0,
    name: "Blessed Amulet",
    description: "Accorde un bonus temporaire de karma.",
    price: 250,
    minLevelToBuy: 1,
    itemType: DinosaurItemType.Consumable,
    category: DinosaurItemCategory.Karma,
    levels: []
  }
];
