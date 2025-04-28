import pool from '../../../common/database/db';
import { RowDataPacket } from 'mysql2';
import { DinosaurAction } from '../models/dinosaur-action.enum';
import { DynamicEventData } from '../models/dynamic-event-data.interface';
import { DynamicEventsMap } from '../libs/dynamic-events.mapping';
import { init } from '@sentry/node';

/**
 * Interface décrivant une ligne de la table `dynamic_events` telle que retournée par MySQL.
 */
interface DatabaseDynamicEventRow extends RowDataPacket {
  id: number;
  name: string;
  action_type: string;
  min_level: number;
  weight: number;
  positivity_score: number;
  descriptions: string;    // JSON : tableau de string
  base_modifiers: string;    // JSON : tableau de DynamicEventModifier
}

export class DynamicEventRepository {

  public init: boolean = false;

  constructor() {
  }

  /**
   * Vérifie si la table dynamic_events est vide et, le cas échéant,
   * insère les DynamicEvents de base définis dans DinosaurDynamicEventsMap.
   */
  public async seedDynamicEventsIfEmpty(): Promise<void> {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(`SELECT COUNT(*) AS count FROM dynamic_events`);
      const count = rows[0].count;
      if (count > 0) {
        this.init = true;
        console.log('La table dynamic_events est déjà peuplée.');
        return;
      }
      
      // Parcourir le mapping fourni
      for (const actionKey in DynamicEventsMap) {
        const action = actionKey as DinosaurAction;
        const events: DynamicEventData[] = DynamicEventsMap[action];
        for (const event of events) {
          const query = `
            INSERT INTO dynamic_events 
              (name, action_type, min_level, weight, positivity_score, descriptions, base_modifiers)
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `;
          const values = [
            event.name,
            event.actionType,
            event.minLevel,
            event.weight,
            event.positivityScore,
            JSON.stringify(event.descriptions),
            JSON.stringify(event.baseModifiers)
          ];
          await pool.query(query, values);
        }
      }
      console.log('Les dynamic events de base ont été insérés dans la table dynamic_events.');
      this.init = true;
    } catch (error) {
      console.error('Erreur lors du seed des dynamic events :', error);
      throw error;
    }
  }

  /**
   * Récupère l'ensemble des DynamicEvents.
   */
  public async getAllDynamicEvents(): Promise<DynamicEventData[]> {

    if(this.init === false) {
      throw new Error('La base de données n\'est pas initialisée');
    }

    const [rows] = await pool.query<DatabaseDynamicEventRow[]>(`SELECT * FROM dynamic_events`);
    return rows.map(row => ({
      id: row.id,
      name: row.name,
      actionType: row.action_type as DinosaurAction,
      minLevel: row.min_level,
      weight: row.weight,
      positivityScore: row.positivity_score,
      descriptions: JSON.parse(row.descriptions),
      baseModifiers: JSON.parse(row.base_modifiers)
    }));
  }

  /**
   * Récupère les DynamicEvents pour une action donnée.
   * @param action L'action recherchée.
   */
  public async getDynamicEventsByAction(action: DinosaurAction): Promise<DynamicEventData[]> {
    if(this.init === false) {
      throw new Error('La base de données n\'est pas initialisée');
    }
    const [rows] = await pool.query<DatabaseDynamicEventRow[]>(
      `SELECT * FROM dynamic_events WHERE action_type = ?`,
      [action]
    );

    return rows.map(row => ({
      id: row.id,
      name: row.name,
      actionType: row.action_type as DinosaurAction,
      minLevel: row.min_level,
      weight: row.weight,
      positivityScore: row.positivity_score,
      descriptions: JSON.parse(row.descriptions),
      baseModifiers: JSON.parse(row.base_modifiers)
    }));
  }

  /**
   * Récupère un DynamicEvent par son identifiant.
   * @param id L'identifiant du DynamicEvent.
   */
  public async getDynamicEventById(id: number): Promise<DynamicEventData | null> {
    if(this.init === false) {
      throw new Error('La base de données n\'est pas initialisée');
    }
    const [rows] = await pool.query<DatabaseDynamicEventRow[]>(
      `SELECT * FROM dynamic_events WHERE id = ?`,
      [id]
    );
    if (rows.length === 0) return null;
    const row = rows[0];
    return {
      id: row.id,
      name: row.name,
      actionType: row.action_type as DinosaurAction,
      minLevel: row.min_level,
      weight: row.weight,
      positivityScore: row.positivity_score,
      descriptions: JSON.parse(row.descriptions),
      baseModifiers: JSON.parse(row.base_modifiers)
    };
  }

  /**
   * Crée un nouveau DynamicEvent.
   * @param event Les données du DynamicEvent à créer (sans l'identifiant).
   */
  public async createDynamicEvent(event: Omit<DynamicEventData, 'id'>): Promise<DynamicEventData> {
    const query = `
      INSERT INTO dynamic_events 
      (name, action_type, min_level, weight, positivity_score, descriptions, base_modifiers)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      event.name,
      event.actionType,
      event.minLevel,
      event.weight,
      event.positivityScore,
      JSON.stringify(event.descriptions),
      JSON.stringify(event.baseModifiers)
    ];
    const [result] = await pool.query(query, values);
    const resAny = result as any;
    const insertedId = resAny.insertId;
    const createdEvent = await this.getDynamicEventById(insertedId);
    if (!createdEvent) {
      throw new Error('Erreur lors de la création du DynamicEvent');
    }
    return createdEvent;
  }

  /**
   * Met à jour un DynamicEvent existant.
   * @param event Le DynamicEvent avec les nouvelles valeurs (doit contenir un identifiant valide).
   */
  public async updateDynamicEvent(event: DynamicEventData): Promise<boolean> {
    const query = `
      UPDATE dynamic_events
      SET name = ?,
          action_type = ?,
          min_level = ?,
          weight = ?,
          positivity_score = ?,
          descriptions = ?,
          base_modifiers = ?
      WHERE id = ?
    `;
    const values = [
      event.name,
      event.actionType,
      event.minLevel,
      event.weight,
      event.positivityScore,
      JSON.stringify(event.descriptions),
      JSON.stringify(event.baseModifiers),
      event.id
    ];
    const [result] = await pool.query(query, values);
    const resAny = result as any;
    return resAny.affectedRows > 0;
  }

  /**
   * Supprime un DynamicEvent par son identifiant.
   * @param eventId L'identifiant du DynamicEvent à supprimer.
   */
  public async deleteDynamicEvent(eventId: number): Promise<boolean> {
    const query = `DELETE FROM dynamic_events WHERE id = ?`;
    const [result] = await pool.query(query, [eventId]);
    const resAny = result as any;
    return resAny.affectedRows > 0;
  }
}
