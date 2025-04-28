import pool from '../../../common/database/db';
import { DinosaurLifeDTO } from '../../../modules/dinosaurs/models/dinosaur-life.dto';
import { computePlayerScore } from '../../../common/utils/score-calculator';
import { PlayerScoreDTO } from '../models/player-score.dto';

/**
 * Repository dédié au calcul et à la mise à jour du score du joueur
 * dans le module Users. Il récupère les vies de tous les dinosaures
 * appartenant à un utilisateur et met à jour la colonne player_score dans la table user.
 */
export class PlayerScoreRepository {
  public async recalculateAndSaveUserScore(userId: number): Promise<void> {
    try {
      // Récupérer les identifiants des dinos appartenant à l'utilisateur
      const [dinoRows] = await pool.query(
        'SELECT id FROM dinosaurs WHERE user_id = ?',
        [userId]
      );
      const dinosaurIds = (dinoRows as { id: number }[]).map(row => row.id);

      if (dinosaurIds.length === 0) {
        // Si l'utilisateur n'a aucun dinosaure, mettre à jour son score avec un score vide
        const emptyScore = new PlayerScoreDTO();
        // Initialiser les valeurs à 0
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

      // Préparer la requête pour récupérer toutes les vies des dinos appartenant à l'utilisateur
      const placeholders = dinosaurIds.map(() => '?').join(',');
      const [livesRows] = await pool.query(
        `SELECT * FROM dinosaur_lives WHERE dinosaur_id IN (${placeholders})`,
        dinosaurIds
      );
      const lives = livesRows as DinosaurLifeDTO[];

      // Calculer le score global à partir des vies
      const computedScore = computePlayerScore(lives);

      // Mettre à jour la colonne player_score de l'utilisateur
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
