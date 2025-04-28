import pool from '../../../common/database/db';
import { RowDataPacket } from 'mysql2';
import { DinosaurItemDTO } from '../models/dinosaur-item.dto';
import { GameAssetsMapping } from '../lib/game-assets.mapping';
import { DinosaurItemCategory, DinosaurItemType } from '../models/dinosaur-item.enums';

/**
 * Interface décrivant une ligne de la table `dinosaur_items` telle que retournée par MySQL.
 */
interface DatabaseDinosaurItemRow extends RowDataPacket {
  id: number;
  name: string;
  description?: string;
  price: number;
  min_level_to_buy: number;
  item_type: string;
  category?: string;
  levels: string; // JSON stocké sous forme de string
}

export class DinosaurItemRepository {
  public init: boolean = false;

  constructor() {}

  /**
   * Vérifie si la table dinosaur_items est vide et, le cas échéant,
   * insère les items de base issus du mapping global.
   */
  public async seedDinosaurItemsIfEmpty(): Promise<void> {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(`SELECT COUNT(*) AS count FROM dinosaur_items`);
      const count = rows[0].count;
      if (count > 0) {
        this.init = true;
        console.log('La table dinosaur_items est déjà peuplée.');
        return;
      }
      // Récupérer les items consommables et persistants du mapping global
      const consumableItems: DinosaurItemDTO[] = GameAssetsMapping.items.consumable;
      const persistentItems: DinosaurItemDTO[] = GameAssetsMapping.items.persistent;
      const defaultItems: DinosaurItemDTO[] = [...consumableItems, ...persistentItems];
      for (const item of defaultItems) {
        const query = `
          INSERT INTO dinosaur_items 
            (name, description, price, min_level_to_buy, item_type, category, levels)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
          item.name,
          item.description || null,
          item.price,
          item.minLevelToBuy,
          item.itemType,
          item.category || null,
          JSON.stringify(item.levels)
        ];
        await pool.query(query, values);
      }
      console.log('Default items inserted.');
      this.init = true;
    } catch (error) {
      console.error('Erreur lors du seed des dinosaur_items :', error);
      throw error;
    }
  }

  /**
   * Récupère tous les items disponibles.
   */
  public async getAllDinosaurItems(): Promise<DinosaurItemDTO[]> {
    if (!this.init) {
      throw new Error("La base de données n'est pas initialisée");
    }
    const [rows] = await pool.query<DatabaseDinosaurItemRow[]>(`SELECT * FROM dinosaur_items`);
    return rows.map(row => ({
      id: row.id,
      name: row.name,
      description: row.description,
      price: row.price,
      minLevelToBuy: row.min_level_to_buy,
      itemType: row.item_type as DinosaurItemType,
      category: row.category as DinosaurItemCategory,
      levels: JSON.parse(row.levels)
    }));
  }

  /**
   * Récupère un item par son identifiant.
   * @param id L'identifiant de l'item.
   */
  public async getDinosaurItemById(id: number): Promise<DinosaurItemDTO | null> {
    if (!this.init) {
      throw new Error("La base de données n'est pas initialisée");
    }
    const [rows] = await pool.query<DatabaseDinosaurItemRow[]>(`SELECT * FROM dinosaur_items WHERE id = ?`, [id]);
    if (rows.length === 0) return null;
    const row = rows[0];
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      price: row.price,
      minLevelToBuy: row.min_level_to_buy,
      itemType: row.item_type as DinosaurItemType,
      category: row.category as DinosaurItemCategory,
      levels: JSON.parse(row.levels)
    };
  }

  /**
   * Crée un nouvel item.
   * @param item Les données de l'item à créer (sans l'identifiant).
   */
  public async createDinosaurItem(item: Omit<DinosaurItemDTO, 'id'>): Promise<DinosaurItemDTO> {
    const query = `
      INSERT INTO dinosaur_items 
        (name, description, price, min_level_to_buy, item_type, category, levels)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      item.name,
      item.description || null,
      item.price,
      item.minLevelToBuy,
      item.itemType,
      item.category || null,
      JSON.stringify(item.levels)
    ];
    const [result] = await pool.query(query, values);
    const resAny = result as any;
    const insertedId = resAny.insertId;
    const createdItem = await this.getDinosaurItemById(insertedId);
    if (!createdItem) {
      throw new Error('Erreur lors de la création de l\'item');
    }
    return createdItem;
  }

  /**
   * Met à jour un item existant.
   * @param item L'item avec les nouvelles valeurs (doit contenir un identifiant valide).
   */
  public async updateDinosaurItem(item: DinosaurItemDTO): Promise<boolean> {
    const query = `
      UPDATE dinosaur_items
      SET name = ?,
          description = ?,
          price = ?,
          min_level_to_buy = ?,
          item_type = ?,
          category = ?,
          levels = ?
      WHERE id = ?
    `;
    const values = [
      item.name,
      item.description || null,
      item.price,
      item.minLevelToBuy,
      item.itemType,
      item.category || null,
      JSON.stringify(item.levels),
      item.id
    ];
    const [result] = await pool.query(query, values);
    const resAny = result as any;
    return resAny.affectedRows > 0;
  }

  /**
   * Supprime un item par son identifiant.
   * @param id L'identifiant de l'item à supprimer.
   */
  public async deleteDinosaurItem(id: number): Promise<boolean> {
    const query = `DELETE FROM dinosaur_items WHERE id = ?`;
    const [result] = await pool.query(query, [id]);
    const resAny = result as any;
    return resAny.affectedRows > 0;
  }
}
