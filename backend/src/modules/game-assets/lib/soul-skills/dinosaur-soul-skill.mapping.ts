import { neutralSoulSkills } from './dinosaur-soul-skill.neutral.mapping';
import { brightSoulSkills } from './dinosaur-soul-skill.bright.mapping';
import { darkSoulSkills } from './dinosaur-soul-skill.dark.mapping';
import { DinosaurSoulSkillDTO } from '../../models/dinosaur-soul-skill.dto';

/**
 * Agrégation complète de tous les Soul Skills pour le module Game-Assets.
 */
export const soulSkills: DinosaurSoulSkillDTO[] = [
  ...neutralSoulSkills,
  ...brightSoulSkills,
  ...darkSoulSkills
];
