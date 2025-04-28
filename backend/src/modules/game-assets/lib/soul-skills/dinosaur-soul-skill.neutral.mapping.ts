import { DinosaurSoulSkillDTO } from '../../models/dinosaur-soul-skill.dto';
import { SoulType } from '../../models/dinosaur-soul-skill.dto';

/**
 * Soul Skills de l'arbre Neutre.
 * Ces compétences héritées de vies antérieures apportent un bonus sur le karma,
 * symbole de l'équilibre et de la sagesse accumulée au fil des réincarnations.
 */
export const neutralSoulSkills: DinosaurSoulSkillDTO[] = [
  {
    id: 0,
    name: "Mémoire Ancestrale",
    description: "Les échos de tes vies passées te confèrent une légère augmentation du karma. Les anciens dinos savaient comment gérer leur destin !",
    price: 300,
    soulType: SoulType.Neutral,
    tier: 1,
    statModifiers: [
      { source: "soul_skill", target: "earn_karma_multiplier", type: "multiplicative", value: 0.1 }
    ]
  },
  {
    id: 1,
    name: "Sérénité Ancestrale",
    description: "L'équilibre des âmes oubliées t'accorde une stabilité karmique supérieure, te préparant pour des réincarnations encore plus brillantes.",
    price: 600,
    soulType: SoulType.Neutral,
    tier: 2,
    statModifiers: [
      { source: "soul_skill", target: "earn_karma_multiplier", type: "multiplicative", value: 0.15 }
    ]
  },
  {
    id: 2,
    name: "Héritage Éternel",
    description: "Les secrets millénaires te confèrent une puissance karmique sans égale. Tu es désormais un véritable sage des temps anciens, maître de ta destinée !",
    price: 900,
    soulType: SoulType.Neutral,
    tier: 3,
    statModifiers: [
      { source: "soul_skill", target: "earn_karma_multiplier", type: "multiplicative", value: 0.25 }
    ]
  }
];
