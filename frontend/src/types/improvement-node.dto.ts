import { StatModifier } from "./stats-modifiers.types";

/**
 * DTO représentant un nœud d'amélioration dans l'arbre d'un bâtiment.
 */
export class ImprovementNodeDTO {
  id!: number;
  name!: string;
  description?: string;
  /**
   * Coût (en ressources ou monnaie) pour débloquer ce nœud.
   */
  cost!: number;
  /**
   * Liste des identifiants des nœuds prérequis.
   */
  prerequisites!: number[];
  statModifiers!: StatModifier[];
}
