import { DinosaurSoulSkillDTO } from "./dinosaur-soul-skill.dto";

/**
 * DTO représentant une instance d'une Soul Skill détenue par un dinosaure.
 * Hérite de la définition de base et ajoute des informations spécifiques à l'instance.
 */
export class DinosaurSoulSkillInstanceDTO extends DinosaurSoulSkillDTO {
  /**
   * Indique si la soul skill a été débloquée (achetée) par le dinosaure.
   */
  isUnlocked!: boolean;

  /**
   * Timestamp de l'achat de la soul skill.
   */
  purchasedAt?: Date;
}
