import { Exclude, Expose } from 'class-transformer';
import { StatModifier } from '../../dinosaurs/models/stats-modifiers.types';

/**
 * DTO représentant un nœud d'amélioration dans l'arbre d'un bâtiment.
 */
@Exclude()
export class ImprovementNodeDTO {
  @Expose() id!: number;
  @Expose() name!: string;
  @Expose() description?: string;
  /**
   * Coût (en ressources ou monnaie) pour débloquer ce nœud.
   */
  @Expose() cost!: number;
  /**
   * Liste des identifiants des nœuds prérequis.
   */
  @Expose() prerequisites!: number[];
  @Expose() statModifiers!: StatModifier[];
}
