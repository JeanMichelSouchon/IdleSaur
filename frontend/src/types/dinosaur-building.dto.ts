import { ImprovementNodeDTO } from './improvement-node.dto';
import { StatModifier } from './stats-modifiers.types';

/**
 * DTO de définition d'un bâtiment pour le module Game-Assets.
 * Le bâtiment est défini avec son arbre d'améliorations et ses modificateurs de base.
 */
export class DinosaurBuildingDTO {
  id!: number;
  name!: string;
  description?: string;
  price!: number;
  minLevelToBuy!: number;
  
  /**
   * Le niveau maximum peut être déduit de la taille de l'arbre d'améliorations.
   */
  maxLevel!: number;
  /**
   * Arbre d'améliorations interne.
   */
  improvementTree!: ImprovementNodeDTO[];
  statModifiers!: StatModifier[];
}
