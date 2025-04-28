import pool from '../../../common/database/db';
import { RowDataPacket } from 'mysql2';
import { DinosaurLifeDTO } from '../models/dinosaur-life.dto';

/**
 * Repository dédié à la gestion de l'historique des vies d'un dinosaure.
 */
export class DinosaurLivesRepository {
  /**
   * Enregistre une nouvelle vie pour un dinosaure.
   *
   * @param life - Les informations de la vie du dinosaure.
   * @returns L'identifiant de la vie insérée.
   */
  public async createDinosaurLife(life: DinosaurLifeDTO): Promise<number> {
    try {
      const query = `
        INSERT INTO dinosaur_lives (
          dinosaur_id, name, experience, karma, level,
          birth_date, death_date,
          soul_points, dark_soul_points, bright_soul_points
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        life.dinosaur_id,
        life.name,
        life.experience,
        life.karma,
        life.level,
        life.birth_date,
        life.death_date,
        life.soul_points,
        life.dark_soul_points,
        life.bright_soul_points,
      ];
      const [result] = await pool.query(query, values);
      const res = result as any;
      return res.insertId;
    } catch (error) {
      console.error("Erreur lors de la création de la vie du dinosaure:", error);
      throw error;
    }
  }

  /**
   * Récupère toutes les vies enregistrées d'un dinosaure.
   *
   * @param dinosaurId - L'identifiant du dinosaure.
   * @returns Une liste des vies du dinosaure.
   */
  public async getDinosaurLivesByDinosaurId(dinosaurId: number): Promise<DinosaurLifeDTO[]> {
    try {
      const query = `SELECT * FROM dinosaur_lives WHERE dinosaur_id = ? ORDER BY created_at DESC`;
      const [rows] = await pool.query(query, [dinosaurId]);
      return rows as DinosaurLifeDTO[];
    } catch (error) {
      console.error("Erreur lors de la récupération des vies du dinosaure:", error);
      throw error;
    }
  }
}
