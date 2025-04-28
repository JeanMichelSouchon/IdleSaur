import { Exclude, Expose, Type } from 'class-transformer';
import { StatModifier } from '../../dinosaurs/models/stats-modifiers.types';
import { DinosaurItemType, DinosaurItemCategory } from './dinosaur-item.enums';

/**
 * DTO de définition d'un item pour le module Game-Assets.
 * La définition inclut la configuration de base et, pour les items persistants,
 * l'array des niveaux définissant les modificateurs par level.
 */
@Exclude()
export class DinosaurItemDTO {
  @Expose() id!: number;
  @Expose() name!: string;
  @Expose() description?: string;
  @Expose() price!: number;
  @Expose() minLevelToBuy!: number;
  @Expose() itemType!: DinosaurItemType;
  @Expose() category?: DinosaurItemCategory;
  /**
   * Pour les items de type Persistent, ce tableau définit la progression des niveaux.
   * Pour les consommables, il peut être vide ou ignoré.
   */
  @Expose() @Type(() => DinosaurItemLevelDTO) levels!: DinosaurItemLevelDTO[];
}

/**
 * DTO définissant un niveau pour un item persistant.
 */
@Exclude()
export class DinosaurItemLevelDTO {
  @Expose() level!: number;
  @Expose() price!: number;
  @Expose() statModifiers!: StatModifier[];
}
