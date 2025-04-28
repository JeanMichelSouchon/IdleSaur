import pool from '../../../common/database/db';
import { RowDataPacket } from 'mysql2';
import { DinosaurBuildingDTO } from '../models/dinosaur-building.dto';
import { GameAssetsMapping } from '../lib/game-assets.mapping';

/**
 * Interface décrivant une ligne de la table `dinosaur_buildings` telle que retournée par MySQL.
 */
interface DatabaseDinosaurBuildingRow extends RowDataPacket {
  id: number;
  name: string;
  description?: string;
  price: number;
  min_level_to_buy: number;
  current_level: number;
  max_level: number;
  improvement_tree: string; // JSON stocké sous forme de string
  stat_modifiers: string;   // JSON stocké sous forme de string
}

export class DinosaurBuildingRepository {
  public init: boolean = false;

  constructor() {}

  /**
   * Vérifie si la table dinosaur_buildings est vide et, le cas échéant,
   * insère les bâtiments de base issus du mapping global.
   */
  public async seedDinosaurBuildingsIfEmpty(): Promise<void> {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(`SELECT COUNT(*) AS count FROM dinosaur_buildings`);
      const count = rows[0].count;
      if (count > 0) {
        this.init = true;
        console.log('La table dinosaur_buildings est déjà peuplée.');
        return;
      }
      // GameAssetsMapping.buildings est un objet dont les clés représentent les types de bâtiments.
      const buildingsObject: { [key: string]: DinosaurBuildingDTO[] } = GameAssetsMapping.buildings;
      for (const key in buildingsObject) {
        if (buildingsObject.hasOwnProperty(key)) {
          const buildingArray: DinosaurBuildingDTO[] = buildingsObject[key];
          for (const building of buildingArray) {
            const query = `
              INSERT INTO dinosaur_buildings 
                (name, description, price, min_level_to_buy, max_level, improvement_tree, stat_modifiers)
              VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [
              building.name,
              building.description || null,
              building.price,
              building.minLevelToBuy,
              building.maxLevel,
              JSON.stringify(building.improvementTree),
              JSON.stringify(building.statModifiers)
            ];
            await pool.query(query, values);
          }
        }
      }
      console.log('Default buildings inserted.');
      this.init = true;
    } catch (error) {
      console.error('Erreur lors du seed des dinosaur_buildings :', error);
      throw error;
    }
  }

  /**
   * Récupère tous les bâtiments disponibles.
   */
  public async getAllDinosaurBuildings(): Promise<DinosaurBuildingDTO[]> {
    if (!this.init) {
      throw new Error("La base de données n'est pas initialisée");
    }
    const [rows] = await pool.query<DatabaseDinosaurBuildingRow[]>(`SELECT * FROM dinosaur_buildings`);
    return rows.map(row => ({
      id: row.id,
      name: row.name,
      description: row.description,
      price: row.price,
      minLevelToBuy: row.min_level_to_buy,
      currentLevel: row.current_level,
      maxLevel: row.max_level,
      improvementTree: JSON.parse(row.improvement_tree),
      statModifiers: JSON.parse(row.stat_modifiers)
    }));
  }

  /**
   * Récupère un bâtiment par son identifiant.
   * @param id L'identifiant du bâtiment.
   */
  public async getDinosaurBuildingById(id: number): Promise<DinosaurBuildingDTO | null> {
    if (!this.init) {
      throw new Error("La base de données n'est pas initialisée");
    }
    const [rows] = await pool.query<DatabaseDinosaurBuildingRow[]>(`SELECT * FROM dinosaur_buildings WHERE id = ?`, [id]);
    if (rows.length === 0) return null;
    const row = rows[0];
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      price: row.price,
      minLevelToBuy: row.min_level_to_buy,
      maxLevel: row.max_level,
      improvementTree: JSON.parse(row.improvement_tree),
      statModifiers: JSON.parse(row.stat_modifiers)
    };
  }

  /**
   * Crée un nouveau bâtiment.
   * @param building Les données du bâtiment à créer (sans l'identifiant).
   */
  public async createDinosaurBuilding(building: Omit<DinosaurBuildingDTO, 'id'>): Promise<DinosaurBuildingDTO> {
    const query = `
      INSERT INTO dinosaur_buildings 
      (name, description, price, min_level_to_buy, max_level, improvement_tree, stat_modifiers)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      building.name,
      building.description || null,
      building.price,
      building.minLevelToBuy,
      building.maxLevel,
      JSON.stringify(building.improvementTree),
      JSON.stringify(building.statModifiers)
    ];
    const [result] = await pool.query(query, values);
    const resAny = result as any;
    const insertedId = resAny.insertId;
    const createdBuilding = await this.getDinosaurBuildingById(insertedId);
    if (!createdBuilding) {
      throw new Error('Erreur lors de la création du bâtiment');
    }
    return createdBuilding;
  }

  /**
   * Met à jour un bâtiment existant.
   * @param building Le bâtiment avec les nouvelles valeurs (doit contenir un identifiant valide).
   */
  public async updateDinosaurBuilding(building: DinosaurBuildingDTO): Promise<boolean> {
    const query = `
      UPDATE dinosaur_buildings
      SET name = ?,
          description = ?,
          price = ?,
          min_level_to_buy = ?,
          max_level = ?,
          improvement_tree = ?,
          stat_modifiers = ?
      WHERE id = ?
    `;
    const values = [
      building.name,
      building.description || null,
      building.price,
      building.minLevelToBuy,
      building.maxLevel,
      JSON.stringify(building.improvementTree),
      JSON.stringify(building.statModifiers),
      building.id
    ];
    const [result] = await pool.query(query, values);
    const resAny = result as any;
    return resAny.affectedRows > 0;
  }

  /**
   * Supprime un bâtiment par son identifiant.
   * @param id L'identifiant du bâtiment à supprimer.
   */
  public async deleteDinosaurBuilding(id: number): Promise<boolean> {
    const query = `DELETE FROM dinosaur_buildings WHERE id = ?`;
    const [result] = await pool.query(query, [id]);
    const resAny = result as any;
    return resAny.affectedRows > 0;
  }
}
