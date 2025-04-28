import pool from '../../../common/database/db';
import { RowDataPacket } from 'mysql2';
import { DinosaurSoulSkillInstanceDTO } from '../models/dinosaur-soul-skill-instance.dto';
import { SoulType } from '../../game-assets/models/dinosaur-soul-skill.dto';





/**
 * Interface décrivant une ligne issue du join entre dinosaur_soul_skills_instance et dinosaur_soul_skills.
 */
interface DatabaseDinosaurSoulSkillInstanceRow extends RowDataPacket {
  dinosaur_id: number;
  soul_skill_id: number;
  is_unlocked: number; // TINYINT(1)
  purchased_at: Date | null;
  // Champs provenant de dinosaur_soul_skills
  soul_skill_statModifiers: string; // JSON provenant de dinosaur_soul_skills.stat_modifiers
  soul_skill_name: string;
  soul_skill_description: string | null;
  soul_skill_price: number;
  soul_skill_soul_type: string;
  soul_skill_tier: number;
}

/**
 * Repository dédié à la gestion des assets d'un dinosaure.
 * Ce repository permet de récupérer et de mettre à jour les instances de skills, items et buildings possédées par un dinosaure.
 */
export class DinosaurGameAssetsRepository {

  
  /**
   * Récupère toutes les instances de Soul Skills associées à un dinosaure.
   * Joint la table dinosaur_soul_skills_instance et dinosaur_soul_skills pour récupérer les statModifiers.
   * @param dinosaurId Identifiant du dinosaure.
   * @returns Une liste d'instances de Soul Skills.
   */
  public async getSoulSkillInstancesByDinosaurId(dinosaurId: number): Promise<DinosaurSoulSkillInstanceDTO[]> {
    try {
      const [rows] = await pool.query<DatabaseDinosaurSoulSkillInstanceRow[]>(
        `SELECT dssi.*, dss.stat_modifiers AS soul_skill_statModifiers, dss.name AS soul_skill_name, dss.description AS soul_skill_description, dss.price AS soul_skill_price, dss.soul_type AS soul_skill_soul_type, dss.tier AS soul_skill_tier
         FROM dinosaur_soul_skills_instance dssi
         JOIN dinosaur_soul_skills dss ON dssi.soul_skill_id = dss.id
         WHERE dssi.dinosaur_id = ?`,
        [dinosaurId]
      );
      return rows.map(row => ({
        id: row.soul_skill_id,
        name: row.soul_skill_name,
        description: row.soul_skill_description || undefined,
        price: row.soul_skill_price,
        soulType: row.soul_skill_soul_type as SoulType,
        tier: row.soul_skill_tier,
        statModifiers: JSON.parse(row.soul_skill_statModifiers),
        isUnlocked: !!row.is_unlocked,
        purchasedAt: row.purchased_at ? new Date(row.purchased_at) : undefined
      }));
    } catch (error) {
      console.error("Error fetching dinosaur soul skill instances:", error);
      throw error;
    }
  }
}
