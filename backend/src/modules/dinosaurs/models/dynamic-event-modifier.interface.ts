export type DynamicEventModifierTarget = 'energy' | 'food' | 'hunger' | 'experience' | 'karma' ;
/**
 * Interface représentant un modificateur pour un DynamicEvent.
 * Ce modificateur applique deux types d'incrémentation, additive et multiplicative,
 * qui peuvent être cumulés. Chaque incrémentation s'applique selon un "step" (pas) défini.
 *
 * - additiveStep : définit la fréquence d'application additive (ex: 1 pour chaque niveau).
 * - additiveIncrement : valeur additive appliquée à chaque étape (ex: +100).
 *
 * - multiplicativeStep : définit la fréquence d'application multiplicative (ex: 5 pour tous les 5 niveaux).
 * - multiplicativeIncrement : facteur multiplicatif appliqué à chaque étape (ex: 0.1 pour +10%).
 *
 * Si un des pas ou incréments est zéro, alors le mode correspondant n'est pas appliqué.
 */
export interface DynamicEventModifier {
  source: string;
  target: DynamicEventModifierTarget;
  base_value: number;
  additiveStep: number;
  additiveIncrement: number;
  multiplicativeStep: number;
  multiplicativeIncrement: number;
}
