import pool from '../../../common/database/db';

export class FakePopulationRepository {
  /**
   * Insère un faux utilisateur dans la table `user`.
   */
  public async createFakeUser(user: {
    username: string;
    email: string;
    passwordHash: string;
    isAdmin?: boolean;
  }): Promise<number> {
    const query = `
      INSERT INTO user (username, email, password_hash, isAdmin)
      VALUES (?, ?, ?, ?)
    `;
    const values = [
      user.username,
      user.email,
      user.passwordHash,
      user.isAdmin ? 1 : 0
    ];
    const [result] = await pool.query(query, values);
    const resAny = result as any;
    return resAny.insertId;
  }

  /**
   * Recherche un utilisateur par son pseudo.
   * Retourne son identifiant s'il existe, sinon null.
   */
  public async getUserByUsername(username: string): Promise<number | null> {
    const query = `SELECT id FROM user WHERE username = ? LIMIT 1`;
    const [rows] = await pool.query(query, [username]) as any;
    if (rows.length > 0) {
      return rows[0].id;
    }
    return null;
  }

  /**
   * Insère un faux dinosaure dans la table `dinosaurs`.
   */
  public async createFakeDinosaur(dino: {
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
    created_at: string;
    last_reborn: string;
    reborn_amount: number;
    last_update_by_time_service: string;
    is_sleeping: boolean;
    is_dead: boolean;
  }): Promise<number> {
    const query = `
      INSERT INTO dinosaurs
      (name, user_id, diet_id, type_id, energy, food, karma, experience, level, epoch, created_at, last_reborn, reborn_amount, last_update_by_time_service, is_sleeping, is_dead)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      dino.name,
      dino.user_id,
      dino.diet_id,
      dino.type_id,
      dino.energy,
      dino.food,
      dino.hunger,
      dino.karma,
      dino.experience,
      dino.level,
      dino.epoch,
      dino.created_at,
      dino.last_reborn,
      dino.reborn_amount,
      dino.last_update_by_time_service,
      dino.is_sleeping ? 1 : 0,
      dino.is_dead ? 1 : 0
    ];
    const [result] = await pool.query(query, values);
    const resAny = result as any;
    return resAny.insertId;
  }

  /**
   * Insère une vie dans la table `dinosaur_lives`.
   */
  public async createFakeDinosaurLife(life: {
    dinosaur_id: number;
    name: string;
    experience: number;
    karma: number;
    level: number;
    birth_date: string;
    death_date: string;
    soul_points: number;
    dark_soul_points: number;
    bright_soul_points: number;
  }): Promise<number> {
    const query = `
      INSERT INTO dinosaur_lives
      (dinosaur_id, name, experience, karma, level, birth_date, death_date, soul_points, dark_soul_points, bright_soul_points)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      life.dinosaur_id,
      life.name,
      life.experience,
      life.karma,
      life.level,
      life.birth_date,
      life.death_date,
      life.soul_points,
      life.dark_soul_points,
      life.bright_soul_points
    ];
    const [result] = await pool.query(query, values);
    const resAny = result as any;
    return resAny.insertId;
  }

}
