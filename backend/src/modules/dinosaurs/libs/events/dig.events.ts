import { ENERGY_COST_SPECIAL_ACTION } from "../../../../common/config/actions.constants";
import { DinosaurAction } from "../../models/dinosaur-action.enum";
import { DynamicEventData } from "../../models/dynamic-event-data.interface";

export const digEvents: DynamicEventData[] = [
  {
    id: 0,
    name: "Fouille réussie",
    actionType: DinosaurAction.Dig,
    minLevel: 10,
    positivityScore: 0,
    weight: 40,
    descriptions: [
      "Le dinosaure creuse efficacement et découvre un trésor souterrain modeste.",
      "Une fouille réussie qui lui rapporte des ressources enfouies.",
      "Le creusement est précis, dévoilant des richesses cachées dans le sol.",
      "Une exploration souterraine fructueuse qui enrichit ses réserves.",
      "Le sol se révèle généreux, offrant un butin stable et équilibré."
    ],
    baseModifiers: [
      {
        source: "dig",
        target: "experience",
        base_value: 0,
        additiveStep: 10,
        additiveIncrement: 3000,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "dig",
        target: "energy",
        base_value: -ENERGY_COST_SPECIAL_ACTION,
        additiveStep: 0,
        additiveIncrement: -ENERGY_COST_SPECIAL_ACTION,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "dig",
        target: "money",
        base_value: 2000,
        additiveStep: 5,
        additiveIncrement: 200,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      }
    ]
  },
  {
    id: 0,
    name: "Fouille laborieuse",
    actionType: DinosaurAction.Dig,
    minLevel: 10,
    positivityScore: 3,
    weight: 20,
    descriptions: [
      "Le dinosaure creuse péniblement et rapporte un gain moyen en ressources.",
      "Une fouille laborieuse demande un gros effort pour un retour modéré.",
      "Le creusement est ardu mais finit par dévoiler quelques trésors enfouis.",
      "Une exploration souterraine qui offre un bonus modéré en richesses.",
      "Malgré la difficulté, la fouille laborieuse apporte un butin appréciable."
    ],
    baseModifiers: [
      {
        source: "dig",
        target: "experience",
        base_value: 1000,
        additiveStep: 10,
        additiveIncrement: 2000,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "dig",
        target: "energy",
        base_value: -ENERGY_COST_SPECIAL_ACTION,
        additiveStep: 0,
        additiveIncrement: -ENERGY_COST_SPECIAL_ACTION,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "dig",
        target: "money",
        base_value: 2500,
        additiveStep: 5,
        additiveIncrement: 300,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      }
    ]
  },
  {
    id: 0,
    name: "Fouille infructueuse",
    actionType: DinosaurAction.Dig,
    minLevel: 10,
    positivityScore: -7,
    weight: 20,
    descriptions: [
      "Le dinosaure creuse, mais ne découvre aucune richesse.",
      "Une fouille infructueuse qui se solde par un échec complet.",
      "Le creusement reste vain, et le sol ne révèle aucun trésor.",
      "Aucun indice de richesse n'est trouvé malgré l'effort fourni.",
      "Une exploration souterraine désastreuse qui ne rapporte rien."
    ],
    baseModifiers: [
      {
        source: "dig",
        target: "experience",
        base_value: 0,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "dig",
        target: "energy",
        base_value: -ENERGY_COST_SPECIAL_ACTION,
        additiveStep: 0,
        additiveIncrement: -ENERGY_COST_SPECIAL_ACTION,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      }
      // Aucun modificateur pour money
    ]
  },
  {
    id: 0,
    name: "Fouille exceptionnelle",
    actionType: DinosaurAction.Dig,
    minLevel: 10,
    positivityScore: 10,
    weight: 5,
    descriptions: [
      "Le dinosaure réalise une fouille exceptionnelle, découvrant un trésor inestimable.",
      "Une exploration souterraine légendaire qui rapporte des richesses colossales.",
      "Le creusement révèle un coffre fort enfoui, transformant l'effort en fortune.",
      "Une fouille magistrale qui assure un gain énorme en ressources et compétences.",
      "Le dinosaure excelle dans l'art de creuser, décrochant un butin exceptionnel."
    ],
    baseModifiers: [
      {
        source: "dig",
        target: "experience",
        base_value: 15000,
        additiveStep: 10,
        additiveIncrement: 5000,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "dig",
        target: "energy",
        base_value: -ENERGY_COST_SPECIAL_ACTION,
        additiveStep: 0,
        additiveIncrement: -ENERGY_COST_SPECIAL_ACTION,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "dig",
        target: "money",
        base_value: 5000,
        additiveStep: 5,
        additiveIncrement: 2000,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "dig",
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
