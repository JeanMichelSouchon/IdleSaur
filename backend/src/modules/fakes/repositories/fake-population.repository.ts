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
    weapons: number;
    armors: number;
    friends: number;
    employees: number;
    karma: number;
    experience: number;
    level: number;
    money: number;
    skill_points: number;
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
      (name, user_id, diet_id, type_id, energy, food, hunger, weapons, armors, friends, employees, karma, experience, level, money, skill_points, epoch, created_at, last_reborn, reborn_amount, last_update_by_time_service, is_sleeping, is_dead)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      dino.name,
      dino.user_id,
      dino.diet_id,
      dino.type_id,
      dino.energy,
      dino.food,
      dino.hunger,
      dino.weapons,
      dino.armors,
      dino.friends,
      dino.employees,
      dino.karma,
      dino.experience,
      dino.level,
      dino.money,
      dino.skill_points,
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

  /**
   * Insère une instance de skill pour un dinosaure dans la table `dinosaur_skills_instance`.
   */
  public async createFakeSkillInstance(instance: {
    dinosaur_id: number;
    skill_id: number;
    is_purchased: boolean;
    is_active?: boolean;
    last_activated_at?: string;
  }): Promise<void> {
    const query = `
      INSERT INTO dinosaur_skills_instance
      (dinosaur_id, skill_id, is_purchased, is_active, last_activated_at)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
      instance.dinosaur_id,
      instance.skill_id,
      instance.is_purchased ? 1 : 0,
      instance.is_active ? 1 : 0,
      instance.last_activated_at || null
    ];
    await pool.query(query, values);
  }

  /**
   * Insère une instance d'item pour un dinosaure dans la table `dinosaur_items_instance`.
   */
  public async createFakeItemInstance(instance: {
    dinosaur_id: number;
    item_id: number;
    current_level_or_quantity: number;
    is_equipped?: boolean;
  }): Promise<void> {
    const query = `
      INSERT INTO dinosaur_items_instance
      (dinosaur_id, item_id, current_level_or_quantity, is_equipped)
      VALUES (?, ?, ?, ?)
    `;
    const values = [
      instance.dinosaur_id,
      instance.item_id,
      instance.current_level_or_quantity,
      instance.is_equipped ? 1 : 0
    ];
    await pool.query(query, values);
  }

  /**
   * Insère une instance de building pour un dinosaure dans la table `dinosaur_buildings_instance`.
   */
  public async createFakeBuildingInstance(instance: {
    dinosaur_id: number;
    building_id: number;
    current_level: number;
    purchased_upgrades?: object;
  }): Promise<void> {
    const query = `
      INSERT INTO dinosaur_buildings_instance
      (dinosaur_id, building_id, current_level, purchased_upgrades)
      VALUES (?, ?, ?, ?)
    `;
    const values = [
      instance.dinosaur_id,
      instance.building_id,
      instance.current_level,
      JSON.stringify(instance.purchased_upgrades || {})
    ];
    await pool.query(query, values);
  }

  /**
   * Insère une instance de soul skill pour un dinosaure dans la table `dinosaur_soul_skills_instance`.
   */
  public async createFakeSoulSkillInstance(instance: {
    dinosaur_id: number;
    soul_skill_id: number;
    is_unlocked?: boolean;
    purchased_at?: string;
  }): Promise<void> {
    const query = `
      INSERT INTO dinosaur_soul_skills_instance
      (dinosaur_id, soul_skill_id, is_unlocked, purchased_at)
      VALUES (?, ?, ?, ?)
    `;
    const values = [
      instance.dinosaur_id,
      instance.soul_skill_id,
      instance.is_unlocked ? 1 : 0,
      instance.purchased_at || null
    ];
    await pool.query(query, values);
  }
}
