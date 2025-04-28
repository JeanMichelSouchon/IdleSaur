import pool from '../../../common/database/db';
import { DinosaurLifeDTO } from '../../dinosaurs/models/dinosaur-life.dto';
import { computePlayerScore } from '../../../common/utils/score-calculator';
import { PlayerScoreDTO } from '../../users/models/player-score.dto';

/**
 * Repository dédié au calcul et à la mise à jour du player_score dans la table user.
 */
export class PlayerScoreRepository {

  /**
   * Recalcule et enregistre le score du joueur (basé sur toutes les vies de tous ses dinos).
   * @param userId L'ID de l'utilisateur.
   */
  public async recalculateAndSaveUserScore(userId: number): Promise<void> {
    try {
      // 1) Récupérer l'ensemble des dinos du user
      const [dinosRows] = await pool.query(
        'SELECT id FROM dinosaurs WHERE user_id = ?',
        [userId]
      );
      const dinosaurIds = (dinosRows as { id: number }[]).map(row => row.id);

      if (dinosaurIds.length === 0) {
        // Aucune vie => on met un score "vide"
        const emptyScore = new PlayerScoreDTO();
        // On remplit tout à 0 pour être cohérent
        emptyScore.totalSoulPoints = 0;
        emptyScore.totalDarkSoulPoints = 0;
        emptyScore.totalBrightSoulPoints = 0;
        emptyScore.totalLives = 0;
        emptyScore.totalKarma = 0;
        emptyScore.latestKarma = 0;
        emptyScore.maxKarma = 0;
        emptyScore.minKarma = 0;
        emptyScore.averageKarma = 0;
        emptyScore.negativeLivesCount = 0;
        emptyScore.positiveLivesCount = 0;
        emptyScore.totalLifetime = 0;
        emptyScore.maxLifetime = 0;
        emptyScore.totalLevels = 0;
        emptyScore.maxLevel = 0;
        emptyScore.totalExperience = 0;
        emptyScore.maxExperience = 0;

        await pool.query(
          'UPDATE user SET player_score = ? WHERE id = ?',
          [JSON.stringify(emptyScore), userId]
        );
        return;
      }

      // 2) Récupérer toutes les vies de ces dinos
      const placeholders = dinosaurIds.map(() => '?').join(',');
      const [livesRows] = await pool.query(
        `SELECT * FROM dinosaur_lives WHERE dinosaur_id IN (${placeholders})`,
        dinosaurIds
      );
      const lives = livesRows as DinosaurLifeDTO[];

      // 3) Calculer le nouveau score
      const computedScore = computePlayerScore(lives);

      // 4) Mettre à jour la colonne player_score de l'utilisateur
      await pool.query(
        'UPDATE user SET player_score = ? WHERE id = ?',
        [JSON.stringify(computedScore), userId]
      );
    } catch (error) {
      console.error('Erreur lors du recalcul du score du joueur:', error);
      throw error;
    }
  }
}
