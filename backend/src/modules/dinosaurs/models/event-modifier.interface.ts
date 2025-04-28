export type EventModifierTarget = 'energy' | 'food' | 'hunger' | 'experience' | 'karma';

export interface EventModifier {
    source: string;
    type: 'additive' | 'multiplicative';
    value: number;
    target: EventModifierTarget;
  }
  