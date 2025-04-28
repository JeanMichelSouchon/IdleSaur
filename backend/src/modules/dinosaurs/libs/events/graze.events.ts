import { ENERGY_COST_TO_GRAZE } from "../../../../common/config/actions.constants";
import { DinosaurAction } from "../../models/dinosaur-action.enum";
import { DynamicEventData } from "../../models/dynamic-event-data.interface";

export const grazeEvents: DynamicEventData[] = [
  {
    id: 0,
    name: 'Cueillette réussie',
    actionType: DinosaurAction.Graze,
    minLevel: 0,
    positivityScore: 0,
    weight: 40,
    descriptions: [
      "Le dinosaure récolte une grande quantité de végétaux, remplissant ses réserves.",
      "Un succès éclatant, la récolte est abondante et l'expérience grimpe en flèche.",
      "La cueillette est triomphante, un butin généreux qui redonne le sourire.",
      "Un moment de gloire où la nature offre ses trésors à profusion.",
      "Le cueilleur se régale d'une récolte exceptionnelle, digne d'un champion."
    ],
    baseModifiers: [
      {
        source: "graze",
        target: "experience",
        base_value: 200,
        additiveStep: 5,
        additiveIncrement: 50,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "graze",
        target: "energy",
        base_value: -ENERGY_COST_TO_GRAZE,
        additiveStep: 0,
        additiveIncrement: -ENERGY_COST_TO_GRAZE,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "graze",
        target: "food",
        base_value: 800,
        additiveStep: 1,
        additiveIncrement: 100,
        multiplicativeStep: 10,
        multiplicativeIncrement: 0.1
      }
    ]
  },
  {
    id: 0,
    name: 'Cueillette modérée',
    actionType: DinosaurAction.Graze,
    minLevel: 0,
    positivityScore: 3,
    weight: 20,
    descriptions: [
      "Le dinosaure récolte une quantité moyenne de végétaux.",
      "Une cueillette correcte, ni exceptionnelle ni insuffisante.",
      "Une prise modérée qui permet de calmer la faim sans excès.",
      "Un succès modéré qui offre juste ce qu'il faut pour se nourrir.",
      "La récolte modérée satisfait le cueilleur pour la journée."
    ],
    baseModifiers: [
      {
        source: "graze",
        target: "experience",
        base_value: 250,
        additiveStep: 10,
        additiveIncrement: 250,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "graze",
        target: "energy",
        base_value: -ENERGY_COST_TO_GRAZE,
        additiveStep: 0,
        additiveIncrement: -ENERGY_COST_TO_GRAZE,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "graze",
        target: "food",
        base_value: 1250,
        additiveStep: 2,
        additiveIncrement: 250,
        multiplicativeStep: 10,
        multiplicativeIncrement: 0.1
      }
    ]
  },
  {
    id: 0,
    name: 'Cueillette difficile',
    actionType: DinosaurAction.Graze,
    minLevel: 0,
    positivityScore: -3,
    weight: 15,
    descriptions: [
      "La récolte est laborieuse et la prise est minime.",
      "Le terrain est difficile, et le cueilleur peine pour quelques plantes.",
      "Un défi pour le cueilleur, la récolte reste modeste malgré l'effort.",
      "La cueillette difficile apporte peu, malgré une grande persévérance.",
      "La nature se montre capricieuse, offrant un maigre butin."
    ],
    baseModifiers: [
      {
        source: "graze",
        target: "experience",
        base_value: 400,
        additiveStep: 2,
        additiveIncrement: 50,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "graze",
        target: "energy",
        base_value: -ENERGY_COST_TO_GRAZE,
        additiveStep: 0,
        additiveIncrement: -ENERGY_COST_TO_GRAZE,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "graze",
        target: "food",
        base_value: 500,
        additiveStep: 1,
        additiveIncrement: 100,
        multiplicativeStep: 10,
        multiplicativeIncrement: 0.1
      }
    ]
  },
  {
    id: 0,
    name: 'Cueillette infructueuse',
    actionType: DinosaurAction.Graze,
    minLevel: 0,
    positivityScore: -7,
    weight: 15,
    descriptions: [
      "Le dinosaure tente sa chance, mais ne parvient à rien récolter.",
      "Un échec total, la nature reste farouche et rien ne se cueille.",
      "L'effort est vain, aucune plante ne se laisse attraper.",
      "Un moment de déception, la récolte est complètement nulle.",
      "La cueillette infructueuse laisse le cueilleur les bras vides."
    ],
    baseModifiers: [
      {
        source: "graze",
        target: "experience",
        base_value: 500,
        additiveStep: 25,
        additiveIncrement: 500,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "graze",
        target: "energy",
        base_value: -ENERGY_COST_TO_GRAZE,
        additiveStep: 0,
        additiveIncrement: -ENERGY_COST_TO_GRAZE,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      }
    ]
  },
  {
    id: 0,
    name: 'Cueillette stratégique',
    actionType: DinosaurAction.Graze,
    minLevel: 2,
    positivityScore: 7,
    weight: 5,
    descriptions: [
      "Le dinosaure utilise une stratégie ingénieuse pour récolter efficacement.",
      "Chaque geste est calculé pour maximiser la prise en terrain fertile.",
      "La cueillette stratégique permet d'obtenir un butin optimal.",
      "Une approche tactique qui prouve la ruse du cueilleur.",
      "La stratégie paye : le butin récolté est bien supérieur à l'effort consenti."
    ],
    baseModifiers: [
      {
        source: "graze",
        target: "experience",
        base_value: 750,
        additiveStep: 25,
        additiveIncrement: 750,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "graze",
        target: "energy",
        base_value: -ENERGY_COST_TO_GRAZE,
        additiveStep: 0,
        additiveIncrement: -ENERGY_COST_TO_GRAZE,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "graze",
        target: "food",
        base_value: 1300,
        additiveStep: 5,
        additiveIncrement: 500,
        multiplicativeStep: 10,
        multiplicativeIncrement: 0.1
      }
    ]
  },
  {
    id: 0,
    name: 'Cueillette féroce',
    actionType: DinosaurAction.Graze,
    minLevel: 4,
    positivityScore: 8,
    weight: 2,
    descriptions: [
      "Le dinosaure s'engage dans une cueillette féroce et récolte une prise exceptionnelle.",
      "Une attaque prédatrice qui se solde par un butin remarquable.",
      "Le combat pour la récolte est intense, et le résultat est à la hauteur de l'effort.",
      "Un moment de fureur maîtrisée qui booste son expérience et ses réserves.",
      "La cueillette féroce prouve la puissance du cueilleur face à la nature."
    ],
    baseModifiers: [
      {
        source: "graze",
        target: "experience",
        base_value: 250,
        additiveStep: 10,
        additiveIncrement: 250,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "graze",
        target: "energy",
        base_value: -ENERGY_COST_TO_GRAZE,
        additiveStep: 0,
        additiveIncrement: -ENERGY_COST_TO_GRAZE,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "graze",
        target: "food",
        base_value: 2000,
        additiveStep: 5,
        additiveIncrement: 1000,
        multiplicativeStep: 10,
        multiplicativeIncrement: 0.1
      }
    ]
  },
  {
    id: 0,
    name: 'Cueillette légendaire',
    actionType: DinosaurAction.Graze,
    minLevel: 6,
    positivityScore: 10,
    weight: 1,
    descriptions: [
      "Dans une région mythique, le dinosaure récolte des plantes d'une rare abondance.",
      "Une cueillette légendaire qui s'inscrit dans la tradition des grands cueilleurs.",
      "Le butin est d'une ampleur incroyable, marquant une étape mémorable.",
      "Un exploit agricole qui restera gravé dans l'histoire du dinosaure.",
      "La récolte légendaire révèle la générosité de la nature en un moment d'exception."
    ],
    baseModifiers: [
      {
        source: "graze",
        target: "experience",
        base_value: 1000,
        additiveStep: 25,
        additiveIncrement: 1000,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "graze",
        target: "energy",
        base_value: -ENERGY_COST_TO_GRAZE,
        additiveStep: 0,
        additiveIncrement: -ENERGY_COST_TO_GRAZE,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "graze",
        target: "food",
        base_value: 2500,
        additiveStep: 5,
        additiveIncrement: 500,
        multiplicativeStep: 20,
        multiplicativeIncrement: 0.25
      }
    ]
  }
];
