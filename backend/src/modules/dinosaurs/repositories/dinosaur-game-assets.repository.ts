import pool from '../../../common/database/db';
import { RowDataPacket } from 'mysql2';
import { DinosaurSkillInstanceDTO } from '../models/dinosaur-skill-instance.dto';
import { DinosaurItemInstanceDTO } from '../models/dinosaur-item-instance.dto';
import { DinosaurBuildingInstanceDTO } from '../models/dinosaur-building-instance.dto';
import { DinosaurSoulSkillInstanceDTO } from '../models/dinosaur-soul-skill-instance.dto';
import { SoulType } from '../../game-assets/models/dinosaur-soul-skill.dto';

/**
 * Interface décrivant une ligne issue du join entre dinosaur_skills_instance et dinosaur_skills.
 */
interface DatabaseDinosaurSkillInstanceRow extends RowDataPacket {
  dinosaur_id: number;
  skill_id: number;
  is_purchased: number; // stocké en TINYINT(1)
  is_active: number | null; // stocké en TINYINT(1) ou NULL
  last_activated_at: Date | null;
  skill_statModifiers: string; // JSON provenant de dinosaur_skills.stat_modifiers
}

/**
 * Interface décrivant une ligne issue du join entre dinosaur_items_instance et dinosaur_items.
 */
interface DatabaseDinosaurItemInstanceRow extends RowDataPacket {
  dinosaur_id: number;
  item_id: number;
  current_level_or_quantity: number;
  is_equipped: number; // TINYINT(1)
  // Champs provenant de dinosaur_items
  item_name: string;
  item_description: string;
  item_price: number;
  item_min_level_to_buy: number;
  item_type: string;
  item_category: string | null;
  item_levels: string; // JSON
}

/**
 * Interface décrivant une ligne issue du join entre dinosaur_buildings_instance et dinosaur_buildings.
 */
