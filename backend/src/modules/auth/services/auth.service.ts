import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pool from '../../../common/database/db';
import { User } from '../../users/models/user.interface';

dotenv.config();

export class AuthService {

  /**
   * Popule l'administrateur par défaut si celui-ci n'existe pas.
   * Récupère les identifiants depuis les variables d'environnement,
   * génère un email au format `${adminName}@game.fr` et crée l'utilisateur admin.
   */
  public async populateDefaultAdmins(): Promise<void> {
    try {
      const adminName = process.env.DEFAULT_ADMIN_NAME;
      const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD;
      if (!adminName || !adminPassword) {
        console.error('Les variables d\'environnement pour l\'admin ne sont pas définies.');
        return;
      }
      const adminEmail = `${adminName}@game.fr`.toLowerCase();

      // Vérifier si l'admin existe déjà
      const existingAdmin = await this.findUserByEmail(adminEmail);
      if (existingAdmin) {
        console.log('L\'admin existe déjà, aucun peuplement nécessaire.');
        return;
      }

      // Hacher le mot de passe
      const passwordHash = await this.hashPassword(adminPassword);

      // Créer l'admin en utilisant la fonction habituelle
      const adminId = await this.createUser(adminName, adminEmail, passwordHash, true);
      console.log(`Admin créé avec succès, id : ${adminId}`);
    } catch (error) {
      console.error('Erreur lors du peuplement de l\'admin :', error);
      throw error;
    }
  }

