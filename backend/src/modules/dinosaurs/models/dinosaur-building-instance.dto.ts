import { Exclude, Expose, Type } from 'class-transformer';
import { DinosaurBuildingDTO } from '../../game-assets/models/dinosaur-building.dto';

/**
 * DTO représentant une instance d'un bâtiment détenu par un dinosaure.
 * Hérite de la définition de base et ajoute des informations spécifiques telles que :
 * - currentLevel : le niveau actuel du bâtiment pour ce dinosaure.
 * - purchasedUpgrades : un mapping (JSON) indiquant pour chaque id de nœud d'amélioration si l'upgrade a été acheté.
 */
@Exclude()
export class DinosaurBuildingInstanceDTO extends DinosaurBuildingDTO {
  /**
   * Le niveau actuel du bâtiment pour ce dinosaure.
   */
  @Expose() currentLevel!: number;
  
  /**
   * Un mapping indiquant pour chaque id de nœud d'amélioration si l'upgrade est acheté.
   * Par exemple : { "1": true, "2": false, ... }
   */
  @Expose() purchasedUpgrades!: Record<number, boolean>;
}
