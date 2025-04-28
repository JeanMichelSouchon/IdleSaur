import { BASE_EXP_REQUIRED, EXP_ADDITIONAL_FACTOR, EXP_ADDITIONAL_FACTOR_STEP, EXP_ADDITIONAL_PER_FIVE_LEVEL, EXP_ADDITIONAL_STEP, LEVEL_MAX, SKILL_POINT_ADDITIONAL_FACTOR_STEP, SKILL_POINTS_EARNING_ADDITIONAL, SKILL_POINTS_EARNING_ADDITIONAL_FACTOR, SKILL_POINTS_EARNING_ADDITIONAL_STEP, SKILL_POINTS_EARNING_BASE } from "../../../common/config/leveling.constants";


/**
 * Calcule le seuil d'expérience nécessaire pour atteindre un niveau donné.
 * @param level Le niveau pour lequel on calcule le seuil.
 * @returns Le seuil d'expérience requis.
 */
export function getExperienceThresholdForLevel(level: number): number {
    if (level > LEVEL_MAX) level = LEVEL_MAX;
  
    return Math.floor(
      BASE_EXP_REQUIRED +
      Math.floor(level / EXP_ADDITIONAL_STEP) * (Math.floor(level / 5) + 1) * EXP_ADDITIONAL_PER_FIVE_LEVEL +
      Math.floor(level / EXP_ADDITIONAL_FACTOR_STEP) * BASE_EXP_REQUIRED * EXP_ADDITIONAL_FACTOR
    );
  }
  
  /**
   * Calcule le nombre de skill points gagnés lors de la montée en niveau.
   * @param level Le niveau atteint.
   * @returns Le nombre de skill points à ajouter.
   */
  export function getSkillPointsForLevel(level: number): number {
    if (level > LEVEL_MAX) level = LEVEL_MAX;
  
    return Math.floor(
      SKILL_POINTS_EARNING_BASE +
      Math.floor(level / SKILL_POINTS_EARNING_ADDITIONAL_STEP) * SKILL_POINTS_EARNING_ADDITIONAL +
      Math.floor(level / SKILL_POINT_ADDITIONAL_FACTOR_STEP) * SKILL_POINTS_EARNING_BASE * SKILL_POINTS_EARNING_ADDITIONAL_FACTOR
    );
  }