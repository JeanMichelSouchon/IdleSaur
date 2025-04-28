import { Exclude, Expose } from 'class-transformer';
import { DinosaurSoulSkillDTO } from '../../game-assets/models/dinosaur-soul-skill.dto';

/**
 * DTO représentant une instance d'une Soul Skill détenue par un dinosaure.
 * Hérite de la définition de base et ajoute des informations spécifiques à l'instance.
 */
@Exclude()
export class DinosaurSoulSkillInstanceDTO extends DinosaurSoulSkillDTO {
  /**
   * Indique si la soul skill a été débloquée (achetée) par le dinosaure.
   */
  @Expose() isUnlocked!: boolean;

  /**
   * Timestamp de l'achat de la soul skill.
   */
  @Expose() purchasedAt?: Date;
}
