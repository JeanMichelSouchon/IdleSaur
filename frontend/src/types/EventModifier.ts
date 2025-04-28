/**
 * Les cibles possibles pour un modificateur d'événement.
 */
export type EventModifierTarget = 'energy' | 'food' | 'hunger' | 'experience' | 'karma' | 'money' | 'skillPoints';

/**
 * Interface représentant un modificateur appliqué à une statistique par un événement.
 */
export interface EventModifier {
  source: string;
  type: 'additive' | 'multiplicative';
  value: number;
  target: EventModifierTarget;
}
