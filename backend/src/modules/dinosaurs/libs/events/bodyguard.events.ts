import { DinosaurAction } from "../../models/dinosaur-action.enum";
import { DynamicEventData } from "../../models/dynamic-event-data.interface";

export const bodyguardEvents: DynamicEventData[] = [
  {
    id: 0,
    name: "Garde standard",
    actionType: DinosaurAction.Bodyguard,
    minLevel: 7,
    positivityScore: 0,
    weight: 50,
    descriptions: [
      "Le dinosaure assure une protection basique, sans éclat particulier.",
      "Un service de garde ordinaire, effectué avec professionnalisme.",
      "Il protège discrètement, réalisant sa tâche dans la routine.",
      "Un gardiennage standard qui se fait sans grand effort ni récompense spectaculaire.",
      "La garde standard est réalisée efficacement, sans retombées majeures."
    ],
    baseModifiers: [
      {
        source: "bodyguard",
        target: "experience",
        base_value: 500,  // gain faible
        additiveStep: 5,
        additiveIncrement: 100,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      }
    ]
  },
  {
    id: 0,
    name: "Garde renforcée",
    actionType: DinosaurAction.Bodyguard,
    minLevel: 7,
    positivityScore: 3,
    weight: 20,
    descriptions: [
      "Le dinosaure offre une protection renforcée, avec une efficacité accrue.",
      "Une garde améliorée qui optimise le service de protection.",
      "Il met en œuvre des techniques avancées pour sécuriser son client.",
      "Un service de garde renforcé, permettant un gain modéré en récompense.",
      "La garde renforcée se traduit par des bénéfices légèrement supérieurs."
    ],
    baseModifiers: [
      {
        source: "bodyguard",
        target: "experience",
        base_value: 750,  // gain modéré
        additiveStep: 10,
        additiveIncrement: 250,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      }
    ]
  },
  {
    id: 0,
    name: "Garde épuisée",
    actionType: DinosaurAction.Bodyguard,
    minLevel: 7,
    positivityScore: -2,
    weight: 15,
    descriptions: [
      "Le dinosaure est débordé et la garde ne rapporte aucun gain.",
      "Une journée épuisante, sans bénéfice notable pour le garde du corps.",
      "Malgré tous ses efforts, le service de protection reste sans récompense.",
      "Une garde épuisée qui ne permet d'obtenir ni argent ni points de compétence.",
      "Le dinosaure lutte pour protéger, mais le résultat est nul."
    ],
    baseModifiers: [
      {
        source: "bodyguard",
        target: "experience",
        base_value: 50,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      }
    ]
  },
  {
    id: 0,
    name: "Garde privé mafieux",
    actionType: DinosaurAction.Bodyguard,
    minLevel: 7,
    positivityScore: -7,
    weight: 5,
    descriptions: [
      "Dans un tournant dramatique, le dinosaure assure une protection héroïque.",
      "Un événement exceptionnel : il gagne 5000 d'argent et 50 points de compétence, mais perd 500 de karma.",
      "La garde héroïque se fait avec panache, mais au prix d'une lourde perte karmique.",
      "Un service de protection surhumain qui récompense grandement en argent et compétences, mais coûte cher en karma.",
      "Le dinosaure se distingue par une garde héroïque, obtenant d'importants gains monétaires et en compétences, malgré une perte de karma significative."
    ],
    baseModifiers: [
      {
        source: "bodyguard",
        target: "experience",
        base_value: 5000,
        additiveStep: 20,
        additiveIncrement: 5000,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "bodyguard",
        target: "karma",
        base_value: -500,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      }
    ]
  }
];
