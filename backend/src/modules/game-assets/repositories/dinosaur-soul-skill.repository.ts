import pool from '../../../common/database/db';
import { RowDataPacket } from 'mysql2';
import { DinosaurSoulSkillDTO, SoulType } from '../models/dinosaur-soul-skill.dto';
import { GameAssetsMapping } from '../lib/game-assets.mapping';
import { DinosaurSoulSkillInstanceDTO } from '../../dinosaurs/models/dinosaur-soul-skill-instance.dto';

/**
 * Interface décrivant une ligne issue de la table dinosaur_soul_skills
 * telle que retournée par MySQL.
 */
interface DatabaseDinosaurSoulSkillRow extends RowDataPacket {
  id: number;
  name: string;
  description?: string;
  price: number;
  soul_type: string;
  tier: number;
  stat_modifiers: string; // JSON stocké sous forme de string
}

export class DinosaurSoulSkillRepository {
  public init: boolean = false;

  constructor() {}

  /**
   * Vérifie si la table dinosaur_soul_skills est vide et, le cas échéant,
   * insère les soul skills de base issus du mapping global.
   */
  public async seedDinosaurSoulSkillsIfEmpty(): Promise<void> {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(`SELECT COUNT(*) AS count FROM dinosaur_soul_skills`);
      const count = rows[0].count;
      if (count > 0) {
        this.init = true;
        console.log('La table dinosaur_soul_skills est déjà peuplée.');
        return;
      }
      // Récupération des soul skills depuis le mapping global
      const soulSkillsArray: DinosaurSoulSkillDTO[] = GameAssetsMapping.soulSkills;
      for (const soulSkill of soulSkillsArray) {
        const query = `
          INSERT INTO dinosaur_soul_skills 
            (name, description, price, soul_type, tier, stat_modifiers)
          VALUES (?, ?, ?, ?, ?, ?)
        `;
        const values = [
          soulSkill.name,
          soulSkill.description || null,
          soulSkill.price,
          soulSkill.soulType,
          soulSkill.tier,
          JSON.stringify(soulSkill.statModifiers)
        ];
        await pool.query(query, values);
      }
      console.log('Default soul skills inserted.');
      this.init = true;
    } catch (error) {
      console.error('Erreur lors du seed des dinosaur_soul_skills :', error);
      throw error;
    }
  }

  /**
   * Récupère toutes les soul skills disponibles.
   */
  public async getAllDinosaurSoulSkills(): Promise<DinosaurSoulSkillDTO[]> {
    if (!this.init) {
      throw new Error("La base de données n'est pas initialisée");
    }
    const [rows] = await pool.query<DatabaseDinosaurSoulSkillRow[]>(`SELECT * FROM dinosaur_soul_skills`);
    return rows.map(row => ({
      id: row.id,
      name: row.name,
      description: row.description,
      price: row.price,
      soulType: row.soul_type as SoulType,
      tier: row.tier,
      statModifiers: JSON.parse(row.stat_modifiers)
    }));
  }

  /**
   * Récupère une soul skill par son identifiant.
   * @param id L'identifiant de la soul skill.
   * Retourne une instance étendue (DinosaurSoulSkillInstanceDTO)
   * afin de savoir si le dinosaure l'a achetée ou non.
   */
  public async getDinosaurSoulSkillById(id: number): Promise<DinosaurSoulSkillInstanceDTO | null> {
    if (!this.init) {
      throw new Error("La base de données n'est pas initialisée");
    }
    const [rows] = await pool.query<DatabaseDinosaurSoulSkillRow[]>(`SELECT * FROM dinosaur_soul_skills WHERE id = ?`, [id]);
    if (rows.length === 0) return null;
    const row = rows[0];
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      price: row.price,
      soulType: row.soul_type as SoulType,
      tier: row.tier,
      statModifiers: JSON.parse(row.stat_modifiers),
      isUnlocked: false,
      purchasedAt: undefined
    };
  }
  
  // D'autres fonctions (create, update, delete) pourront être ajoutées si nécessaire.
}
