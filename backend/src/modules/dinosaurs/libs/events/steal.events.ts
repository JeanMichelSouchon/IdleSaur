// src/models/stealEvents.ts
import { ENERGY_COST_TO_STEAL } from "../../../../common/config/actions.constants";
import { DinosaurAction } from "../../models/dinosaur-action.enum";
import { DynamicEventData } from "../../models/dynamic-event-data.interface";

export const stealEvents: DynamicEventData[] = [
  {
    id: 0,
    name: "Vol réussi",
    actionType: DinosaurAction.Steal,
    minLevel: 4,
    positivityScore: 0,
    weight: 1,
    descriptions: [
      "Le dinosaure vole habilement et rafle une grosse quantité de ressources.",
      "Un vol réussi, les proies n'ont aucune chance face à lui.",
      "Le vol est un succès éclatant, mais laisse un arrière-goût amer.",
      "Une opération de vol qui rapporte gros, malgré son côté douteux.",
      "Le dinosaure s'empare d'un butin impressionnant dans un geste de bravoure… ou d'arrogance."
    ],
    baseModifiers: [
      {
        source: "steal",
        target: "experience",
        base_value: 500,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 10,
        multiplicativeIncrement: 0.5
      },
      {
        source: "steal",
        target: "energy",
        base_value: -ENERGY_COST_TO_STEAL,
        additiveStep: 0,
        additiveIncrement: -ENERGY_COST_TO_STEAL,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "steal",
        target: "food",
        base_value: 5000,
        additiveStep: 5,
        additiveIncrement: 1000,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "steal",
        target: "karma",
        base_value: -500,
        additiveStep: 5,
        additiveIncrement: -250,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      }
    ]
  },
  {
    id: 0,
    name: "Vol modéré",
    actionType: DinosaurAction.Steal,
    minLevel: 4,
    positivityScore: 5,
    weight: 3,
    descriptions: [
      "Le dinosaure réussit un vol discret, avec des gains modérés.",
      "Un vol modéré qui rapporte sans faire de vagues.",
      "Les ressources volées sont correctes, mais rien d'extraordinaire.",
      "Un vol raisonnable, juste assez pour satisfaire son appétit de larcin.",
      "Le vol se fait dans la discrétion, sans éclat ni débordement."
    ],
    baseModifiers: [
      {
        source: "steal",
        target: "experience",
        base_value: 750,
        additiveStep: 0,
        additiveIncrement: 250,
        multiplicativeStep: 10,
        multiplicativeIncrement: 0.5
      },
      {
        source: "steal",
        target: "energy",
        base_value: -ENERGY_COST_TO_STEAL,
        additiveStep: 0,
        additiveIncrement: -ENERGY_COST_TO_STEAL,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "steal",
        target: "food",
        base_value: 7500,
        additiveStep: 5,
        additiveIncrement: 1500,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "steal",
        target: "karma",
        base_value: -500,
        additiveStep: 5,
        additiveIncrement: -250,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      }
    ]
  },
  {
    id: 0,
    name: "Vol difficile",
    actionType: DinosaurAction.Steal,
    minLevel: 4,
    positivityScore: -3,
    weight: 5,
    descriptions: [
      "Le dinosaure vole un maigre butin, difficile à attraper.",
      "Un vol difficile qui ne rapporte que peu de ressources.",
      "Le vol est laborieux et les gains sont minimes.",
      "Un vol hasardeux qui ne fournit qu'un maigre trésor.",
      "La réussite du vol est limitée par la difficulté de l'opération."
    ],
    baseModifiers: [
      {
        source: "steal",
        target: "experience",
        base_value: 500,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 10,
        multiplicativeIncrement: 0.5
      },
      {
        source: "steal",
        target: "energy",
        base_value: -ENERGY_COST_TO_STEAL,
        additiveStep: 0,
        additiveIncrement: -ENERGY_COST_TO_STEAL,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "steal",
        target: "food",
        base_value: 1000,
        additiveStep: 5,
        additiveIncrement: 500,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "steal",
        target: "karma",
        base_value: -500,
        additiveStep: 5,
        additiveIncrement: -250,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      }
    ]
  },
  {
    id: 0,
    name: "Vol infructueux",
    actionType: DinosaurAction.Steal,
    minLevel: 4,
    positivityScore: -7,
    weight: 5,
    descriptions: [
      "Le dinosaure n’a pas réussi à voler de ressources.",
      "Un vol infructueux qui ne rapporte rien.",
      "Les efforts de vol restent vains.",
      "Le dinosaure a tenté sa chance sans succès.",
      "Un vol raté, sans le moindre butin."
    ],
    baseModifiers: [
      {
        source: "steal",
        target: "experience",
        base_value: 500,
        additiveStep: 5,
        additiveIncrement: 0,
        multiplicativeStep: 10,
        multiplicativeIncrement: 0.5
      },
      {
        source: "steal",
        target: "energy",
        base_value: -ENERGY_COST_TO_STEAL,
        additiveStep: 0,
        additiveIncrement: -ENERGY_COST_TO_STEAL,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "steal",
        target: "karma",
        base_value: -400,
        additiveStep: 10,
        additiveIncrement: 100,
        multiplicativeStep: 5,
        multiplicativeIncrement: 0.25
      }
    ]
  },
  {
    id: 0,
    name: "Vol stratégique",
    actionType: DinosaurAction.Steal,
    minLevel: 6,
    positivityScore: 10,
    weight: 2,
    descriptions: [
      "Le dinosaure utilise une stratégie avancée pour voler efficacement.",
      "Un vol stratégique, chaque mouvement est calculé avec précision.",
      "Le vol est planifié, maximisant les gains.",
      "Une approche méthodique qui optimise le vol.",
      "Le dinosaure exécute un vol tactique avec une grande précision."
    ],
    baseModifiers: [
      {
        source: "steal",
        target: "experience",
        base_value: 1000,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 10,
        multiplicativeIncrement: 0.5
      },
      {
        source: "steal",
        target: "energy",
        base_value: -ENERGY_COST_TO_STEAL,
        additiveStep: 0,
        additiveIncrement: -ENERGY_COST_TO_STEAL,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "steal",
        target: "food",
        base_value: 15000,
        additiveStep: 20,
        additiveIncrement: 5000,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "steal",
        target: "karma",
        base_value: -250,
        additiveStep: 10,
        additiveIncrement: -250,
        multiplicativeStep: 20,
        multiplicativeIncrement: 0.1
      }
    ]
  },
  {
    id: 0,
    name: "Grand vol",
    actionType: DinosaurAction.Steal,
    minLevel: 10,
    positivityScore: 10,
    weight: 1,
    descriptions: [
      "Le dinosaure réalise un grand vol, raflant une quantité massive de ressources.",
      "Un vol spectaculaire qui rapporte gros.",
      "Le grand vol : un coup d'éclat dans le monde du larcin.",
      "Une opération de vol d'envergure, digne des plus grands bandits.",
      "Le dinosaure exécute un vol magistral, laissant ses adversaires sans voix."
    ],
    baseModifiers: [
      {
        source: "steal",
        target: "experience",
        base_value: 1000,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 10,
        multiplicativeIncrement: 0.5
      },
      {
        source: "steal",
        target: "energy",
        base_value: -ENERGY_COST_TO_STEAL,
        additiveStep: 0,
        additiveIncrement: -ENERGY_COST_TO_STEAL,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "steal",
        target: "food",
        base_value: 20000,
        additiveStep: 20,
        additiveIncrement: 10000,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "steal",
        target: "karma",
        base_value: -1000,
        additiveStep: 20,
        additiveIncrement: -500,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      }
    ]
  },
  {
    id: 0,
    name: "Vol de portefeuille",
    actionType: DinosaurAction.Steal,
    minLevel: 3,
    positivityScore: 3,
    weight: 4,
    descriptions: [
      "Le dinosaure dérobe habilement un portefeuille oublié, remplissant ses poches d'une maigre somme.",
      "Un vol discret, digne d'un pickpocket, qui laisse son propriétaire sans un sou.",
      "Avec finesse, il s'empare d'un portefeuille, un coup bas qui rapporte modérément.",
      "Le vol de portefeuille, une opération rapide qui lui permet de se faire un petit extra.",
      "Il réussit à subtiliser un portefeuille, une preuve que l'art du vol n'a pas d'âge."
    ],
    baseModifiers: [
      {
        source: "steal",
        target: "money",
        base_value: 200,
        additiveStep: 5,
        additiveIncrement: 50,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "steal",
        target: "energy",
        base_value: -ENERGY_COST_TO_STEAL,
        additiveStep: 0,
        additiveIncrement: -ENERGY_COST_TO_STEAL,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "steal",
        target: "karma",
        base_value: -100,
        additiveStep: 5,
        additiveIncrement: -50,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      }
    ]
  },
  {
    id: 0,
    name: "Vol de banque",
    actionType: DinosaurAction.Steal,
    minLevel: 8,
    positivityScore: 12,
    weight: 2,
    descriptions: [
      "Le dinosaure orchestre un vol audacieux dans une véritable banque jurassique, raflant une fortune inimaginable.",
      "Un coup d'éclat, digne des plus grands casseurs, qui lui permet de s'emparer d'une somme colossale.",
      "Avec une audace sans pareille, il réalise un vol de banque, défiant toutes les lois de l'improbabilité.",
      "Le vol de banque, une opération spectaculaire qui transforme le dinosaure en légende urbaine.",
      "Dans une mise en scène digne d'un film d'action, il déroge à la loi pour rafler une montagne d'argent."
    ],
    baseModifiers: [
      {
        source: "steal",
        target: "money",
        base_value: 5000,
        additiveStep: 10,
        additiveIncrement: 1000,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "steal",
        target: "energy",
        base_value: -ENERGY_COST_TO_STEAL,
        additiveStep: 0,
        additiveIncrement: -ENERGY_COST_TO_STEAL,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "steal",
        target: "karma",
        base_value: -500,
        additiveStep: 5,
        additiveIncrement: -250,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      }
    ]
  }
];
