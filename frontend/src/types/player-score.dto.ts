/**
 * DTO pour représenter le score d'un joueur,
 * stocké dans la colonne player_score de la table user au format JSON.
 */
export class PlayerScoreDTO {
  totalSoulPoints!: number;
  totalDarkSoulPoints!: number;
  totalBrightSoulPoints!: number;
  totalLives!: number;

  /**
   * Karma total (optionnel, si on veut le conserver).
   */
  totalKarma!: number;

  /**
   * Le karma de la dernière vie (se transmet de vie en vie).
   */
  latestKarma!: number;

  /**
   * Valeur la plus haute de karma jamais atteinte.
   */
  maxKarma!: number;

  /**
   * Valeur la plus basse de karma jamais atteinte.
   */
  minKarma!: number;

  /**
   * Moyenne du karma sur toutes les vies.
   */
  averageKarma!: number;

  /**
   * Nombre de vies terminées en karma négatif (strictement < 0).
   */
  negativeLivesCount!: number;

  /**
   * Nombre de vies terminées en karma positif ou nul.
   * (0 compte comme positif).
   */
  positiveLivesCount!: number;

  totalLifetime!: number;
  maxLifetime!: number;
  totalLevels!: number;
  maxLevel!: number;
  totalExperience!: number;
  maxExperience!: number;
}
