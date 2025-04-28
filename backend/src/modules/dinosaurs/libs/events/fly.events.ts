import { ENERGY_COST_SPECIAL_ACTION } from "../../../../common/config/actions.constants";
import { DinosaurAction } from "../../models/dinosaur-action.enum";
import { DynamicEventData } from "../../models/dynamic-event-data.interface";

export const flyEvents: DynamicEventData[] = [
  {
    id: 0,
    name: "Vol gracieux",
    actionType: DinosaurAction.Fly,
    minLevel: 10,
    positivityScore: 0,
    weight: 40,
    descriptions: [
      "Le dinosaure s'élève avec élégance, planant au-dessus des cieux.",
      "Un vol gracieux qui lui permet de survoler la jungle avec finesse.",
      "Il déploie ses ailes avec aisance, offrant un spectacle aérien remarquable.",
      "Un envol harmonieux, où la légèreté règne en maître.",
      "Le vol gracieux témoigne de sa maîtrise et apporte une stabilité dans ses ressources."
    ],
    baseModifiers: [
      {
        source: "fly",
        target: "experience",
        base_value: 0,
        additiveStep: 10,
        additiveIncrement: 4000,
        multiplicativeStep: 50,
        multiplicativeIncrement: 1
      },
      {
        source: "fly",
        target: "energy",
        base_value: -ENERGY_COST_SPECIAL_ACTION,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "fly",
        target: "experience",
        base_value: 1000,
        additiveStep: 5,
        additiveIncrement: 200,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      }
    ]
  },
  {
    id: 0,
    name: "Vol audacieux",
    actionType: DinosaurAction.Fly,
    minLevel: 10,
    positivityScore: 3,
    weight: 20,
    descriptions: [
      "Le dinosaure se lance dans un vol audacieux, défiant les vents turbulents.",
      "Un envol intrépide qui lui offre un bonus appréciable en expérience.",
      "Il fend les airs avec détermination, repoussant ses limites.",
      "Un vol audacieux, mêlant risque et récompense, qui stimule ses ressources.",
      "L'envol audacieux ouvre de nouvelles perspectives dans le ciel, apportant des gains mesurés."
    ],
    baseModifiers: [
      {
        source: "fly",
        target: "experience",
        base_value: 1000,
        additiveStep: 10,
        additiveIncrement: 2000,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "fly",
        target: "energy",
        base_value: -ENERGY_COST_SPECIAL_ACTION,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "fly",
        target: "experience",
        base_value: 1500,
        additiveStep: 5,
        additiveIncrement: 300,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      }
    ]
  },
  {
    id: 0,
    name: "Vol périlleux",
    actionType: DinosaurAction.Fly,
    minLevel: 10,
    positivityScore: -7,
    weight: 20,
    descriptions: [
      "Le vol devient périlleux, subissant de violentes turbulences.",
      "Un envol risqué qui entraîne de lourdes pertes d'énergie.",
      "Les vents contraires compromettent son vol, sans aucun gain notable.",
      "Un vol périlleux qui se solde par un retour négatif en ressources.",
      "Les dangers du ciel se manifestent, et l'envol se termine en échec."
    ],
    baseModifiers: [
      {
        source: "fly",
        target: "experience",
        base_value: 0,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "fly",
        target: "energy",
        base_value: -ENERGY_COST_SPECIAL_ACTION,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      }
      // Aucun modificateur pour experience
    ]
  },
  {
    id: 0,
    name: "Vol légendaire",
    actionType: DinosaurAction.Fly,
    minLevel: 10,
    positivityScore: 10,
    weight: 5,
    descriptions: [
      "Un vol légendaire qui défie la gravité, offrant des gains exceptionnels.",
      "Le dinosaure réalise un envol héroïque, ramenant un butin phénoménal.",
      "Un exploit aérien qui transforme l'effort en une fortune inouïe.",
      "Les cieux s'ouvrent pour lui, révélant des récompenses dignes des plus grands aventuriers.",
      "Un vol spectaculaire qui marque une nouvelle ère dans ses capacités aériennes."
    ],
    baseModifiers: [
      {
        source: "fly",
        target: "experience",
        base_value: 15000,
        additiveStep: 10,
        additiveIncrement: 5000,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "fly",
        target: "energy",
        base_value: -ENERGY_COST_SPECIAL_ACTION,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "fly",
        target: "experience",
        base_value: 2000,
        additiveStep: 5,
        additiveIncrement: 1000,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "fly",
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
    name: "Décollage décevant",
    actionType: DinosaurAction.Fly,
    minLevel: 5,
    positivityScore: -5,
    weight: 2,
    descriptions: [
      "Un vol qui ne décolle pas comme prévu, laissant derrière lui des reliques oubliées.",
      "Les airs se font capricieux, et le dinosaure découvre un lot inattendu d'armes et d'armures en perdition.",
      "Un envol mitigé révèle, au lieu de gloire, un ensemble de 10 armes et 10 armures égarées.",
      "Le ciel se montre peu clément, offrant en compensation des équipements de fortune.",
      "Un vol raté qui, contre toute attente, livre 10 armes et 10 armures pour redorer son blason."
    ],
    baseModifiers: [
      {
        source: "fly",
        target: "experience",
        base_value: 10,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "fly",
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
    name: "Atterrissage catastrophique",
    actionType: DinosaurAction.Fly,
    minLevel: 10,
    positivityScore: -7,
    weight: 1,
    descriptions: [
      "Un vol se transforme en désastre, et le dinosaure récupère un stock conséquent d'armes et d'armures en pagaille.",
      "L'envol prend une tournure tragique, dévoilant 10 armes et 10 armures dispersées au sol.",
      "Un atterrissage calamiteux laisse le dinosaure avec un butin inattendu, mêlant armes et armures.",
      "Les cieux s'assombrissent et lui offrent, dans un dernier geste, un lot de 10 armes et 10 armures.",
      "Une fin de vol dramatique, où la chute révèle un trésor de 10 armes et 10 armures oubliées."
    ],
    baseModifiers: [
      {
        source: "fly",
        target: "experience",
        base_value: 10,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "fly",
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
    name: "Vol amical",
    actionType: DinosaurAction.Fly,
    minLevel: 5,
    positivityScore: 5,
    weight: 2,
    descriptions: [
      "Un vol paisible qui se transforme en moment de convivialité, rassemblant des alliés inattendus.",
      "Au milieu des nuages, le dinosaure gagne 5 amis et un collaborateur fidèle.",
      "Les airs résonnent d'amitié, lui offrant un lot surprenant de 5 amis et 1 employé.",
      "Un envol chaleureux qui unit les cœurs et enrichit son équipe de 5 amis et d'un employé.",
      "Un moment aérien où la camaraderie se traduit par l'arrivée de 5 amis et d'un employé."
    ],
    baseModifiers: [
      {
        source: "fly",
        target: "experience",
        base_value: 5,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "fly",
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
    name: "Vol de la fraternité",
    actionType: DinosaurAction.Fly,
    minLevel: 10,
    positivityScore: 7,
    weight: 1,
    descriptions: [
      "Un vol épique qui, contre toute attente, se solde par un rassemblement massif d'amis et de collaborateurs.",
      "Les cieux se font festifs et lui offrent 10 amis accompagnés de 2 employés dévoués.",
      "Un envol miraculeux transforme le voyage en une communion, réunissant 10 amis et 2 renforts.",
      "L'air se charge d'énergie positive, délivrant un précieux butin de 10 amis et 2 employés.",
      "Un vol inoubliable qui renforce son équipe avec 10 amis et 2 collaborateurs inspirés."
    ],
    baseModifiers: [
      {
        source: "fly",
        target: "experience",
        base_value: 10,
        additiveStep: 0,
        additiveIncrement: 0,
        multiplicativeStep: 0,
        multiplicativeIncrement: 0
      },
      {
        source: "fly",
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