export interface DatabaseDinosaurBuildingInstanceRow extends RowDataPacket {
  dinosaur_id: number;
  building_id: number;
  current_level: number;
  purchased_upgrades: string; // JSON (ex: '{"1":true,"2":false}')
  // Champs provenant de la table des bâtiments
  name: string;
  description: string | null;
  price: number;
  min_level_to_buy: number;
  max_level: number;
  improvement_tree: string; // JSON (tableau d'amélioration)
  building_statModifiers: string; // JSON
}


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
   * Récupère toutes les instances de skills associées à un dinosaure.
   * Joint la table dinosaur_skills pour récupérer les statModifiers.
   * @param dinosaurId Identifiant du dinosaure.
   * @returns Une liste d'instances de skills.
   */
  public async getSkillInstancesByDinosaurId(dinosaurId: number): Promise<DinosaurSkillInstanceDTO[]> {
    try {
      const [rows] = await pool.query<DatabaseDinosaurSkillInstanceRow[]>(
        `SELECT dsi.*, ds.stat_modifiers AS skill_statModifiers 
         FROM dinosaur_skills_instance dsi
         JOIN dinosaur_skills ds ON dsi.skill_id = ds.id
         WHERE dsi.dinosaur_id = ?`,
        [dinosaurId]
      );
      return rows.map(row => ({
        id: row.skill_id,
        isPurchased: !!row.is_purchased,
        isActive: row.is_active !== null ? !!row.is_active : undefined,
        lastActivatedAt: row.last_activated_at ? new Date(row.last_activated_at) : undefined,
        statModifiers: JSON.parse(row.skill_statModifiers)
      })) as DinosaurSkillInstanceDTO[];
    } catch (error) {
      console.error("Error fetching dinosaur skill instances:", error);
      throw error;
    }
  }

  /**
   * Met à jour une instance de skill pour un dinosaure.
   * @param dinosaurId Identifiant du dinosaure.
   * @param skillInstance Instance de skill à mettre à jour.
   * @returns true si la mise à jour a réussi, false sinon.
   */
  public async updateSkillInstance(dinosaurId: number, skillInstance: DinosaurSkillInstanceDTO): Promise<boolean> {
    try {
      const query = `
        UPDATE dinosaur_skills_instance
        SET is_purchased = ?, is_active = ?, last_activated_at = ?
        WHERE dinosaur_id = ? AND skill_id = ?
      `;
      const values = [
        skillInstance.isPurchased ? 1 : 0,
        skillInstance.isActive !== undefined ? (skillInstance.isActive ? 1 : 0) : null,
        skillInstance.lastActivatedAt ? skillInstance.lastActivatedAt : null,
        dinosaurId,
        skillInstance.id
      ];
      const [result] = await pool.query(query, values);
      const resAny = result as any;
      return resAny.affectedRows > 0;
    } catch (error) {
      console.error("Error updating dinosaur skill instance:", error);
      throw error;
    }
  }

  /**
   * Récupère toutes les instances d'items associées à un dinosaure.
   * Joint la table dinosaur_items pour récupérer les niveaux (levels) et autres informations.
   * @param dinosaurId Identifiant du dinosaure.
   * @returns Une liste d'instances d'items.
   */
  public async getItemInstancesByDinosaurId(dinosaurId: number): Promise<DinosaurItemInstanceDTO[]> {
    try {
      const [rows] = await pool.query<DatabaseDinosaurItemInstanceRow[]>(
        `SELECT dii.*, ditems.name AS item_name, ditems.description AS item_description, 
                ditems.price AS item_price, ditems.min_level_to_buy AS item_min_level_to_buy, 
                ditems.item_type AS item_type, ditems.category AS item_category, ditems.levels AS item_levels
         FROM dinosaur_items_instance dii
         JOIN dinosaur_items ditems ON dii.item_id = ditems.id
         WHERE dii.dinosaur_id = ?`,
        [dinosaurId]
      );
      return rows.map(row => ({
        id: row.item_id,
        currentLevelOrQuantity: row.current_level_or_quantity,
        isEquipped: !!row.is_equipped,
        name: row.item_name,
        description: row.item_description,
        price: row.item_price,
        minLevelToBuy: row.item_min_level_to_buy,
        itemType: row.item_type,
        category: row.item_category || undefined,
        levels: JSON.parse(row.item_levels)
      })) as DinosaurItemInstanceDTO[];
    } catch (error) {
      console.error("Error fetching dinosaur item instances:", error);
      throw error;
    }
  }

  /**
   * Met à jour une instance d'item pour un dinosaure.
   * @param dinosaurId Identifiant du dinosaure.
   * @param itemInstance Instance d'item à mettre à jour.
   * @returns true si la mise à jour a réussi, false sinon.
   */
  public async updateItemInstance(dinosaurId: number, itemInstance: DinosaurItemInstanceDTO): Promise<boolean> {
    try {
      const query = `
        UPDATE dinosaur_items_instance
        SET current_level_or_quantity = ?, is_equipped = ?
        WHERE dinosaur_id = ? AND item_id = ?
      `;
      const values = [
        itemInstance.currentLevelOrQuantity,
        itemInstance.isEquipped ? 1 : 0,
        dinosaurId,
        itemInstance.id
      ];
      const [result] = await pool.query(query, values);
      const resAny = result as any;
      return resAny.affectedRows > 0;
    } catch (error) {
      console.error("Error updating dinosaur item instance:", error);
      throw error;
    }
  }


  /**
   * Récupère toutes les instances de bâtiments associées à un dinosaure.
   * La requête joint la table dinosaur_buildings pour récupérer les informations de base (nom, description, etc.).
   * @param dinosaurId Identifiant du dinosaure.
   * @returns Une liste d'instances de bâtiments.
   */
  public async getBuildingInstancesByDinosaurId(dinosaurId: number): Promise<DinosaurBuildingInstanceDTO[]> {
    try {
      const [rows] = await pool.query<DatabaseDinosaurBuildingInstanceRow[]>(
        `SELECT 
           dbi.building_id, 
           dbi.current_level, 
           dbi.purchased_upgrades, 
           dbuild.name, 
           dbuild.description, 
           dbuild.price, 
           dbuild.min_level_to_buy, 
           dbuild.max_level, 
           dbuild.improvement_tree, 
           dbuild.stat_modifiers AS building_statModifiers
         FROM dinosaur_buildings_instance dbi
         JOIN dinosaur_buildings dbuild ON dbi.building_id = dbuild.id
         WHERE dbi.dinosaur_id = ?`,
        [dinosaurId]
      );
      
      return rows.map(row => ({
        id: row.building_id,
        name: row.name,
        description: row.description || undefined,
        price: row.price,
        minLevelToBuy: row.min_level_to_buy,
        maxLevel: row.max_level,
        improvementTree: JSON.parse(row.improvement_tree),
        statModifiers: JSON.parse(row.building_statModifiers),
        currentLevel: row.current_level,
        purchasedUpgrades: JSON.parse(row.purchased_upgrades)
      })) as DinosaurBuildingInstanceDTO[];
    } catch (error) {
      console.error("Error fetching dinosaur building instances:", error);
      throw error;
    }
  }

  /**
   * Met à jour une instance de bâtiment pour un dinosaure.
   * @param dinosaurId Identifiant du dinosaure.
   * @param buildingInstance Instance de bâtiment à mettre à jour.
   * @returns true si la mise à jour a réussi, false sinon.
   */
  public async updateBuildingInstance(dinosaurId: number, buildingInstance: DinosaurBuildingInstanceDTO): Promise<boolean> {
    try {
      const query = `
        UPDATE dinosaur_buildings_instance
        SET current_level = ?, purchased_upgrades = ?
        WHERE dinosaur_id = ? AND building_id = ?
      `;
      const values = [
        buildingInstance.currentLevel,
        JSON.stringify(buildingInstance.purchasedUpgrades),
        dinosaurId,
        buildingInstance.id
      ];
      const [result] = await pool.query(query, values);
      const resAny = result as any;
      return resAny.affectedRows > 0;
    } catch (error) {
      console.error("Error updating dinosaur building instance:", error);
      throw error;
    }
  }

  /**
   * Exemple de méthode pour le shop : achat d'un skill.
   * Insère une nouvelle instance ou met à jour l'existante.
   * @param dinosaurId Identifiant du dinosaure.
   * @param skillInstance Instance de skill à acheter.
   * @returns true si l'opération a réussi.
   */
  public async purchaseSkill(dinosaurId: number, skillInstance: DinosaurSkillInstanceDTO): Promise<boolean> {
    try {
      const query = `
        INSERT INTO dinosaur_skills_instance (dinosaur_id, skill_id, is_purchased, is_active, last_activated_at)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE is_purchased = VALUES(is_purchased)
      `;
      const values = [
        dinosaurId,
        skillInstance.id,
        skillInstance.isPurchased ? 1 : 0,
        skillInstance.isActive !== undefined ? (skillInstance.isActive ? 1 : 0) : null,
        skillInstance.lastActivatedAt ? skillInstance.lastActivatedAt : null
      ];
      const [result] = await pool.query(query, values);
      const resAny = result as any;
      return resAny.affectedRows > 0;
    } catch (error) {
      console.error("Error purchasing dinosaur skill:", error);
      throw error;
    }
  }
  
  /**
   * Supprime toutes les instances de skills associées à un dinosaure.
   */
  public async deleteSkillInstancesByDinosaurId(dinosaurId: number): Promise<boolean> {
    try {
      const query = `DELETE FROM dinosaur_skills_instance WHERE dinosaur_id = ?`;
      const [result] = await pool.query(query, [dinosaurId]);
      const resAny = result as any;
      return resAny.affectedRows >= 0;
    } catch (error) {
      console.error("Error deleting dinosaur skill instances:", error);
      throw error;
    }
  }

  /**
   * Supprime toutes les instances d'items associées à un dinosaure.
   */
  public async deleteItemInstancesByDinosaurId(dinosaurId: number): Promise<boolean> {
    try {
      const query = `DELETE FROM dinosaur_items_instance WHERE dinosaur_id = ?`;
      const [result] = await pool.query(query, [dinosaurId]);
      const resAny = result as any;
      return resAny.affectedRows >= 0;
    } catch (error) {
      console.error("Error deleting dinosaur item instances:", error);
      throw error;
    }
  }

  /**
   * Supprime toutes les instances de bâtiments associées à un dinosaure.
   */
  public async deleteBuildingInstancesByDinosaurId(dinosaurId: number): Promise<boolean> {
    try {
      const query = `DELETE FROM dinosaur_buildings_instance WHERE dinosaur_id = ?`;
      const [result] = await pool.query(query, [dinosaurId]);
      const resAny = result as any;
      return resAny.affectedRows >= 0;
    } catch (error) {
      console.error("Error deleting dinosaur building instances:", error);
      throw error;
    }
  }

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
