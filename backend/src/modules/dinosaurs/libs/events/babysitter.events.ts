import { DinosaurAction } from "../../models/dinosaur-action.enum";
import { DynamicEventData } from "../../models/dynamic-event-data.interface";

export const babysitterEvents: DynamicEventData[] = [
  {
    id: 0,
    name: "Garde d'enfants standard",
    actionType: DinosaurAction.Babysitter,
    minLevel: 7,
    positivityScore: 0,
    weight: 50,
    descriptions: [
      "Le dinosaure garde les enfants de façon routinière, sans gain exceptionnel.",
      "Un babysitting standard, effectué avec soin mais sans éclat.",
      "La garde d'enfants se fait dans la simplicité, avec des bénéfices modestes.",
      "Un service de babysitting ordinaire, efficace mais discret.",
      "Il veille sur les enfants de manière professionnelle, sans retombées majeures."
    ],
    baseModifiers: [
      {
        source: "babysitter",
        target: "money",
        base_value: 500,
        additiveStep: 5,
        additiveIncrement: 100,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      }
    ]
  },
  {
    id: 0,
    name: "Garde d'enfants renforcée",
    actionType: DinosaurAction.Babysitter,
    minLevel: 7,
    positivityScore: 3,
    weight: 20,
    descriptions: [
      "Le dinosaure s'investit davantage dans la garde, améliorant son service.",
      "Un babysitting renforcé qui apporte un bonus modéré.",
      "Il garde les enfants avec une attention accrue, offrant un gain un peu supérieur.",
      "Un service de babysitting optimisé, qui se traduit par des bénéfices nets.",
      "La garde d'enfants renforcée procure des gains un peu plus marqués en compétences et en revenu."
    ],
    baseModifiers: [
      {
        source: "babysitter",
        target: "money",
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
    name: "Garde d'enfants épuisée",
    actionType: DinosaurAction.Babysitter,
    minLevel: 7,
    positivityScore: -2,
    weight: 15,
    descriptions: [
      "Le dinosaure peine pour garder les enfants, sans obtenir aucun gain notable.",
      "Un babysitting épuisant qui ne rapporte rien, malgré tous ses efforts.",
      "La garde d'enfants s'avère difficile et ne procure aucun avantage.",
      "Un service de babysitting où l'effort est important mais le gain est nul.",
      "Le dinosaure se fatigue à garder les enfants, sans compensation en argent ou compétences."
    ],
    baseModifiers: [
      {
        source: "babysitter",
        target: "money",
        base_value: 200,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "babysitter",
        target: "skillPoints",
        base_value: 50,
        additiveStep: 10,
        additiveIncrement: 5,
        multiplicativeStep: 50,
        multiplicativeIncrement: 0.5
      }
    ]
  },
  {
    id: 0,
    name: "Garde d'enfants exceptionnelle",
    actionType: DinosaurAction.Babysitter,
    minLevel: 7,
    positivityScore: 5,
    weight: 5,
    descriptions: [
      "Événement exceptionnel : le dinosaure garde les enfants de façon magistrale, apportant un bonus notable.",
      "Une prestation hors pair qui lui rapporte un bonus en argent et en compétences, et améliore son karma.",
      "Le babysitting atteint des sommets : il gagne une récompense équilibrée avec un bonus karmique positif.",
      "Un service de garde exceptionnel qui offre des gains mesurés et une augmentation de karma de 500 points.",
      "Le dinosaure excelle dans le babysitting, récoltant un bonus en argent modeste, 50 points de compétence, et 500 de karma en plus."
    ],
    baseModifiers: [
      {
        source: "babysitter",
        target: "money",
        base_value: 1000,
        additiveStep: 20,
        additiveIncrement: 2500,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "babysitter",
        target: "skillPoints",
        base_value: 50,
        additiveStep: 20,
        additiveIncrement: 50,
        multiplicativeStep: 50,
        multiplicativeIncrement: 0.5
      },
      {
        source: "babysitter",
        target: "karma",
        base_value: 750,
        additiveStep: 50,
        additiveIncrement: 250, 
        multiplicativeStep: 100,
        multiplicativeIncrement: 2
      }
    ]
  }
];
