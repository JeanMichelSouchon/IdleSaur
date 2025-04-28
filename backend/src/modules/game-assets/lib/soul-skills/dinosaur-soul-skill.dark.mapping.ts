import { DinosaurSoulSkillDTO } from '../../models/dinosaur-soul-skill.dto';
import { SoulType } from '../../models/dinosaur-soul-skill.dto';

/**
 * Soul Skills de l'arbre Dark.
 * Plonge dans l'obscurité de tes vies antérieures pour ralentir la décroissance d'énergie.
 * Laisse le pouvoir des ombres t'inspirer et te protéger, comme un manteau de ténèbres bienveillant.
 */
export const darkSoulSkills: DinosaurSoulSkillDTO[] = [
  {
    id: 6,
    name: "Ombre Naissante",
    description: "Une once d'obscurité t'aide à ralentir la perte d'énergie. Embrasse le côté sombre pour prolonger ta longévité.",
    price: 400,
    soulType: SoulType.Dark,
    tier: 1,
    statModifiers: [
      { source: "soul_skill", target: "energy_decay_multiplier", type: "multiplicative", value: -0.1 }
    ]
  },
  {
    id: 7,
    name: "Voile de Ténèbres",
    description: "Les ombres de tes vies antérieures se renforcent pour protéger tes réserves d'énergie. Un véritable bouclier obscur pour le dinosaure moderne !",
    price: 800,
    soulType: SoulType.Dark,
    tier: 2,
    statModifiers: [
      { source: "soul_skill", target: "energy_decay_multiplier", type: "multiplicative", value: -0.15 }
    ]
  },
  {
    id: 8,
    name: "Crépuscule Infini",
    description: "Plonge dans l'abîme de tes réincarnations et minimise drastiquement la décroissance d'énergie. Deviens l'incarnation même de l'ombre éternelle !",
    price: 1200,
    soulType: SoulType.Dark,
    tier: 3,
    statModifiers: [
      { source: "soul_skill", target: "energy_decay_multiplier", type: "multiplicative", value: -0.2 }
    ]
  }
];
