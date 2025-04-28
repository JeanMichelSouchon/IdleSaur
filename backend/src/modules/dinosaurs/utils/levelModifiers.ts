import { StatModifier, StatTarget, ModifierType } from '../models/stats-modifiers.types';

export const getLevelModifiers = (level: number): StatModifier[] => {
  const modifiers: StatModifier[] = [];

  // Bonus additif : +1000 par niveau au-delà de 1 pour les capacités de base
  if (level > 1) {
    const bonus = 1000 * (level - 1);
    const percentageBonus = (level - 1) / 25;
    modifiers.push({
      source: "level",
      type: "additive",
      value: bonus,
      target: "base_max_energy"
    });
    modifiers.push({
      source: "level",
      type: "additive",
      value: bonus,
      target: "base_max_food"
    });
    modifiers.push({
      source: "level",
      type: "additive",
      value: bonus,
      target: "base_max_hunger"
    });
    modifiers.push({
      source: "level",
      type: "additive",
      value: percentageBonus * 1.5,
      target: "hunger_increase_multiplier"
    });
    modifiers.push({
      source: "level",
      type: "additive",
      value: percentageBonus,
      target: "energy_recovery_multiplier"
    });
    modifiers.push({
      source: "level",
      type: "additive",
      value: percentageBonus * 1.5,
      target: "energy_decay_multiplier"
    });
  }

  // Earn experience multiplier : à partir du lvl 5, +10% tous les 5 niveaux.
  if (level >= 5) {
    const increments = Math.floor((level - 5) / 5) + 1;
    modifiers.push({
      source: "level",
      type: "multiplicative",
      value: 0.10 * increments,
      target: "earn_experience_multiplier"
    });
  }

  // Earn skill point multiplier : à partir du lvl 10, +10% tous les 5 niveaux.
  if (level >= 10) {
    const increments = Math.floor((level - 10) / 5) + 1;
    modifiers.push({
      source: "level",
      type: "multiplicative",
      value: 0.10 * increments,
      target: "earn_skill_point_multiplier"
    });
  }

  // Réduction du hunger_increase_multiplier : à partir du lvl 25, réduction de 25% tous les 25 niveaux
  if (level >= 25) {
    const increments = Math.floor((level - 25) / 25) + 1;
    const reduction = Math.min(0.25 * increments, 1); // max 100% de réduction
    // On représente une réduction en multiplicatif négatif
    modifiers.push({
      source: "level",
      type: "multiplicative",
      value: -reduction,
      target: "hunger_increase_multiplier"
    });
  }

  // Bonus pour max_food_multiplier et max_energy_multiplier, etc.
  // Vous pouvez ajouter ici d'autres règles spécifiques selon vos besoins.

  return modifiers;
};
