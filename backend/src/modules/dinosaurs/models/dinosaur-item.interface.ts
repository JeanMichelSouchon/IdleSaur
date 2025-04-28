import { StatModifier } from './stats-modifiers.types';

/**
 * Interface représentant le niveau d'un objet pour un dinosaure.
 * Chaque niveau définit des modificateurs spécifiques appliqués lors de l'amélioration de l'objet.
 */
export interface DinosaurItemLevel {
  /**
   * Niveau spécifique de l'objet.
   */
  level: number;

  /**
   * Tableau de modificateurs qui s'appliquent à ce niveau.
   */
  statModifiers: StatModifier[];
}

/**
 * Interface représentant un objet utilisable par un dinosaure.
 * Les objets se paient en argent et nécessitent un niveau minimum pour être achetés.
 * Chaque objet peut être amélioré jusqu'à un niveau maximum, chaque niveau apportant des modificateurs supplémentaires.
 */
export interface DinosaurItem {
  /**
   * Identifiant unique de l'objet.
   */
  id: number;

  /**
   * Nom de l'objet.
   */
  name: string;

  /**
   * Description optionnelle de l'objet.
   */
  description?: string;

  /**
   * Prix en argent requis pour acheter cet objet.
   */
  price: number;

  /**
   * Niveau minimum du dinosaure requis pour pouvoir acheter cet objet.
   */
  minLevelToBuy: number;

  /**
   * Niveau actuel de l'objet.
   */
  currentLevel: number;

  /**
   * Niveau maximum que l'objet peut atteindre.
   */
  maxLevel: number;

  /**
   * Définition des modificateurs pour chaque niveau de l'objet.
   */
  levels: DinosaurItemLevel[];
}
