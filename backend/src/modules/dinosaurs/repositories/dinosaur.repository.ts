import { DatabaseDinosaur } from '../models/database-dinosaur.interface';
import pool from '../../../common/database/db';
import { RowDataPacket } from 'mysql2';
import { Epoch } from '../models/epoch.enum';
import { DinosaurType } from '../models/dinosaur-type.interface';
import { DinosaurDiet } from '../models/dinosaur-diet.interface';
import { DinosaurLivesRepository } from './dinosaur-lives.repository';

// Fonction utilitaire pour parser uniquement si la valeur est une chaîne
const parseIfString = (value: any): any => {
  return typeof value === 'string' ? JSON.parse(value) : value;
};

/**
 * Repository pour gérer les opérations sur la table des dinosaures.
 * Les requêtes effectuent une jointure avec les tables dinosaur_types et dinosaur_diets
 * afin d'obtenir les objets complets (incluant leurs modificateurs en JSON).
 * Ce repository intègre également les assets (skills, items, buildings, soul skills)
 * ainsi que l'historique des vies du dinosaure.
 */
export class DinosaurRepository {
  private livesRepo: DinosaurLivesRepository;

  constructor(
    dinosaurLivesRepository: DinosaurLivesRepository
  ) {
    this.livesRepo = dinosaurLivesRepository;
  }

  public async getDinosaurById(dinosaurId: number): Promise<DatabaseDinosaur | null> {
    try {
      const [results] = await pool.query<(DatabaseDinosaurDataRow & RowDataPacket)[]>(
        `SELECT d.*, 
                d.death_date, 
                dt.name AS type_name, dt.stat_modifiers AS type_stat_modifiers, 
                dd.name AS diet_name, dd.stat_modifiers AS diet_stat_modifiers
         FROM dinosaurs d
         JOIN dinosaur_types dt ON d.type_id = dt.id
         JOIN dinosaur_diets dd ON d.diet_id = dd.id
         WHERE d.id = ?`,
        [dinosaurId]
      );
      if (results.length === 0) return null;
      const row = results[0];

      // Utilisation de parseIfString pour éviter le double parsing
      const typeModifiers = parseIfString(row.type_stat_modifiers) as any[];
      const dietModifiers = parseIfString(row.diet_stat_modifiers) as any[];

      const dinosaur: DatabaseDinosaur = {
        id: row.id,
        name: row.name,
        userId: row.user_id,
        type: {
          id: row.type_id,
          name: row.type_name,
          statModifiers: typeModifiers
        },
        diet: {
          id: row.diet_id,
          name: row.diet_name,
          statModifiers: dietModifiers
        },
        energy: row.energy,
        food: row.food,
        hunger: row.hunger,
        karma: row.karma,
        experience: row.experience,
        level: row.level,
        epoch: row.epoch as Epoch,
        created_at: row.created_at,
        last_reborn: new Date(row.last_reborn),
        // Lecture de la death_date (null si encore vivant)
        death_date: row.death_date ? new Date(row.death_date) : null,
        reborn_amount: row.reborn_amount,
        last_update_by_time_service: new Date(row.last_update_by_time_service),
        is_sleeping: row.is_sleeping,
        is_dead: row.is_dead,
        lives: [] // Historique des vies du dinosaure
      };


      return dinosaur;
    } catch (err) {
      console.error('Erreur lors de la récupération du dinosaure par ID:', err);
      throw err;
    }
  }

  public async getDinosaurByUserId(userId: number): Promise<DatabaseDinosaur | null> {
    try {
      const [results] = await pool.query<(DatabaseDinosaurDataRow & RowDataPacket)[]>(
        `SELECT d.*, 
                d.death_date,
                dt.name AS type_name, dt.stat_modifiers AS type_stat_modifiers, 
                dd.name AS diet_name, dd.stat_modifiers AS diet_stat_modifiers
         FROM dinosaurs d
         JOIN dinosaur_types dt ON d.type_id = dt.id
         JOIN dinosaur_diets dd ON d.diet_id = dd.id
         WHERE d.user_id = ?`,
        [userId]
      );
      if (results.length === 0) return null;
      const row = results[0];
      const typeModifiers = parseIfString(row.type_stat_modifiers) as any[];
      const dietModifiers = parseIfString(row.diet_stat_modifiers) as any[];
      const dinosaur: DatabaseDinosaur = {
        id: row.id,
        name: row.name,
        userId: row.user_id,
        type: {
          id: row.type_id,
          name: row.type_name,
          statModifiers: typeModifiers
        },
        diet: {
          id: row.diet_id,
          name: row.diet_name,
          statModifiers: dietModifiers
        },
        energy: row.energy,
        food: row.food,
        hunger: row.hunger,
        karma: row.karma,
        experience: row.experience,
        level: row.level,
        epoch: row.epoch as Epoch,
        created_at: row.created_at,
        last_reborn: new Date(row.last_reborn),
        death_date: row.death_date ? new Date(row.death_date) : null,
        reborn_amount: row.reborn_amount,
        last_update_by_time_service: new Date(row.last_update_by_time_service),
        is_sleeping: row.is_sleeping,
        is_dead: row.is_dead,
        lives: []
      };

      return dinosaur;
    } catch (err) {
      console.error('Erreur lors de la récupération du dinosaure par userId:', err);
      throw err;
    }
  }

