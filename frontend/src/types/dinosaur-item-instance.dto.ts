import { DinosaurItemDTO } from "./dinosaur-item.dto";

/**
 * DTO représentant une instance d'un item détenu par un dinosaure.
 * Hérite de la définition de base et ajoute l'information sur le niveau détenu (ou quantité pour les consommables).
 */
export class DinosaurItemInstanceDTO extends DinosaurItemDTO {
  /**
   * Pour un item persistant, il s'agit du niveau actuel de l'item pour ce dinosaure.
   * Pour un consommable, c'est la quantité détenue.
   */
  currentLevelOrQuantity!: number;
  
  /**
   * Indique si l'item est actuellement équipé (utile pour les items persistants).
   */
  isEquipped?: boolean;
}
