import { Exclude, Expose, Type } from 'class-transformer';
import { DinosaurSkillDTO } from './dinosaur-skill.dto';
import { DinosaurItemDTO } from './dinosaur-item.dto';
import { DinosaurBuildingDTO } from './dinosaur-building.dto';
import { DinosaurSoulSkillDTO } from './dinosaur-soul-skill.dto';

/**
 * DTO regroupant l'ensemble des game assets disponibles dans le shop.
 */
@Exclude()
export class ShopAssetsDTO {
  @Expose() @Type(() => DinosaurSkillDTO)
  skills!: DinosaurSkillDTO[];

  @Expose() @Type(() => DinosaurItemDTO)
  items!: DinosaurItemDTO[];

  @Expose() @Type(() => DinosaurBuildingDTO)
  buildings!: DinosaurBuildingDTO[];

  @Expose() @Type(() => DinosaurSoulSkillDTO)
  soulSkills!: DinosaurSoulSkillDTO[];
}
