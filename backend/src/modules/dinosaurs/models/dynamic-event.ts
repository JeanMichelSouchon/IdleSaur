// src/modules/dinosaurs/models/dynamic-event.ts

import { DynamicEventData } from "./dynamic-event-data.interface";
import { DinosaurEvent } from "./dinosaur-event.interface";
import { DinosaurAction } from "./dinosaur-action.enum";
import { DynamicEventModifier } from "./dynamic-event-modifier.interface";

export class DynamicEvent {
  private data: DynamicEventData;

  constructor(data: DynamicEventData) {
    this.data = data;
  }

  /**
   * Génère un événement final (DinosaurEvent) en fonction du niveau du dinosaure.
   *
   * Pour chaque modificateur du template :
   * - Le modificateur additif est toujours calculé :
   *     effect = additiveStep > 0 ? base_value + floor(level / additiveStep) * additiveIncrement : base_value
   *
   * - Le modificateur multiplicatif est calculé uniquement si multiplicativeStep > 0.
   *   Dans ce cas, l'effet est :
   *     effect = 1 + floor(level / multiplicativeStep) * multiplicativeIncrement
   *   (On n'ajoute aucun modificateur multiplicatif si multiplicativeStep vaut 0.)
   *
   * @param dinosaurLevel Le niveau du dinosaure.
   * @returns Un objet DinosaurEvent généré.
   */
  public generateEvent(dinosaurLevel: number): DinosaurEvent {
    if (dinosaurLevel < this.data.minLevel) {
      throw new Error("Niveau insuffisant pour générer cet event dynamique.");
    }

    console.log("Génération de l'événement", this.data.name, "pour le niveau", dinosaurLevel);
    console.log("Modifiers de base :");
    this.data.baseModifiers.forEach(mod => console.log(mod));

    // Choix aléatoire d'une description parmi celles disponibles
    const randomIndex = Math.floor(Math.random() * this.data.descriptions.length);
    const description = this.data.descriptions[randomIndex];

    // Calcul des modificateurs finaux
    const finalModifiers = this.data.baseModifiers.reduce((acc: any[], mod: DynamicEventModifier) => {
      // Calcul du modificateur additif
      const additiveEffect =
        mod.additiveStep > 0
          ? mod.base_value + Math.floor(dinosaurLevel / mod.additiveStep) * mod.additiveIncrement
          : mod.base_value;
      acc.push({
        source: mod.source,
        target: mod.target,
        type: "additive" as const,
        value: additiveEffect
      });

      // Calcul du modificateur multiplicatif uniquement si multiplicativeStep > 0
      if (mod.multiplicativeStep > 0) {
        const multiplicativeEffect = 1 + Math.floor(dinosaurLevel / mod.multiplicativeStep) * mod.multiplicativeIncrement;
        // N'ajoute le modificateur que s'il modifie la valeur (différent de 1)
        if (multiplicativeEffect !== 1) {
          acc.push({
            source: mod.source,
            target: mod.target,
            type: "multiplicative" as const,
            value: multiplicativeEffect
          });
        }
      }
      console.log("Pour le modificateur", mod.source, "-> additif:", additiveEffect, ", multiplicatif:",
                  mod.multiplicativeStep > 0 ? (1 + Math.floor(dinosaurLevel / mod.multiplicativeStep) * mod.multiplicativeIncrement) : "non appliqué");
      return acc;
    }, []);

    console.log("Event généré :", finalModifiers);

    return {
      id: this.data.id,
      name: this.data.name,
      description,
      actionType: this.data.actionType,
      minLevel: this.data.minLevel,
      weight: this.data.weight,
      positivityScore: this.data.positivityScore,
      modifiers: finalModifiers
    };
  }
}
