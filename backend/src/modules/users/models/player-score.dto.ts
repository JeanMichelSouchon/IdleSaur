import { Exclude, Expose } from 'class-transformer';

/**
 * DTO pour représenter le score d'un joueur,
 * stocké dans la colonne player_score de la table user au format JSON.
 */
@Exclude()
export class PlayerScoreDTO {
  @Expose()
  totalSoulPoints!: number;

  @Expose()
  totalDarkSoulPoints!: number;

  @Expose()
  totalBrightSoulPoints!: number;

  @Expose()
  totalLives!: number;

  /**
   * Karma total (optionnel, si on veut le conserver).
   */
  @Expose()
  totalKarma!: number;

  /**
   * Le karma de la dernière vie (se transmet de vie en vie).
   */
  @Expose()
  latestKarma!: number;

  /**
   * Valeur la plus haute de karma jamais atteinte.
   */
  @Expose()
  maxKarma!: number;

  /**
   * Valeur la plus basse de karma jamais atteinte.
   */
  @Expose()
  minKarma!: number;

  /**
   * Moyenne du karma sur toutes les vies.
   */
  @Expose()
  averageKarma!: number;

  /**
   * Nombre de vies terminées en karma négatif (strictement < 0).
   */
  @Expose()
  negativeLivesCount!: number;

  /**
   * Nombre de vies terminées en karma positif ou nul.
   * (0 compte comme positif).
   */
  @Expose()
  positiveLivesCount!: number;

  @Expose()
  totalLifetime!: number;

  @Expose()
  maxLifetime!: number;

  @Expose()
  totalLevels!: number;

  @Expose()
  maxLevel!: number;

  @Expose()
  totalExperience!: number;

  @Expose()
  maxExperience!: number;
}
