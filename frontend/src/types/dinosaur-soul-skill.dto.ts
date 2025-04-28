import { StatModifier } from "./stats-modifiers.types";

/**
 * Énumération des types de soul points requis pour l'achat.
 */
export enum SoulType {
  Neutral = 'neutral',
  Bright = 'bright',
  Dark = 'dark'
}

/**
 * DTO de définition d'une soul skill pour le module Game-Assets.
 * Ces skills représentent des améliorations persistantes entre vies,
 * achetables uniquement avec les soul points (neutral, bright ou dark).
 */
export class DinosaurSoulSkillDTO {
  id!: number;
  name!: string;
  description?: string;
  price!: number;
  soulType!: SoulType;
  tier!: number;
  statModifiers!: StatModifier[];
}