  public async updateDinosaur(dinosaurId: number, updates: Partial<DatabaseDinosaur>): Promise<boolean> {
    try {
      const allowedKeys = new Set([
        "name",
        "userId",
        "energy",
        "food",
        "hunger",
        "karma",
        "experience",
        "level",
        "epoch",
        "created_at",
        "last_reborn",
        "reborn_amount",
        "death_date",
        "last_update_by_time_service",
        "is_sleeping",
        "is_dead"
      ]);
      
      // On ne met pas à jour les champs complexes (type, diet, lives)
      const updatesFiltered = { ...updates };
      delete updatesFiltered.type;
      delete updatesFiltered.diet;
      delete updatesFiltered.lives;
      
      const updatesFilteredAny = updatesFiltered as Record<string, any>;
      const toSnakeCase = (str: string): string => str.replace(/([A-Z])/g, '_$1').toLowerCase();
      const mappedUpdates: Record<string, any> = {};
      for (const key in updatesFilteredAny) {
        if (Object.prototype.hasOwnProperty.call(updatesFilteredAny, key) && allowedKeys.has(key)) {
          const snakeKey = toSnakeCase(key);
          mappedUpdates[snakeKey] = updatesFilteredAny[key];
        }
      }
      
      const fields = Object.keys(mappedUpdates).map(key => `${key} = ?`).join(', ');
      const values = Object.values(mappedUpdates);
      const query = `UPDATE dinosaurs SET ${fields} WHERE id = ?`;
      values.push(dinosaurId);
      
      const [result] = await pool.query(query, values);
      const resAny = result as any;
      return resAny.affectedRows > 0;
    } catch (err) {
      console.error('Erreur lors de la mise à jour du dinosaure:', err);
      throw err;
    }
  }

  public async updateDinosaurName(userId: number, newName: string): Promise<boolean> {
    try {
      const query = `UPDATE dinosaurs SET name = ? WHERE user_id = ?`;
      const [result] = await pool.query(query, [newName, userId]);
      const resAny = result as any;
      return resAny.affectedRows > 0;
    } catch (err) {
      console.error('Erreur lors de la mise à jour du nom du dinosaure:', err);
      throw err;
    }
  }

  public async getAllDinosaurTypes(): Promise<DinosaurType[]> {
    const [rows] = await pool.query('SELECT * FROM dinosaur_types');
    return (rows as any[]).map(row => ({
      id: row.id,
      name: row.name,
      statModifiers: typeof row.stat_modifiers === 'string'
        ? JSON.parse(row.stat_modifiers)
        : row.stat_modifiers
    }));
  }
  
  public async getAllDinosaurDiets(): Promise<DinosaurDiet[]> {
    const [rows] = await pool.query('SELECT * FROM dinosaur_diets');
    return (rows as any[]).map(row => ({
      id: row.id,
      name: row.name,
      statModifiers: typeof row.stat_modifiers === 'string'
        ? JSON.parse(row.stat_modifiers)
        : row.stat_modifiers
    }));
  }
  
  public async createDinosaur(dinosaur: DatabaseDinosaur): Promise<DatabaseDinosaur | null> {
    const query = `INSERT INTO dinosaurs 
      (name, user_id, diet_id, type_id, energy, food, hunger, karma, experience, level, epoch,
       created_at, last_reborn, death_date, reborn_amount, last_update_by_time_service, is_sleeping, is_dead)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;  

    const values = [
      dinosaur.name,
      dinosaur.userId,
      dinosaur.diet.id,
      dinosaur.type.id,
      dinosaur.energy,
      dinosaur.food,
      dinosaur.hunger,
      dinosaur.karma,
      dinosaur.experience,
      dinosaur.level,
      dinosaur.epoch,
      dinosaur.created_at,
      dinosaur.last_reborn,
      // `death_date` peut être null (pas encore mort) ou une date
      dinosaur.death_date || null,
      dinosaur.reborn_amount,
      dinosaur.last_update_by_time_service,
      dinosaur.is_sleeping,
      dinosaur.is_dead
    ];
  
    const [result] = await pool.query(query, values);
    const resAny = result as any;
    if (resAny.insertId) {
      return this.getDinosaurById(resAny.insertId);
    }
    return null;
  }
}

// Interface décrivant la structure brute retournée par la jointure
interface DatabaseDinosaurDataRow extends RowDataPacket {
  id: number;
  name: string;
  user_id: number;
  diet_id: number;
  type_id: number;
  
  energy: number;
  food: number;
  hunger: number;
  karma: number;
  experience: number;
  level: number;
  epoch: string;
  
  created_at: Date;
  last_reborn: string;
  death_date: string | null;
  reborn_amount: number;
  last_update_by_time_service: string;
  is_sleeping: boolean;
  is_dead: boolean;
  
  type_name: string;
  type_stat_modifiers: string;
  diet_name: string;
  diet_stat_modifiers: string;
}
