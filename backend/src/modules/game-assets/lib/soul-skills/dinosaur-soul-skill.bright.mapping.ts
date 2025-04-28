import { DinosaurSoulSkillDTO } from '../../models/dinosaur-soul-skill.dto';
import { SoulType } from '../../models/dinosaur-soul-skill.dto';

/**
 * Soul Skills de l'arbre Bright.
 * Ces compétences, éclatantes comme un lever de soleil, puisent dans la lumière des vies antérieures
 * pour booster ta récupération d'énergie et illuminer ton parcours vers la grandeur.
 */
export const brightSoulSkills: DinosaurSoulSkillDTO[] = [
  {
    id: 3,
    name: "Aube Lumineuse",
    description: "Les rayons d'une vie éclatante te redonnent un coup de boost. Réveille le dinosaure lumineux qui sommeille en toi !",
    price: 400,
    soulType: SoulType.Bright,
    tier: 1,
    statModifiers: [
      { source: "soul_skill", target: "energy_recovery_multiplier", type: "multiplicative", value: 0.1 }
    ]
  },
  {
    id: 4,
    name: "Lumière Révélatrice",
    description: "Les souvenirs étincelants de tes réincarnations éclairent ton chemin, augmentant considérablement ta capacité à récupérer de l'énergie.",
    price: 800,
    soulType: SoulType.Bright,
    tier: 2,
    statModifiers: [
      { source: "soul_skill", target: "energy_recovery_multiplier", type: "multiplicative", value: 0.15 }
    ]
  },
  {
    id: 5,
    name: "Aurora Radieuse",
    description: "Une explosion de lumière ancestrale te propulse dans une dimension où l'énergie se renouvelle sans cesse. Brille de mille feux et fais pâlir les étoiles !",
    price: 1200,
    soulType: SoulType.Bright,
    tier: 3,
    statModifiers: [
      { source: "soul_skill", target: "energy_recovery_multiplier", type: "multiplicative", value: 0.2 }
    ]
  }
];
