import { DinosaurItemType, DinosaurItemCategory } from './dinosaur-item.enums';
import { StatModifier } from './stats-modifiers.types';

/**
 * DTO de définition d'un item pour le module Game-Assets.
 * La définition inclut la configuration de base et, pour les items persistants,
 * l'array des niveaux définissant les modificateurs par level.
 */
export class DinosaurItemDTO {
  id!: number;
  name!: string;
  description?: string;
  price!: number;
  minLevelToBuy!: number;
  itemType!: DinosaurItemType;
  category?: DinosaurItemCategory;
  /**
   * Pour les items de type Persistent, ce tableau définit la progression des niveaux.
   * Pour les consommables, il peut être vide ou ignoré.
   */
  levels!: DinosaurItemLevelDTO[];
}

/**
 * DTO définissant un niveau pour un item persistant.
 */
export class DinosaurItemLevelDTO {
  level!: number;
  price!: number;
  statModifiers!: StatModifier[];
}
