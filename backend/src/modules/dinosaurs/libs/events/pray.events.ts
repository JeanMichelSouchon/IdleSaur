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
    weight: 250,
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
    weight: 150,
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
    name: "Illumination spirituelle",
    actionType: DinosaurAction.Pray,
    minLevel: 5,
    positivityScore: 8,
    weight: 100,
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
        target: "karma",
        base_value: 2000,
        additiveStep: 0,
        additiveIncrement: 0,
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
    weight: 50,
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
    weight: 50,
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
    positivityScore: -5,
    weight: 150,
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
        target: "experience",
        base_value: -500,
        additiveStep: 25,
        additiveIncrement: -100,
        multiplicativeStep: 5,
        multiplicativeIncrement: 0.1
      }
    ]
  },
  {
    id: 0,
    name: "Prière fraternelle",
    actionType: DinosaurAction.Pray,
    minLevel: 5,
    positivityScore: 5,
    weight: 50,
    descriptions: [
      "Dans un moment de recueillement, le dinosaure se trouve entouré de visages amis.",
      "Une prière sincère ouvre la voie à la rencontre de 5 compagnons fidèles.",
      "La spiritualité le guide vers une union amicale inattendue.",
      "Un instant de méditation qui se transforme en un rassemblement chaleureux de 5 amis.",
      "La prière fraternelle tisse des liens d'amitié, lui apportant 5 précieux alliés."
    ],
    baseModifiers: [
      {
        source: "pray",
        target: "experience",
        base_value: 5,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      }
    ]
  },
  {
    id: 0,
    name: "Prière de l'union",
    actionType: DinosaurAction.Pray,
    minLevel: 10,
    positivityScore: 7,
    weight: 50,
    descriptions: [
      "Une prière intense qui scelle une union amicale, rassemblant 10 compagnons sur son chemin.",
      "Le dinosaure reçoit une bénédiction collective, se trouvant entouré de 10 amis inspirants.",
      "Dans un moment de ferveur spirituelle, 10 amitiés se matérialisent autour de lui.",
      "Un appel céleste qui fait surgir 10 alliés, prêts à partager son aventure.",
      "La prière de l'union lui offre le cadeau précieux de 10 amis sincères."
    ],
    baseModifiers: [
      {
        source: "pray",
        target: "experience",
        base_value: 10,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      }
    ]
  },
  {
    id: 0,
    name: "Prière providentente",
    actionType: DinosaurAction.Pray,
    minLevel: 5,
    positivityScore: 5,
    weight: 25,
    descriptions: [
      "Dans un élan de foi, le dinosaure voit surgir un employé prêt à l'assister.",
      "Une prière attentive lui apporte le soutien d'un nouveau collaborateur.",
      "La spiritualité se manifeste en lui offrant l'aide précieuse d'un employé.",
      "Un moment de recueillement se transforme en opportunité professionnelle inattendue.",
      "La prière providentente lui permet de gagner la confiance d'un employé dévoué."
    ],
    baseModifiers: [
      {
        source: "pray",
        target: "experience",
        base_value: 1,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      }
    ]
  },
  {
    id: 0,
    name: "Prière de renouveau",
    actionType: DinosaurAction.Pray,
    minLevel: 10,
    positivityScore: 7,
    weight: 10,
    descriptions: [
      "Une prière exaltée qui ouvre les portes du renouveau, apportant 2 employés dévoués.",
      "Le dinosaure, en communion avec l'univers, reçoit le soutien de deux collaborateurs inspirés.",
      "Dans un moment de grande ferveur, la prière lui offre l'aide de 2 employés compétents.",
      "L'appel aux cieux se transforme en une double bénédiction professionnelle.",
      "La prière de renouveau se conclut par l'arrivée de 2 précieux employés."
    ],
    baseModifiers: [
      {
        source: "pray",
        target: "experience",
        base_value: 2,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      }
    ]
  }
];
