import pool from '../../../common/database/db';
import { RowDataPacket } from 'mysql2';
import { DinosaurSkillDTO } from '../models/dinosaur-skill.dto';
import { GameAssetsMapping } from '../lib/game-assets.mapping';
import { DinosaurSkillCategory, DinosaurSkillType } from '../models/dinosaur-skill.enums';

/**
 * Interface décrivant une ligne de la table `dinosaur_skills` telle que retournée par MySQL.
 */
interface DatabaseDinosaurSkillRow extends RowDataPacket {
  id: number;
  name: string;
  description?: string;
  price: number;
  min_level_to_buy: number;
  category: string;
  type: string;
  tier: number;
  duration: number | null;
  stat_modifiers: string; // JSON stocké sous forme de string
}

export class DinosaurSkillRepository {
  public init: boolean = false;

  constructor() {}

  /**
   * Vérifie si la table dinosaur_skills est vide et, le cas échéant,
   * insère les données de base issues du mapping global.
   */
  public async seedDinosaurSkillsIfEmpty(): Promise<void> {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(`SELECT COUNT(*) AS count FROM dinosaur_skills`);
      const count = rows[0].count;
      if (count > 0) {
        this.init = true;
        console.log('La table dinosaur_skills est déjà peuplée.');
        return;
      }
      // Peuplement à partir du mapping global
      const defaultSkills: DinosaurSkillDTO[] = GameAssetsMapping.skills;
      for (const skill of defaultSkills) {
        const query = `
          INSERT INTO dinosaur_skills 
            (name, description, price, min_level_to_buy, category, type, tier, duration, stat_modifiers)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
          skill.name,
          skill.description || null,
          skill.price,
          skill.minLevelToBuy,
          skill.category,
          skill.type,
          skill.tier,
          skill.duration || null,
          JSON.stringify(skill.statModifiers)
        ];
        await pool.query(query, values);
      }
      console.log('Default skills inserted.');
      this.init = true;
    } catch (error) {
      console.error('Erreur lors du seed des dinosaur_skills :', error);
      throw error;
    }
  }

  /**
   * Récupère toutes les compétences disponibles.
   */
  public async getAllDinosaurSkills(): Promise<DinosaurSkillDTO[]> {
    if (!this.init) {
      throw new Error("La base de données n'est pas initialisée");
    }
    const [rows] = await pool.query<DatabaseDinosaurSkillRow[]>(`SELECT * FROM dinosaur_skills`);
    return rows.map(row => ({
      id: row.id,
      name: row.name,
      description: row.description,
      price: row.price,
      minLevelToBuy: row.min_level_to_buy,
      category: row.category as DinosaurSkillCategory,
      type: row.type as DinosaurSkillType,
      tier: row.tier,
      duration: row.duration === null ? undefined : row.duration,
      statModifiers: JSON.parse(row.stat_modifiers)
    }));
  }

  /**
   * Récupère une compétence par son identifiant.
   * @param id L'identifiant de la compétence.
   */
  public async getDinosaurSkillById(id: number): Promise<DinosaurSkillDTO | null> {
    if (!this.init) {
      throw new Error("La base de données n'est pas initialisée");
    }
    const [rows] = await pool.query<DatabaseDinosaurSkillRow[]>(`SELECT * FROM dinosaur_skills WHERE id = ?`, [id]);
    if (rows.length === 0) return null;
    const row = rows[0];
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      price: row.price,
      minLevelToBuy: row.min_level_to_buy,
      category: row.category as DinosaurSkillCategory,
      type: row.type as DinosaurSkillType,
      tier: row.tier,
      duration: row.duration === null ? undefined : row.duration,
      statModifiers: JSON.parse(row.stat_modifiers)
    };
  }

  /**
   * Crée une nouvelle compétence.
   * @param skill Les données de la compétence à créer (sans l'identifiant).
   */
  public async createDinosaurSkill(skill: Omit<DinosaurSkillDTO, 'id'>): Promise<DinosaurSkillDTO> {
    const query = `
      INSERT INTO dinosaur_skills 
        (name, description, price, min_level_to_buy, category, type, tier, duration, stat_modifiers)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      skill.name,
      skill.description || null,
      skill.price,
      skill.minLevelToBuy,
      skill.category,
      skill.type,
      skill.tier,
      skill.duration || null,
      JSON.stringify(skill.statModifiers)
    ];
    const [result] = await pool.query(query, values);
    const resAny = result as any;
    const insertedId = resAny.insertId;
    const createdSkill = await this.getDinosaurSkillById(insertedId);
    if (!createdSkill) {
      throw new Error('Erreur lors de la création du DinosaurSkill');
    }
    return createdSkill;
  }

  /**
   * Met à jour une compétence existante.
   * @param skill La compétence avec les nouvelles valeurs (doit contenir un identifiant valide).
   */
  public async updateDinosaurSkill(skill: DinosaurSkillDTO): Promise<boolean> {
    const query = `
      UPDATE dinosaur_skills
      SET name = ?,
          description = ?,
          price = ?,
          min_level_to_buy = ?,
          category = ?,
          type = ?,
          tier = ?,
          duration = ?,
          stat_modifiers = ?
      WHERE id = ?
    `;
    const values = [
      skill.name,
      skill.description || null,
      skill.price,
      skill.minLevelToBuy,
      skill.category,
      skill.type,
      skill.tier,
      skill.duration || null,
      JSON.stringify(skill.statModifiers),
      skill.id
    ];
    const [result] = await pool.query(query, values);
    const resAny = result as any;
    return resAny.affectedRows > 0;
  }

  /**
   * Supprime une compétence par son identifiant.
   * @param id L'identifiant de la compétence à supprimer.
   */
  public async deleteDinosaurSkill(id: number): Promise<boolean> {
    const query = `DELETE FROM dinosaur_skills WHERE id = ?`;
    const [result] = await pool.query(query, [id]);
    const resAny = result as any;
    return resAny.affectedRows > 0;
  }
}
