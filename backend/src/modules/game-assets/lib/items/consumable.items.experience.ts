import { DinosaurItemDTO } from '../../models/dinosaur-item.dto';
import { DinosaurItemType, DinosaurItemCategory } from '../../models/dinosaur-item.enums';

/**
 * Items consommables pour la catégorie Experience
 */
export const consumableExperienceItems: DinosaurItemDTO[] = [
  {
    id: 0,
    name: "XP Potion",
    description: "Donne un boost temporaire d'expérience.",
    price: 200,
    minLevelToBuy: 1,
    itemType: DinosaurItemType.Consumable,
    category: DinosaurItemCategory.Experience,
    levels: []
  }
];
