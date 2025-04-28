import { StatModifier } from './stats-modifiers.types';

/**
 * Interface représentant une compétence (skill) pour un dinosaure.
 * Les compétences sont accessibles via un arbre de compétences et s'achètent avec des points de compétence.
 * Chaque compétence appartient à une famille et possède un niveau hiérarchique (tier) dans cette famille.
 * Le prérequis est d'avoir acheté toutes les compétences du tier précédent dans la même famille.
 */
export interface DinosaurSkill {
  /**
   * Identifiant unique de la compétence.
   */
  id: number;

  /**
   * Nom de la compétence.
   */
  name: string;

  /**
   * Description optionnelle de la compétence.
   */
  description?: string;

  /**
   * Prix en points de compétence requis pour débloquer cette compétence.
   */
  price: number;

  /**
   * Niveau minimum du dinosaure requis pour pouvoir acheter cette compétence.
   */
  minLevelToBuy: number;

  /**
   * Famille ou catégorie principale de la compétence (ex. "Offensive", "Défensive", "Utilitaire", etc.).
   */
  family: string;

  /**
   * Niveau hiérarchique (tier) au sein de la famille.
   */
  tier: number;

  /**
   * Tableau de modificateurs qui s'appliquent aux statistiques du dinosaure une fois la compétence débloquée.
   */
  statModifiers: StatModifier[];
}
