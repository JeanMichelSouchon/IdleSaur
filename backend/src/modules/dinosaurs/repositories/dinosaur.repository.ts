import { DatabaseDinosaur } from '../models/database-dinosaur.interface';
import pool from '../../../common/database/db';
import { RowDataPacket } from 'mysql2';
import { Epoch } from '../models/epoch.enum';
import { DinosaurType } from '../models/dinosaur-type.interface';
import { DinosaurDiet } from '../models/dinosaur-diet.interface';
import { DINOSAUR_CONSTANTS } from '../../../common/config/dinosaur.constants';

/**
 * Repository pour gérer les opérations sur la table des dinosaures.
 * Les requêtes effectuent une jointure avec les tables dinosaur_types et dinosaur_diets
 * afin d'obtenir les objets complets (incluant leurs modificateurs en JSON).
 */
export class DinosaurRepository {
  public async getDinosaurById(dinosaurId: number): Promise<DatabaseDinosaur | null> {
    try {
      const [results] = await pool.query<(DatabaseDinosaurDataRow & RowDataPacket)[]>(
        `SELECT d.*, 
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
      
      // Parser les modificateurs stockés en JSON
      const typeModifiers = JSON.parse(row.type_stat_modifiers) as any[];
      const dietModifiers = JSON.parse(row.diet_stat_modifiers) as any[];
      
      // Construire l'objet DatabaseDinosaur en complétant les constantes
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
        //experience: row.experience,
        experience: 100000000000,
        level: row.level,
        money: row.money,
        skill_points: row.skill_points,
        epoch: row.epoch as Epoch,
        // Compléter les valeurs de base à partir des constantes (non stockées en DB)
        base_max_energy: DINOSAUR_CONSTANTS.BASE_MAX_ENERGY,
        energy_decay_per_second: DINOSAUR_CONSTANTS.ENERGY_DECAY_PER_SECOND,
        energy_recovery_per_second: DINOSAUR_CONSTANTS.ENERGY_RECOVERY_PER_SECOND,
        base_max_food: DINOSAUR_CONSTANTS.BASE_MAX_FOOD,
        base_max_hunger: DINOSAUR_CONSTANTS.BASE_MAX_HUNGER, // Assurez-vous que le nom correspond à votre configuration
        hunger_increase_per_second: DINOSAUR_CONSTANTS.HUNGER_INCREASE_PER_SECOND,
        hunger_increase_per_second_when_recovery: DINOSAUR_CONSTANTS.HUNGER_INCREASE_PER_SECOND_WHEN_RECOVERY,
        karma_width: DINOSAUR_CONSTANTS.KARMA_WIDTH,
        created_at: row.created_at,
        last_reborn: new Date(row.last_reborn),
        reborn_amount: row.reborn_amount,
        last_update_by_time_service: new Date(row.last_update_by_time_service),
        is_sleeping: row.is_sleeping,
        is_dead: row.is_dead
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
      const typeModifiers = JSON.parse(row.type_stat_modifiers) as any[];
      const dietModifiers = JSON.parse(row.diet_stat_modifiers) as any[];
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
        money: row.money,
        skill_points: row.skill_points,
        epoch: row.epoch as Epoch,
        base_max_energy: DINOSAUR_CONSTANTS.BASE_MAX_ENERGY,
        energy_decay_per_second: DINOSAUR_CONSTANTS.ENERGY_DECAY_PER_SECOND,
        energy_recovery_per_second: DINOSAUR_CONSTANTS.ENERGY_RECOVERY_PER_SECOND,
        base_max_food: DINOSAUR_CONSTANTS.BASE_MAX_FOOD,
        base_max_hunger: DINOSAUR_CONSTANTS.BASE_MAX_HUNGER,
        hunger_increase_per_second: DINOSAUR_CONSTANTS.HUNGER_INCREASE_PER_SECOND,
        hunger_increase_per_second_when_recovery: DINOSAUR_CONSTANTS.HUNGER_INCREASE_PER_SECOND_WHEN_RECOVERY,
        karma_width: DINOSAUR_CONSTANTS.KARMA_WIDTH,
        created_at: row.created_at,
        last_reborn: new Date(row.last_reborn),
        reborn_amount: row.reborn_amount,
        last_update_by_time_service: new Date(row.last_update_by_time_service),
        is_sleeping: row.is_sleeping,
        is_dead: row.is_dead
      };
      return dinosaur;
    } catch (err) {
      console.error('Erreur lors de la récupération du dinosaure par userId:', err);
      throw err;
    }
  }
  
  public async updateDinosaur(dinosaurId: number, updates: Partial<DatabaseDinosaur>): Promise<boolean> {
    try {
      // Liste des clés autorisées (ce sont celles qui existent dans la table "dinosaurs")
      // Devrait etre remplacé par l'utilisation de class-transformer pour plus de simplicité.
      // Travail a faire !!!!
      const allowedKeys = new Set([
        "name",
        "userId",
        "energy",
        "food",
        "hunger",
        "karma",
        "experience",
        "level",
        "money",
        "skill_points",
        "epoch",
        "created_at",
        "last_reborn",
        "reborn_amount",
        "last_update_by_time_service",
        "is_sleeping",
        "is_dead"
      ]);
      
      // On copie l'objet updates et on retire les propriétés complexes qui ne seront pas mises à jour ici
      const updatesFiltered = { ...updates };
      delete updatesFiltered.type;
      delete updatesFiltered.diet;
      
      // Pour forcer l'accès aux clés non déclarées, on cast en Record<string, any>
      const updatesFilteredAny = updatesFiltered as Record<string, any>;
      
      // Construire un nouvel objet qui ne contient que les clés autorisées, avec leurs clés converties en snake_case.
      const toSnakeCase = (str: string): string => {
        return str.replace(/([A-Z])/g, '_$1').toLowerCase();
      };
      
      const mappedUpdates: Record<string, any> = {};
      for (const key in updatesFilteredAny) {
        if (Object.prototype.hasOwnProperty.call(updatesFilteredAny, key) && allowedKeys.has(key)) {
          const snakeKey = toSnakeCase(key);
          mappedUpdates[snakeKey] = updatesFilteredAny[key];
        }
      }
      
      // Construction de la requête UPDATE
      const fields = Object.keys(mappedUpdates)
        .map(key => `${key} = ?`)
        .join(', ');
      const values = Object.values(mappedUpdates);
      const query = `UPDATE dinosaurs SET ${fields} WHERE id = ?`;
      values.push(dinosaurId);
      
      const [result] = await pool.query(query, values);
      const res = result as any;
      return res.affectedRows > 0;
    } catch (err) {
      console.error('Erreur lors de la mise à jour du dinosaure:', err);
      throw err;
    }
  }  
    
  public async updateDinosaurName(userId: number, newName: string): Promise<boolean> {
    try {
      const query = `UPDATE dinosaurs SET name = ? WHERE user_id = ?`;
      const [result] = await pool.query(query, [newName, userId]);
      const res = result as any;
      return res.affectedRows > 0;
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
      statModifiers: JSON.parse(row.stat_modifiers)
    }));
  }
  
  public async getAllDinosaurDiets(): Promise<DinosaurDiet[]> {
    const [rows] = await pool.query('SELECT * FROM dinosaur_diets');
    return (rows as any[]).map(row => ({
      id: row.id,
      name: row.name,
      statModifiers: JSON.parse(row.stat_modifiers)
    }));
  }
  
  public async createDinosaur(dinosaur: DatabaseDinosaur): Promise<DatabaseDinosaur | null> {
    const query = `INSERT INTO dinosaurs 
      (name, user_id, diet_id, type_id, energy, food, hunger, karma, experience, level, money, skill_points, epoch,
       created_at, last_reborn, reborn_amount, last_update_by_time_service, is_sleeping, is_dead)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
              ?, ?, ?, ?, ?, ?)`;
  
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
      dinosaur.money,
      dinosaur.skill_points,
      dinosaur.epoch,
      dinosaur.created_at,
      dinosaur.last_reborn,
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
  money: number;
  skill_points: number;
  epoch: string;
  
  created_at: Date;
  last_reborn: string;
  reborn_amount: number;
  last_update_by_time_service: string;
  is_sleeping: boolean;
  is_dead: boolean;
  
  type_name: string;
  type_stat_modifiers: string;
  diet_name: string;
  diet_stat_modifiers: string;
}
