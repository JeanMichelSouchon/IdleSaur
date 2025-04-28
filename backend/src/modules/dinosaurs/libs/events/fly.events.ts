import { ENERGY_COST_SPECIAL_ACTION } from "../../../../common/config/actions.constants";
import { DinosaurAction } from "../../models/dinosaur-action.enum";
import { DynamicEventData } from "../../models/dynamic-event-data.interface";

export const flyEvents: DynamicEventData[] = [
  {
    id: 0,
    name: "Vol gracieux",
    actionType: DinosaurAction.Fly,
    minLevel: 10,
    positivityScore: 0,
    weight: 40,
    descriptions: [
      "Le dinosaure s'élève avec élégance, planant au-dessus des cieux.",
      "Un vol gracieux qui lui permet de survoler la jungle avec finesse.",
      "Il déploie ses ailes avec aisance, offrant un spectacle aérien remarquable.",
      "Un envol harmonieux, où la légèreté règne en maître.",
      "Le vol gracieux témoigne de sa maîtrise et apporte une stabilité dans ses ressources."
    ],
    baseModifiers: [
      {
        source: "fly",
        target: "experience",
        base_value: 0,
        additiveStep: 10,
        additiveIncrement: 4000,
        multiplicativeStep: 50,
        multiplicativeIncrement: 1
      },
      {
        source: "fly",
        target: "energy",
        base_value: -ENERGY_COST_SPECIAL_ACTION,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "fly",
        target: "money",
        base_value: 1000,
        additiveStep: 5,
        additiveIncrement: 200,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      }
    ]
  },
  {
    id: 0,
    name: "Vol audacieux",
    actionType: DinosaurAction.Fly,
    minLevel: 10,
    positivityScore: 3,
    weight: 20,
    descriptions: [
      "Le dinosaure se lance dans un vol audacieux, défiant les vents turbulents.",
      "Un envol intrépide qui lui offre un bonus appréciable en expérience.",
      "Il fend les airs avec détermination, repoussant ses limites.",
      "Un vol audacieux, mêlant risque et récompense, qui stimule ses ressources.",
      "L'envol audacieux ouvre de nouvelles perspectives dans le ciel, apportant des gains mesurés."
    ],
    baseModifiers: [
      {
        source: "fly",
        target: "experience",
        base_value: 1000,
        additiveStep: 10,
        additiveIncrement: 2000,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "fly",
        target: "energy",
        base_value: -ENERGY_COST_SPECIAL_ACTION,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "fly",
        target: "money",
        base_value: 1500,
        additiveStep: 5,
        additiveIncrement: 300,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      }
    ]
  },
  {
    id: 0,
    name: "Vol périlleux",
    actionType: DinosaurAction.Fly,
    minLevel: 10,
    positivityScore: -7,
    weight: 20,
    descriptions: [
      "Le vol devient périlleux, subissant de violentes turbulences.",
      "Un envol risqué qui entraîne de lourdes pertes d'énergie.",
      "Les vents contraires compromettent son vol, sans aucun gain notable.",
      "Un vol périlleux qui se solde par un retour négatif en ressources.",
      "Les dangers du ciel se manifestent, et l'envol se termine en échec."
    ],
    baseModifiers: [
      {
        source: "fly",
        target: "experience",
        base_value: 0,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "fly",
        target: "energy",
        base_value: -ENERGY_COST_SPECIAL_ACTION,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      }
      // Aucun modificateur pour money
    ]
  },
  {
    id: 0,
    name: "Vol légendaire",
    actionType: DinosaurAction.Fly,
    minLevel: 10,
    positivityScore: 10,
    weight: 5,
    descriptions: [
      "Un vol légendaire qui défie la gravité, offrant des gains exceptionnels.",
      "Le dinosaure réalise un envol héroïque, ramenant un butin phénoménal.",
      "Un exploit aérien qui transforme l'effort en une fortune inouïe.",
      "Les cieux s'ouvrent pour lui, révélant des récompenses dignes des plus grands aventuriers.",
      "Un vol spectaculaire qui marque une nouvelle ère dans ses capacités aériennes."
    ],
    baseModifiers: [
      {
        source: "fly",
        target: "experience",
        base_value: 15000,
        additiveStep: 10,
        additiveIncrement: 5000,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "fly",
        target: "energy",
        base_value: -ENERGY_COST_SPECIAL_ACTION,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "fly",
        target: "money",
        base_value: 2000,
        additiveStep: 5,
        additiveIncrement: 1000,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "fly",
        target: "skillPoints",
        base_value: 50,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      }
    ]
  }
];
