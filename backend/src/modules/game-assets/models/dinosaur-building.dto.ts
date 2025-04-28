import { Exclude, Expose, Type } from 'class-transformer';
import { StatModifier } from '../../dinosaurs/models/stats-modifiers.types';
import { ImprovementNodeDTO } from './improvement-node.dto';

/**
 * DTO de définition d'un bâtiment pour le module Game-Assets.
 * Le bâtiment est défini avec son arbre d'améliorations et ses modificateurs de base.
 */
@Exclude()
export class DinosaurBuildingDTO {
  @Expose() id!: number;
  @Expose() name!: string;
  @Expose() description?: string;
  @Expose() price!: number;
  @Expose() minLevelToBuy!: number;
  
  /**
   * Le niveau maximum peut être déduit de la taille de l'arbre d'améliorations.
   */
  @Expose() maxLevel!: number;
  /**
   * Arbre d'améliorations interne.
   */
  @Expose() @Type(() => ImprovementNodeDTO) improvementTree!: ImprovementNodeDTO[];
  @Expose() statModifiers!: StatModifier[];
}
