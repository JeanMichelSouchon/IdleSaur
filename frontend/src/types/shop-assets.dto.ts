import { DinosaurSkillDTO } from './dinosaur-skill.dto';
import { DinosaurItemDTO } from './dinosaur-item.dto';
import { DinosaurBuildingDTO } from './dinosaur-building.dto';
import { DinosaurSoulSkillDTO } from './dinosaur-soul-skill.dto';

/**
 * DTO regroupant l'ensemble des game assets disponibles dans le shop.
 */
export class ShopAssetsDTO {
  skills!: DinosaurSkillDTO[];
  items!: DinosaurItemDTO[];
  buildings!: DinosaurBuildingDTO[];
  soulSkills!: DinosaurSoulSkillDTO[];
}
