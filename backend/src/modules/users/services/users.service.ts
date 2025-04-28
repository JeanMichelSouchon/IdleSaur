import pool from '../../../common/database/db';
import { User } from '../models/user.interface';
import { PlayerScoreRepository } from '../repositories/player-score.repository';

/**
 * Service de gestion des utilisateurs.
 */
export class UsersService {
  private scoreRepo: PlayerScoreRepository;

  constructor(playerScoreRepo: PlayerScoreRepository) {
    this.scoreRepo = playerScoreRepo;
  }

  /**
   * Récupère tous les utilisateurs.
   * Avant de renvoyer les utilisateurs, on met à jour leur score.
   * @returns {Promise<User[]>} Liste de tous les utilisateurs.
   */
  public async getAllUsers(): Promise<User[]> {
    try {
      // Récupérer tous les ID d'utilisateurs
      const [idsResults] = await pool.query('SELECT id FROM user');
      const usersIds = (idsResults as { id: number }[]).map(u => u.id);

      // Recalculer et sauvegarder le score pour chaque utilisateur via le repository dédié
      await Promise.all(usersIds.map(id => this.scoreRepo.recalculateAndSaveUserScore(id)));

      // Maintenant récupérer l'ensemble des utilisateurs avec les scores actualisés
      const [results] = await pool.query('SELECT * FROM user');
      return results as User[];
    } catch (err) {
      console.error('Erreur lors de la récupération des utilisateurs:', err);
      throw err;
    }
  }

  /**
   * Récupère un utilisateur par son identifiant.
   * Avant de renvoyer l'utilisateur, on met à jour son score.
   * @param userId L'identifiant de l'utilisateur.
   * @returns {Promise<User | null>} L'utilisateur trouvé ou null si non existant.
   */
  public async getUserById(userId: number): Promise<User | null> {
    try {
      // Recalculer le score pour cet utilisateur
      await this.scoreRepo.recalculateAndSaveUserScore(userId);

      // Récupérer l'utilisateur actualisé
      const [results] = await pool.query('SELECT * FROM user WHERE id = ?', [userId]);
      const users = results as User[];
      return users.length > 0 ? users[0] : null;
    } catch (err) {
      console.error('Erreur lors de la récupération de l\'utilisateur par ID:', err);
      throw err;
    }
  }

  /**
   * Récupère un utilisateur par son email.
   * @param email L'email de l'utilisateur.
   * @returns {Promise<User | null>} L'utilisateur trouvé ou null si non existant.
   */
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

  /**
   * Crée un nouvel utilisateur en base et retourne son identifiant.
   * Si l'utilisateur est administrateur, il reçoit 10000 points pour chaque type
   * (neutral, dark et bright), sinon les points sont initialisés à 0.
   *
   * @param username Le pseudo de l'utilisateur.
   * @param email L'email de l'utilisateur.
   * @param passwordHash Le mot de passe hashé.
   * @param isAdmin Indique si l'utilisateur est administrateur.
   * @returns {Promise<number>} L'identifiant de l'utilisateur créé.
   */
  public async createUser(
    username: string,
    email: string,
    passwordHash: string,
    isAdmin: boolean = false
  ): Promise<number> {
    try {
      // Si le pseudo est "admin", on force le flag admin
      if (username === 'admin') {
        isAdmin = true;
      }

      // Définition des points en fonction du rôle admin
      const neutralSoulPoints = isAdmin ? 10000 : 0;
      const darkSoulPoints = isAdmin ? 10000 : 0;
      const brightSoulPoints = isAdmin ? 10000 : 0;

      // Construction d'un player_score initial
      const initialPlayerScore = {
        totalSoulPoints: 0,
        totalDarkSoulPoints: 0,
        totalBrightSoulPoints: 0,
        totalLives: 0,
        totalKarma: 0,
        latestKarma: 0,
        maxKarma: 0,
        minKarma: 0,
        averageKarma: 0,
        negativeLivesCount: 0,
        positiveLivesCount: 0,
        totalLifetime: 0,
        maxLifetime: 0,
        totalLevels: 0,
        maxLevel: 0,
        totalExperience: 0,
        maxExperience: 0
      };

      const query = `
        INSERT INTO user (
          username, email, password_hash, isAdmin,
          neutral_soul_points, dark_soul_points, bright_soul_points,
          player_score
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const [result] = await pool.query(query, [
        username,
        email,
        passwordHash,
        isAdmin,
        neutralSoulPoints,
        darkSoulPoints,
        brightSoulPoints,
        JSON.stringify(initialPlayerScore)
      ]);
      const res = result as any;
      return res.insertId;
    } catch (err) {
      console.error('Erreur lors de la création de l\'utilisateur:', err);
      throw err;
    }
  }

  /**
   * Vérifie si un pseudo est déjà utilisé.
   * @param username Le pseudo à vérifier.
   * @returns {Promise<boolean>} True si le pseudo est déjà pris, sinon false.
   */
  public async isUsernameTaken(username: string): Promise<boolean> {
    try {
      const [results] = await pool.query('SELECT id FROM user WHERE username = ?', [username]);
      const users = results as User[];
      return users.length > 0;
    } catch (err) {
      console.error('Erreur lors de la vérification de l\'unicité du nom d\'utilisateur:', err);
      throw err;
    }
  }

  /**
   * Met à jour le pseudo d'un utilisateur.
   * @param userId L'identifiant de l'utilisateur.
   * @param newUsername Le nouveau pseudo.
   * @returns {Promise<boolean>} True si la mise à jour a réussi, sinon false.
   */
  public async updateUsername(userId: number, newUsername: string): Promise<boolean> {
    try {
      const query = 'UPDATE user SET username = ? WHERE id = ?';
      const [result] = await pool.query(query, [newUsername, userId]);
      const res = result as any;
      return res.affectedRows > 0;
    } catch (err) {
      console.error('Erreur lors de la mise à jour du nom d\'utilisateur:', err);
      throw err;
    }
  }
}
