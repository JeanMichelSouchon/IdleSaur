import { ENERGY_COST_SPECIAL_ACTION } from "../../../../common/config/actions.constants";
import { DinosaurAction } from "../../models/dinosaur-action.enum";
import { DynamicEventData } from "../../models/dynamic-event-data.interface";

export const diveEvents: DynamicEventData[] = [
  {
    id: 0,
    name: "Plongée réussie",
    actionType: DinosaurAction.Dive,
    minLevel: 10,
    positivityScore: 0,
    weight: 40,
    descriptions: [
      "Le dinosaure plonge avec assurance, ramenant un butin de poissons savoureux.",
      "Une plongée réussie qui lui procure une belle prise de poissons frais.",
      "Le plongeur excelle sous l'eau, récoltant une abondance de ressources marines.",
      "Une plongée efficace qui remplit ses réserves de nourriture aquatique.",
      "Les profondeurs cèdent leurs trésors et le dinosaure en ressort riche en ressources."
    ],
    baseModifiers: [
      {
        source: "dive",
        target: "experience",
        base_value: 0,
        additiveStep: 10,
        additiveIncrement: 5000,
        multiplicativeStep: 50,
        multiplicativeIncrement: 1
      },
      {
        source: "dive",
        target: "energy",
        base_value: -ENERGY_COST_SPECIAL_ACTION,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "dive",
        target: "food",
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
    name: "Plongée périlleuse",
    actionType: DinosaurAction.Dive,
    minLevel: 10,
    positivityScore: -5,
    weight: 20,
    descriptions: [
      "Les eaux se montrent traîtresses, et la prise est modeste.",
      "Une plongée périlleuse qui coûte cher en énergie sans offrir grand gain.",
      "Le plongeur affronte des courants difficiles et ramène moins de ressources.",
      "Un risque sous-marin qui se solde par un retour limité en nourriture.",
      "Une plongée risquée, où l'effort se paie mal."
    ],
    baseModifiers: [
      {
        source: "dive",
        target: "experience",
        base_value: 1000,
        additiveStep: 10,
        additiveIncrement: 1000,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "dive",
        target: "energy",
        base_value: -ENERGY_COST_SPECIAL_ACTION,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "dive",
        target: "food",
        base_value: 500,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      }
    ]
  },
  {
    id: 0,
    name: "Plongée sans prise",
    actionType: DinosaurAction.Dive,
    minLevel: 10,
    positivityScore: -7,
    weight: 20,
    descriptions: [
      "Le dinosaure plonge, mais ne ramène aucun poisson.",
      "Une plongée infructueuse qui ne rapporte rien malgré l'effort.",
      "Les profondeurs restent vides, et le plongeur repart bredouille.",
      "Aucun trésor ne se révèle dans les abysses, un plongeon vain.",
      "Une plongée décevante, sans gain en ressources marines."
    ],
    baseModifiers: [
      {
        source: "dive",
        target: "experience",
        base_value: 0,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "dive",
        target: "energy",
        base_value: -ENERGY_COST_SPECIAL_ACTION,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      }
      // Aucun modificateur pour food
    ]
  },
  {
    id: 0,
    name: "Plongée légendaire",
    actionType: DinosaurAction.Dive,
    minLevel: 10,
    positivityScore: 10,
    weight: 5,
    descriptions: [
      "Une plongée extraordinaire qui lui rapporte un trésor maritime inestimable.",
      "Le plongeur réalise un exploit sous-marin, ramenant un stock exceptionnel de poissons et trésors.",
      "Les abysses se dévoilent, offrant une prise spectaculaire et des richesses insoupçonnées.",
      "Un exploit légendaire dans les profondeurs, transformant l'effort en fortune.",
      "Le dinosaure émerge des eaux avec un butin qui ferait pâlir les plus grands explorateurs marins."
    ],
    baseModifiers: [
      {
        source: "dive",
        target: "experience",
        base_value: 15000,
        additiveStep: 10,
        additiveIncrement: 5000,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "dive",
        target: "energy",
        base_value: -ENERGY_COST_SPECIAL_ACTION,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "dive",
        target: "food",
        base_value: 15000,
        additiveStep: 10,
        additiveIncrement: 5000,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "dive",
        target: "experience",
        base_value: 1000,
        additiveStep: 10,
        additiveIncrement: 1000,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      }
    ]
  },
  {
    id: 0,
    name: "Plongée décevante",
    actionType: DinosaurAction.Dive,
    minLevel: 5,
    positivityScore: -5,
    weight: 2,
    descriptions: [
      "Une plongée qui tourne mal, révélant un stock inattendu d'armes et d'armures englouties.",
      "Les abysses déçoivent, laissant derrière elles 10 armes et 10 armures éparpillées.",
      "Un plongeon raté qui, en guise de consolation, offre un lot d'équipements militaires oubliés.",
      "Les eaux troubles recèlent 10 armes et 10 armures, vestiges d'un passé tumultueux.",
      "Un plongeon décevant qui se termine par la découverte de 10 armes et 10 armures abandonnées."
    ],
    baseModifiers: [
      {
        source: "dive",
        target: "experience",
        base_value: 10,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "dive",
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
    name: "Remontée catastrophique",
    actionType: DinosaurAction.Dive,
    minLevel: 10,
    positivityScore: -7,
    weight: 1,
    descriptions: [
      "Une remontée d'eau en catastrophe révèle un trésor d'armes et d'armures, fruit d'un plongeon désastreux.",
      "Le dinosaure remonte, portant avec lui 10 armes et 10 armures, vestiges d'une plongée ratée.",
      "Un plongeon se transforme en fiasco, offrant un butin inattendu d'armes et d'armures.",
      "Les profondeurs dévoilent, dans un moment de chaos, 10 armes et 10 armures égarées.",
      "Une plongée se termine en tragédie, et le dinosaure hérite de 10 armes et 10 armures abîmées."
    ],
    baseModifiers: [
      {
        source: "dive",
        target: "experience",
        base_value: 10,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "dive",
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
    name: "Plongée fraternelle",
    actionType: DinosaurAction.Dive,
    minLevel: 5,
    positivityScore: 5,
    weight: 2,
    descriptions: [
      "Un plongeon qui devient moment de camaraderie, où 5 amis et 1 employé se joignent à lui sous l'eau.",
      "Les eaux amicales réunissent le dinosaure avec 5 compagnons et un renfort inattendu.",
      "Une plongée chaleureuse où la fraternité se traduit par l'arrivée de 5 amis et d'un employé.",
      "Le fond marin devient le théâtre d'une union surprenante, offrant 5 amis et 1 collaborateur.",
      "Un moment subaquatique qui tisse des liens, lui procurant 5 amis et 1 employé fidèle."
    ],
    baseModifiers: [
      {
        source: "dive",
        target: "experience",
        base_value: 5,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "dive",
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
    name: "Plongée solidaire",
    actionType: DinosaurAction.Dive,
    minLevel: 10,
    positivityScore: 7,
    weight: 1,
    descriptions: [
      "Un plongeon héroïque qui se conclut par un rassemblement solidaire de 10 amis et 2 employés.",
      "Les profondeurs se font généreuses en offrant 10 amis et 2 collaborateurs lors d'une plongée mémorable.",
      "Un exploit sous-marin qui renforce ses rangs avec 10 amis et 2 employés dévoués.",
      "Les eaux mystiques lui offrent, en guise de récompense, 10 amis et 2 renforts inattendus.",
      "Une plongée légendaire qui tisse des liens forts, lui procurant 10 amis et 2 employés."
    ],
    baseModifiers: [
      {
        source: "dive",
        target: "experience",
        base_value: 10,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "dive",
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