  /**
   * Crée un nouvel utilisateur en base et retourne son ID.
   * @param username Le pseudo de l'utilisateur.
   * @param email L'email de l'utilisateur.
   * @param passwordHash Le mot de passe hashé.
   * @param isAdmin Indique si l'utilisateur est administrateur.
   */
  private async createUser(username: string, email: string, passwordHash: string, isAdmin: boolean = false): Promise<number> {
    try {
      const neutralSoulPoints = isAdmin ? 10000 : 0;
      const darkSoulPoints = isAdmin ? 10000 : 0;
      const brightSoulPoints = isAdmin ? 10000 : 0;
  
      const query = `
        INSERT INTO user (
          username, email, password_hash, isAdmin,
          neutral_soul_points, dark_soul_points, bright_soul_points
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      const [result] = await pool.query(query, [
        username,
        email,
        passwordHash,
        isAdmin,
        neutralSoulPoints,
        darkSoulPoints,
        brightSoulPoints,
      ]);
      return (result as any).insertId;
    } catch (err) {
      console.error("Erreur lors de la création de l'utilisateur:", err);
      throw err;
    }
  }

  /**
   * Update user last connexion timestamp
   * @param userId
   */
  private async updateUserLastConnexion(userId: number): Promise<boolean> {
    try {
      const query = 'UPDATE user SET last_connexion = NOW() WHERE id = ?';
      const [result] = await pool.query(query, [userId]);
      const resAny = result as any;
      return resAny.affectedRows > 0;
    }
    catch (err) {
      console.error('Erreur lors de la mise à jour de la date de connexion de l\'utilisateur:', err);
      throw err;
    }
  }

  /**
   * Récupère un utilisateur par son ID.
   */
  private async findUserById(userId: number): Promise<User | null> {
    try {
      const [results] = await pool.query('SELECT * FROM user WHERE id = ?', [userId]);
      const users = results as User[];
      return users.length > 0 ? users[0] : null;
    } catch (err) {
      console.error('Erreur lors de la récupération de l\'utilisateur par ID:', err);
      throw err;
    }
  }

  /**
   * Récupère un utilisateur par email.
   */
  private async findUserByEmail(email: string): Promise<User | null> {
    try {
      const [results] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);
      const users = results as User[];
      return users.length > 0 ? users[0] : null;
    } catch (err) {
      console.error('Erreur lors de la récupération de l\'utilisateur par email:', err);
      throw err;
    }
  }

  /**
   * Retourne un utilisateur trouvé par pseudo.
   */
  private async findUserByUsername(username: string): Promise<User | null> {
    try {
      const [results] = await pool.query('SELECT * FROM user WHERE username = ?', [username]);
      const users = results as User[];
      return users.length > 0 ? users[0] : null;
    } catch (err) {
      console.error('Erreur lors de la récupération de l\'utilisateur par username:', err);
      throw err;
    }
  }

  /**
   * Hash le mot de passe.
   */
  private async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, 10);
    } catch (error) {
      console.error('Erreur lors du hashage du mot de passe:', error);
      throw new Error('Erreur interne du serveur');
    }
  }

  /**
   * Compare un mot de passe en clair avec son hash.
   */
  private async checkPassword(password: string, hash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      console.error('Erreur lors de la vérification du mot de passe:', error);
      throw new Error('Erreur interne du serveur');
    }
  }

  /**
   * Génère un token JWT pour un utilisateur.
   */
  private generateToken(user: User): string {
    try {
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET est manquant dans les variables d\'environnement');
      }
      return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    } catch (error) {
      console.error('Erreur lors de la génération du token JWT:', error);
      throw new Error('Erreur interne du serveur');
    }
  }

  /**
   * Vérifie un token JWT et retourne l'utilisateur associé.
   */
  public async verifyToken(token: string): Promise<User> {
    try {
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET est manquant dans les variables d\'environnement');
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: number };
      const user = await this.findUserById(decoded.id);
      if (!user) {
        throw new Error('Utilisateur non trouvé ou supprimé');
      }
      return user;
    } catch (error) {
      console.error('Erreur lors de la vérification du token JWT:', error);
      throw new Error('Token invalide, expiré ou utilisateur non trouvé');
    }
  }

  /**
   * Inscription d'un nouvel utilisateur.
   * Remarque : La création du dinosaure associé est supprimée,
   * car celui-ci sera créé lors de la première requête GET via le middleware.
   */
  public async signup(username: string, email: string, password: string): Promise<User> {
    try {
      // Vérifier si l'email est déjà utilisé
      const existingEmailUser = await this.findUserByEmail(email);
      if (existingEmailUser) {
        throw new Error('Email déjà utilisé');
      }

      // Vérifier si le pseudo est déjà utilisé
      const existingUser = await this.findUserByUsername(username);
      if (existingUser) {
        throw new Error('Pseudo déjà utilisé');
      }

      // Hash du mot de passe
      const passwordHash = await this.hashPassword(password);

      // Créer le nouvel utilisateur
      const userId = await this.createUser(username, email, passwordHash);
      const newUser = await this.findUserById(userId);
      if (!newUser) {
        throw new Error('Erreur lors de la création de l\'utilisateur');
      }
      return newUser;
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      throw error;
    }
  }

  /**
   * Connexion de l'utilisateur.
   */
  public async login(identifier: string, password: string): Promise<{ token: string; user: User }> {
    try {

      // Verificati basique a amméliorer (pseudo ou mdp ?)
      const user = identifier.includes('@')
        ? await this.findUserByEmail(identifier)
        : await this.findUserByUsername(identifier);
      if (!user) {
        throw new Error('Utilisateur non trouvé');
      }
      const passwordValid = await this.checkPassword(password, user.password_hash);
      if (!passwordValid) {
        throw new Error('Identifiants invalides');
      }
      const token = this.generateToken(user);
      await this.updateUserLastConnexion(user.id);
      return { token, user };
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      throw error;
    }
  }

  /**
   * Réinitialise le mot de passe d'un utilisateur.
   */
  public async resetPassword(email: string, currentPassword: string, newPassword: string): Promise<boolean> {
    try {
      const user = await this.findUserByEmail(email);
      if (!user) {
        throw new Error('Utilisateur non trouvé');
      }
      // Vérifier le mot de passe actuel
      const isCurrentPasswordValid = await this.checkPassword(currentPassword, user.password_hash);
      if (!isCurrentPasswordValid) {
        throw new Error('Mot de passe actuel incorrect');
      }
      // Hash le nouveau mot de passe
      const newPasswordHash = await this.hashPassword(newPassword);
      const [result] = await pool.query('UPDATE user SET password_hash = ? WHERE id = ?', [newPasswordHash, user.id]);
      const resAny = result as any;
      return resAny.affectedRows > 0;
    } catch (error) {
      console.error('Erreur lors de la réinitialisation du mot de passe:', error);
      throw error;
    }
  }
}
