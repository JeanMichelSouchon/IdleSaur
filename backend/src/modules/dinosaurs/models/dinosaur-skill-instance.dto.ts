import { Exclude, Expose } from 'class-transformer';
import { DinosaurSkillDTO } from '../../game-assets/models/dinosaur-skill.dto';

/**
 * DTO représentant une instance d'une compétence (skill) détenue par un dinosaure.
 * Hérite de la définition de base et ajoute des informations spécifiques à l'instance.
 */
@Exclude()
export class DinosaurSkillInstanceDTO extends DinosaurSkillDTO {
  /**
   * Indique si le skill a été acheté par le dinosaure.
   */
  @Expose() isPurchased!: boolean;
  
  /**
   * Pour les skills déclenchables, indique s'ils sont actuellement actifs.
   */
  @Expose() isActive?: boolean;
  
  /**
   * Timestamp de la dernière activation (pour les skills déclenchables).
   */
  @Expose() lastActivatedAt?: Date;
}
