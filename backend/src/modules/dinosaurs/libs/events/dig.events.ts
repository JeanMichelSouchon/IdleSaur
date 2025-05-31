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
        target: "experience",
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
        target: "experience",
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
      // Aucun modificateur pour experience
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
        target: "experience",
        base_value: 5000,
        additiveStep: 5,
        additiveIncrement: 2000,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      }
    ]
  },
  {
    id: 0,
    name: "Fouille décevante",
    actionType: DinosaurAction.Dig,
    minLevel: 5,
    positivityScore: -5,
    weight: 2,
    descriptions: [
      "Une fouille qui tourne mal, laissant derrière elle un lot d'armes et d'armures oubliées.",
      "Le dinosaure découvre, en creusant maladroitement, 10 armes et 10 armures échouées.",
      "Un creusement décevant offre en retour un stock d'équipements insoupçonnés.",
      "Le sol se rebelle et livre 10 armes et 10 armures en guise de consolation.",
      "Une exploration souterraine ratée qui se solde par un butin inattendu d'armes et d'armures."
    ],
    baseModifiers: [
      {
        source: "dig",
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
    name: "Effondrement spectaculaire",
    actionType: DinosaurAction.Dig,
    minLevel: 10,
    positivityScore: -7,
    weight: 1,
    descriptions: [
      "Une fouille qui s'effondre en catastrophe, dévoilant 10 armes et 10 armures enfouies.",
      "Le creusement tourne à la débâcle, offrant un lot conséquent d'équipements perdus.",
      "Le sol cède et livre, dans un élan dramatique, 10 armes et 10 armures éparpillées.",
      "Une fouille désastreuse se conclut par la découverte de 10 armes et 10 armures oubliées.",
      "Un moment de chaos souterrain qui se solde par un butin d'armes et d'armures en pagaille."
    ],
    baseModifiers: [
      {
        source: "dig",
        target: "experience",
        base_value: 10,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "dig",
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
    name: "Fouille fraternelle",
    actionType: DinosaurAction.Dig,
    minLevel: 5,
    positivityScore: 5,
    weight: 2,
    descriptions: [
      "Une fouille qui, malgré tout, réunit le dinosaure avec 5 amis et un employé pour une aventure partagée.",
      "Le creusement amical lui offre une surprenante rencontre : 5 amis et 1 collaborateur.",
      "Une exploration souterraine se transforme en moment de convivialité, réunissant 5 amis et 1 employé.",
      "Le sol se révèle accueillant, lui apportant 5 amis et 1 renfort lors de sa fouille.",
      "Une aventure partagée où la découverte d'amis et d'un employé renforce son équipe."
    ],
    baseModifiers: [
      {
        source: "dig",
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
    name: "Fouille solidaire",
    actionType: DinosaurAction.Dig,
    minLevel: 10,
    positivityScore: 7,
    weight: 1,
    descriptions: [
      "Une fouille magistrale qui se solde par la découverte de 10 amis et 2 employés dévoués.",
      "Le dinosaure, dans un moment de solidarité, voit son équipe s'agrandir avec 10 amis et 2 collaborateurs.",
      "Le creusement réussi renforce ses rangs, offrant 10 amis et 2 renforts précieux.",
      "Les profondeurs se font généreuses, lui offrant 10 amis et 2 employés dans un élan de fraternité.",
      "Une exploration exceptionnelle qui se conclut par l'arrivée de 10 amis et 2 employés enthousiastes."
    ],
    baseModifiers: [
      {
        source: "dig",
        target: "experience",
        base_value: 10,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      }
    ]
  }
];
