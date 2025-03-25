import pool from '../../../common/database/db';
import { FrontendDinosaurDTO } from '../../dinosaurs/models/frontend-dinosaur.dto';
import { User } from '../../users/models/user.interface';

export class AdminService {

  // -------- FONCTIONS RELATIVES AUX UTILISATEURS -------- //

  // Récupérer les utilisateurs créés lors des X dernières semaines
  public async getUsersCreatedLastWeeks(weeks: number = 2): Promise<User[]> {
    try {
      const [results] = await pool.query('SELECT * FROM user WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? WEEK)', [weeks]);
      return results as User[];
    } catch (err) {
      console.error('Erreur lors de la récupération des utilisateurs créés lors des X dernières semaines:', err);
      throw err;
    }
  }
  

  // Récupérer tous les utilisateurs
  public async getAllUsers(): Promise<User[]> {
    try {
      const [results] = await pool.query('SELECT * FROM user');
      return results as User[];
    } catch (err) {
      console.error('Erreur lors de la récupération des utilisateurs:', err);
      throw err;
    }
  }

  // Récupérer un utilisateur par ID
  public async getUserById(userId: number): Promise<User | null> {
    try {
      const [results] = await pool.query('SELECT * FROM user WHERE id = ?', [userId]);
      const users = results as User[];
      return users.length > 0 ? users[0] : null;
    } catch (err) {
      console.error('Erreur lors de la récupération de l\'utilisateur par ID:', err);
      throw err;
    }
  }

  // Récupérer un utilisateur par email
  public async getUserByEmail(email: string): Promise<User | null> {
    try {
      const [results] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);
      const users = results as User[];
      return users.length > 0 ? users[0] : null;
    } catch (err) {
      console.error('Erreur lors de la récupération de l\'utilisateur par email:', err);
      throw err;
    }
  }

  // Récupérer un utilisateur par username
  public async getUserByUsername(username: string): Promise<User | null> {
    try {
      const [results] = await pool.query('SELECT * FROM user WHERE username = ?', [username]);
      const users = results as User[];
      return users.length > 0 ? users[0] : null;
    } catch (err) {
      console.error('Erreur lors de la récupération de l\'utilisateur par username:', err);
      throw err;
    }
  }

  // Supprimer un utilisateur par ID
  public async deleteUser(userId: number): Promise<boolean> {
    try {
      const [result] = await pool.query('DELETE FROM user WHERE id = ?', [userId]);
      const res = result as any;
      return res.affectedRows > 0;
    } catch (err) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', err);
      throw err;
    }
  }

  // -------- FONCTIONS RELATIVES AUX DINOSAURES -------- //

  // Récupérer tous les dinosaures
  public async getAllDinosaurs(): Promise<FrontendDinosaurDTO[]> {
    try {
      const [results] = await pool.query('SELECT * FROM dinosaur');
      return results as FrontendDinosaurDTO[];
    } catch (err) {
      console.error('Erreur lors de la récupération des dinosaures:', err);
      throw err;
    }
  }

  // Récupérer un dinosaure par ID
  public async getDinosaurById(dinosaurId: number): Promise<FrontendDinosaurDTO | null> {
    try {
      const [results] = await pool.query('SELECT * FROM dinosaur WHERE id = ?', [dinosaurId]);
      const dinosaurs = results as FrontendDinosaurDTO[];
      return dinosaurs.length > 0 ? dinosaurs[0] : null;
    } catch (err) {
      console.error('Erreur lors de la récupération du dinosaure par ID:', err);
      throw err;
    }
  }

  // Créer un dinosaure
  public async createDinosaur(
    name: string,
    userId: number,
    diet: string,
    energy: number = 10000,
    food: number = 10000,
    experience: number = 0,
    epoch: string = 'past',
    max_energy: number = 10000,
    max_food: number = 10000
  ): Promise<number> {
    try {
      const query = 'INSERT INTO dinosaur (name, user_id, diet, energy, food, max_energy, max_food, experience, epoch) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
      const [result] = await pool.query(query, [name, userId, diet, energy, food, max_energy, max_food, experience, epoch]);
      const res = result as any;
      return res.insertId;
    } catch (err) {
      console.error('Erreur lors de la création du dinosaure:', err);
      throw err;
    }
  }

  // Mettre à jour un dinosaure par ID
  public async updateDinosaurById(dinosaurId: number, updates: Partial<FrontendDinosaurDTO>): Promise<boolean> {
    try {
      const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
      const values = Object.values(updates);
      const query = `UPDATE dinosaur SET ${fields} WHERE id = ?`;
      values.push(dinosaurId);

      const [result] = await pool.query(query, values);
      const res = result as any;
      return res.affectedRows > 0;
    } catch (err) {
      console.error('Erreur lors de la mise à jour du dinosaure:', err);
      throw err;
    }
  }

  // Supprimer un dinosaure par ID
  public async deleteDinosaurById(dinosaurId: number): Promise<boolean> {
    try {
      const [result] = await pool.query('DELETE FROM dinosaur WHERE id = ?', [dinosaurId]);
      const res = result as any;
      return res.affectedRows > 0;
    } catch (err) {
      console.error('Erreur lors de la suppression du dinosaure:', err);
      throw err;
    }
  }
}

