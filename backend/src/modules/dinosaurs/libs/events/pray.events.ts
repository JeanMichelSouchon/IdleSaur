import { ENERGY_COST_TO_PRAY } from "../../../../common/config/actions.constants";
import { DinosaurAction } from "../../models/dinosaur-action.enum";
import { DynamicEventData } from "../../models/dynamic-event-data.interface";

export const prayEvents: DynamicEventData[] = [
  {
    id: 0,
    name: "Prière réussie",
    actionType: DinosaurAction.Pray,
    minLevel: 5,
    positivityScore: 0,
    weight: 100,
    descriptions: [
      "Le dinosaure s’installe en méditation et trouve un équilibre inattendu.",
      "Une prière sincère apaise son esprit et ranime son karma.",
      "Au cœur de sa prière, il capte une énergie subtile qui le réconforte.",
      "Dans un moment de calme, il parvient à harmoniser son énergie et son karma.",
      "Le dinosaure trouve, par la prière, une paix intérieure qui fait briller son aura."
    ],
    baseModifiers: [
      {
        source: "pray",
        target: "energy",
        base_value: -ENERGY_COST_TO_PRAY,
        additiveStep: 0,
        additiveIncrement: -ENERGY_COST_TO_PRAY,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "pray",
        target: "karma",
        base_value: 500,
        additiveStep: 20,
        additiveIncrement: 250,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      }
    ]
  },
  {
    id: 0,
    name: "Prière éclairée",
    actionType: DinosaurAction.Pray,
    minLevel: 5,
    positivityScore: 5,
    weight: 20,
    descriptions: [
      "Le dinosaure reçoit une illumination, ses pensées s’ouvrent à l’univers.",
      "Une prière intense lui offre une vision nouvelle et booste son expérience.",
      "Dans un éclair de lucidité, il découvre des vérités oubliées.",
      "Son esprit s’illumine, transformant son karma en une force redoutable.",
      "Une prière éclairée qui réinvente sa destinée, lui offrant sagesse et puissance."
    ],
    baseModifiers: [
      {
        source: "pray",
        target: "energy",
        base_value: -ENERGY_COST_TO_PRAY,
        additiveStep: 0,
        additiveIncrement: -ENERGY_COST_TO_PRAY,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "pray",
        target: "experience",
        base_value: 500,
        additiveStep: 25,
        additiveIncrement: 250,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "pray",
        target: "karma",
        base_value: 750,
        additiveStep: 20,
        additiveIncrement: 250,
        multiplicativeStep: 50,
        multiplicativeIncrement: 0.25
      }
    ]
  },
  {
    id: 0,
    name: "Prière impossible",
    actionType: DinosaurAction.Pray,
    minLevel: 5,
    positivityScore: -10,
    weight: 30,
    descriptions: [
      "Le dinosaure essaie de prier, mais son esprit vagabonde sans but.",
      "Une prière ratée, où la concentration fait défaut.",
      "Le moment de recueillement passe inaperçu, sans résultat.",
      "Une prière vaine qui laisse son énergie filer sans contrepartie.",
      "L’esprit ailleurs, sa prière reste sans écho dans l’univers."
    ],
    baseModifiers: [
      {
        source: "pray",
        target: "energy",
        base_value: -ENERGY_COST_TO_PRAY,
        additiveStep: 0,
        additiveIncrement: -ENERGY_COST_TO_PRAY,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      }
    ]
  },
  {
    id: 0,
    name: "Prière manquée",
    actionType: DinosaurAction.Pray,
    minLevel: 5,
    positivityScore: -7,
    weight: 20,
    descriptions: [
      "Le dinosaure réalise trop tard qu’il n’était pas prêt à prier.",
      "Une prière manquée, l’esprit distrait et la concentration absente.",
      "Le moment de recueillement s’évanouit sans effet concret.",
      "Une prière avortée, sans l’étincelle nécessaire pour agir.",
      "Le dinosaure passe à côté d’une opportunité spirituelle, sa prière reste inachevée."
    ],
    baseModifiers: [
      {
        source: "pray",
        target: "energy",
        base_value: -ENERGY_COST_TO_PRAY,
        additiveStep: 0,
        additiveIncrement: -ENERGY_COST_TO_PRAY,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "pray",
        target: "karma",
        base_value: 200,
        additiveStep: 10,
        additiveIncrement: 50,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      }
    ]
  },
  {
    id: 0,
    name: "Prière payante",
    actionType: DinosaurAction.Pray,
    minLevel: 5,
    positivityScore: 0,
    weight: 5,
    descriptions: [
      "Le dinosaure mise gros sur sa prière, sacrifiant de l’argent pour de grands retours.",
      "Une prière audacieuse qui exige un sacrifice financier, mais qui rapporte gros.",
      "Il échange de l’argent contre une illumination rare et précieuse.",
      "Un pari risqué : dépenser pour prier, et obtenir en retour une vague de sagesse.",
      "La prière payante, où chaque pièce investie se transforme en bénédiction éclatante."
    ],
    baseModifiers: [
      {
        source: "pray",
        target: "energy",
        base_value: -ENERGY_COST_TO_PRAY,
        additiveStep: 0,
        additiveIncrement: -ENERGY_COST_TO_PRAY,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "pray",
        target: "experience",
        base_value: 2000,
        additiveStep: 25,
        additiveIncrement: 2000,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "pray",
        target: "karma",
        base_value: 1500,
        additiveStep: 25,
        additiveIncrement: 1250,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "pray",
        target: "money",
        base_value: -400,
        additiveStep: 25,
        additiveIncrement: -100,
        multiplicativeStep: 5,
        multiplicativeIncrement: 0.1
      }
    ]
  }
];
