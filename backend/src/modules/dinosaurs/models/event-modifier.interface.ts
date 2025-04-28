export type EventModifierTarget = 'energy' | 'food' | 'hunger' | 'experience' | 'karma' | 'money' | 'skillPoints';


export interface EventModifier {
    source: string;
    type: 'additive' | 'multiplicative';
    value: number;
    target: EventModifierTarget;
  }
  