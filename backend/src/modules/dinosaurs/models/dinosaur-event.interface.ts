import { DinosaurAction } from "./dinosaur-action.enum";
import { EventModifier } from "./event-modifier.interface";

export interface DinosaurEvent {
    id: number;
    name: string;
    description?: string;
    actionType: DinosaurAction; // Utilisation de l'enum existante
    minLevel: number;
    weight: number;
    positivityScore: number; // Valeur négative pour un effet négatif, positive pour un effet positif bornée en -10 et +10
    modifiers: EventModifier[];
}
