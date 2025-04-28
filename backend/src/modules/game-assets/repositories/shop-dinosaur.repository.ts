import pool from '../../../common/database/db';

/**
 * Mini repository dédié aux opérations du dinosaure dans le module Shop.
 * Gère la mise à jour du solde et la gestion des instances d'assets.
 */
export class ShopDinosaurRepository {
  /**
   * Met à jour le solde (money) du dinosaure dans la table `dinosaurs`.
   * @param dinosaurId Identifiant du dinosaure.
   * @param money Nouveau solde.
   */
  public async updateMoney(dinosaurId: number, money: number): Promise<void> {
    const query = 'UPDATE dinosaurs SET money = ? WHERE id = ?';
    await pool.query(query, [money, dinosaurId]);
  }

  /**
   * Met à jour les points de compétence (skill_points) du dinosaure dans la table `dinosaurs`.
   * @param dinosaurId Identifiant du dinosaure.
   * @param skillPoints Nouveau solde de points de compétence.
   */
  public async updateSkillPoints(dinosaurId: number, skillPoints: number): Promise<void> {
    const query = 'UPDATE dinosaurs SET skill_points = ? WHERE id = ?';
    await pool.query(query, [skillPoints, dinosaurId]);
  }
  
/**
 * Met à jour les soul points de l'utilisateur dans la table `user`.
 * @param userId Identifiant de l'utilisateur.
 * @param type Type de soul points ('neutral', 'bright' ou 'dark').
 * @param newPoints Nouveau solde.
 */
public async updateSoulPoints(userId: number, type: 'neutral' | 'bright' | 'dark', newPoints: number): Promise<void> {
  let field = '';
  if (type === 'neutral') {
    field = 'neutral_soul_points';
  } else if (type === 'bright') {
    field = 'bright_soul_points';
  } else if (type === 'dark') {
    field = 'dark_soul_points';
  }
  const query = `UPDATE user SET ${field} = ? WHERE id = ?`;
  await pool.query(query, [newPoints, userId]);
}


  /**
   * Ajoute une instance de compétence (skill) pour le dinosaure dans la table `dinosaur_skills_instance`.
   * @param dinosaurId Identifiant du dinosaure.
   * @param skillId Identifiant de la compétence.
   * @param isActive Pour les skills déclenchables, indique si elles sont actives (sinon, null).
   * @param lastActivatedAt Date de dernière activation (ou null).
   */
  public async addSkillInstance(
    dinosaurId: number,
    skillId: number,
    isActive: boolean | null,
    lastActivatedAt: Date | null
  ): Promise<void> {
    const query = `
      INSERT INTO dinosaur_skills_instance (dinosaur_id, skill_id, is_purchased, is_active, last_activated_at)
      VALUES (?, ?, ?, ?, ?)
    `;
    await pool.query(query, [dinosaurId, skillId, true, isActive, lastActivatedAt]);
  }

  /**
   * Ajoute une instance de Soul Skill pour le dinosaure dans la table `dinosaur_soul_skills_instance`.
   * @param dinosaurId Identifiant du dinosaure.
   * @param soulSkillId Identifiant de la Soul Skill.
   */
  public async addSoulSkillInstance(
    dinosaurId: number,
    soulSkillId: number
  ): Promise<void> {
    const query = `
      INSERT INTO dinosaur_soul_skills_instance (dinosaur_id, soul_skill_id, is_unlocked, purchased_at)
      VALUES (?, ?, ?, ?)
    `;
    await pool.query(query, [dinosaurId, soulSkillId, true, new Date()]);
  }

  /**
   * Insère ou met à jour une instance d'item pour le dinosaure dans la table `dinosaur_items_instance`.
   * Pour les consommables, la quantité est incrémentée.
   * @param dinosaurId Identifiant du dinosaure.
   * @param itemId Identifiant de l'item.
   * @param quantity Quantité à ajouter.
   * @param isEquipped Indique si l'item est équipé.
   */
    public async addOrUpdateItemInstance(
      dinosaurId: number,
      itemId: number,
      quantity: number,
      isEquipped: boolean
    ): Promise<void> {
      const query = `
        INSERT INTO dinosaur_items_instance (dinosaur_id, item_id, current_level_or_quantity, is_equipped)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE current_level_or_quantity = current_level_or_quantity + ?
      `;
      await pool.query(query, [dinosaurId, itemId, quantity, isEquipped, quantity]);
    }
  

  /**
   * Met à jour le niveau (ou quantité) d'un item persistant dans la table `dinosaur_items_instance`.
   * @param dinosaurId Identifiant du dinosaure.
   * @param itemId Identifiant de l'item.
   * @param newLevel Nouveau niveau ou quantité.
   */
  public async updateItemInstanceLevel(
    dinosaurId: number,
    itemId: number,
    newLevel: number
  ): Promise<void> {
    const query = `
      UPDATE dinosaur_items_instance
      SET current_level_or_quantity = ?
      WHERE dinosaur_id = ? AND item_id = ?
    `;
    await pool.query(query, [newLevel, dinosaurId, itemId]);
  }

  /**
   * Ajoute une instance de bâtiment pour le dinosaure dans la table `dinosaur_buildings_instance`.
   * @param dinosaurId Identifiant du dinosaure.
   * @param buildingId Identifiant du bâtiment.
   * @param currentLevel Niveau initial du bâtiment (souvent 1).
   * @param purchasedUpgrades Mapping JSON des upgrades achetés.
   */
  public async addBuildingInstance(
    dinosaurId: number,
    buildingId: number,
    currentLevel: number,
    purchasedUpgrades: object
  ): Promise<void> {
    const query = `
      INSERT INTO dinosaur_buildings_instance (dinosaur_id, building_id, current_level, purchased_upgrades)
      VALUES (?, ?, ?, ?)
    `;
    await pool.query(query, [dinosaurId, buildingId, currentLevel, JSON.stringify(purchasedUpgrades)]);
  }

  /**
   * Met à jour une instance de bâtiment pour le dinosaure dans la table `dinosaur_buildings_instance`.
   * @param dinosaurId Identifiant du dinosaure.
   * @param buildingId Identifiant du bâtiment.
   * @param currentLevel Nouveau niveau du bâtiment.
   * @param purchasedUpgrades Nouveau mapping des upgrades achetés.
   */
  public async updateBuildingInstance(
    dinosaurId: number,
    buildingId: number,
    currentLevel: number,
    purchasedUpgrades: object
  ): Promise<void> {
    const query = `
      UPDATE dinosaur_buildings_instance
      SET current_level = ?, purchased_upgrades = ?
      WHERE dinosaur_id = ? AND building_id = ?
    `;
    await pool.query(query, [currentLevel, typeof purchasedUpgrades === 'string' ? JSON.parse(purchasedUpgrades) : JSON.stringify(purchasedUpgrades), dinosaurId, buildingId]);
  }
}
