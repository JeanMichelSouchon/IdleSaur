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
        target: "experience",
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
        target: "experience",
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
        target: "experience",
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
  },
  {
    id: 0,
    name: "Garde improvisée",
    actionType: DinosaurAction.Babysitter,
    minLevel: 5,
    positivityScore: 5,
    weight: 1,
    descriptions: [
      "Lors d'une garde improvisée, le dinosaure décroche un petit contrat inattendu.",
      "Un babysitting express qui, contre toute attente, lui offre un employé motivé.",
      "Dans une situation rocambolesque, il se voit offrir l'assistance d'un nouveau collaborateur.",
      "Une garde d'enfants décalée se transforme en opportunité pour recruter un employé fiable.",
      "Un moment surprenant où le babysitting se conclut par l'arrivée d'un renfort professionnel."
    ],
    baseModifiers: [
      {
        source: "babysitter",
        target: "employees",
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
    name: "Garderie conviviale",
    actionType: DinosaurAction.Babysitter,
    minLevel: 10,
    positivityScore: 5,
    weight: 1,
    descriptions: [
      "Une garderie où les rires des enfants se transforment en amitiés inattendues.",
      "Le dinosaure, par un concours de circonstances, se retrouve entouré de cinq amis fidèles.",
      "Une journée de babysitting se termine par une rencontre chaleureuse et amicale.",
      "Un service de garde qui, contre toute attente, tisse des liens sincères et durables.",
      "L'ambiance conviviale du babysitting lui permet de gagner une poignée d'amis précieux."
    ],
    baseModifiers: [
      {
        source: "babysitter",
        target: "friends",
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
    name: "Super garde professionnelle",
    actionType: DinosaurAction.Babysitter,
    minLevel: 15,
    positivityScore: 7,
    weight: 1,
    descriptions: [
      "Dans un contexte professionnel hors norme, le dinosaure décroche un contrat de garde d'enfants qui paye gros.",
      "Une intervention remarquable qui lui permet de recruter cinq employés compétents.",
      "L'excellence de son babysitting se traduit par l'arrivée massive de collaborateurs talentueux.",
      "Une prestation unique qui transforme la garde en une opportunité de recrutement en or.",
      "Le dinosaure surprend tout le monde en se dotant d'une équipe professionnelle de cinq renforts."
    ],
    baseModifiers: [
      {
        source: "babysitter",
        target: "employees",
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
    name: "Garderie spectaculaire",
    actionType: DinosaurAction.Babysitter,
    minLevel: 20,
    positivityScore: 7,
    weight: 1,
    descriptions: [
      "Une garde d'enfants hors du commun qui se solde par une avalanche d'amitiés.",
      "Dans un moment de grâce, le dinosaure gagne dix amis qui lui apportent soutien et inspiration.",
      "Un babysitting légendaire qui transforme les enfants en véritables alliés de son aventure.",
      "Une prestation éblouissante où la convivialité se traduit par des liens d'amitié indéfectibles.",
      "Le spectacle de sa garde exceptionnelle lui permet de se forger un cercle d'amis précieux et nombreux."
    ],
    baseModifiers: [
      {
        source: "babysitter",
        target: "friends",
        base_value: 10,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      }
    ]
  }
];
