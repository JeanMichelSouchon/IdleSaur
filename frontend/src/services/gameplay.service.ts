import api from '../services/api';

/**
 * Service pour gérer les actions de gameplay (activation de skills, consommation d'items).
 */
export class GameplayService {
  /**
   * Active un skill pour un dinosaure.
   * @param dinosaurId L'ID du dinosaure.
   * @param skillId L'ID du skill à activer.
   * @returns La réponse de l'API avec le dinosaure mis à jour.
   */
  public async activateSkill(dinosaurId: number, skillId: number) {
    const response = await api.post(`/dinosaurs/activate-skill`, { skillId });
    return response.data;
  }

  /**
   * Consomme un item pour un dinosaure.
   * @param dinosaurId L'ID du dinosaure.
   * @param itemId L'ID de l'item à consommer.
   * @returns La réponse de l'API avec le dinosaure mis à jour.
   */
  public async consumeItem(dinosaurId: number, itemId: number) {
    const response = await api.post(`/dinosaurs/consume-item`, { itemId });
    return response.data;
  }
}
