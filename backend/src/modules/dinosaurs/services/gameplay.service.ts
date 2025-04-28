import { DinosaurRepository } from '../repositories/dinosaur.repository';
import { FrontendDinosaurDTO } from '../models/frontend-dinosaur.dto';
import { DatabaseDinosaur } from '../models/database-dinosaur.interface';
import { DinosaurFactory } from '../factories/dinosaur.factory';

/**
 * Service pour gérer les actions de gameplay telles que l'activation de skills et la consommation d'items.
 */
export class GameplayService {
  private dinosaurRepo: DinosaurRepository;
  private dinosaurFactory: DinosaurFactory;

  constructor(dinosaurRepo: DinosaurRepository, dinosaurFactory: DinosaurFactory) {
    this.dinosaurFactory = dinosaurFactory;
    this.dinosaurRepo = dinosaurRepo;
  }

  /**
   * Active un skill pour le dinosaure.
   * Cette méthode met à jour l'instance du skill (par exemple, en le marquant comme actif)
   * et effectue éventuellement d'autres traitements de gameplay.
   * @param dinosaurId L'ID du dinosaure.
   * @param skillId L'ID du skill à activer.
   * @returns Le dinosaure mis à jour.
   */
  public async activateSkill(dinosaurId: number, skillId: number): Promise<FrontendDinosaurDTO> {
    // Récupérer le dinosaure
    const dinosaur = await this.dinosaurRepo.getDinosaurById(dinosaurId);
    if (!dinosaur) {
      throw new Error("Dinosaure introuvable");
    }
    // Ici, vous ajouterez la logique d'activation du skill,
    // par exemple marquer le skill comme actif dans l'instance.
    // (La logique détaillée dépend de votre modèle métier.)
    const skillInstance = dinosaur.skills.find(s => s.id === skillId);
    if (!skillInstance) {
      throw new Error("Skill non possédé par le dinosaure");
    }
    // Marquer le skill comme actif
    skillInstance.isActive = true;
    skillInstance.lastActivatedAt = new Date();

    // Mettre à jour le dinosaure en base via le repository (le repository d'assets pourra être appelé depuis le dinosaure repo)
    await this.dinosaurRepo.updateDinosaur(dinosaurId, dinosaur);

    return this.dinosaurFactory.convertToFrontendDinosaur(dinosaur);
  }

  /**
   * Consomme un item pour le dinosaure.
   * Par exemple, cela peut réduire la quantité de l'item et appliquer ses effets au dinosaure.
   * @param dinosaurId L'ID du dinosaure.
   * @param itemId L'ID de l'item à consommer.
   * @returns Le dinosaure mis à jour.
   */
  public async consumeItem(dinosaurId: number, itemId: number): Promise<FrontendDinosaurDTO> {
    // Récupérer le dinosaure
    const dinosaur = await this.dinosaurRepo.getDinosaurById(dinosaurId);
    if (!dinosaur) {
      throw new Error("Dinosaure introuvable");
    }
    // Trouver l'instance de l'item
    const itemInstance = dinosaur.items.find(item => item.id === itemId);
    if (!itemInstance) {
      throw new Error("Item non possédé par le dinosaure");
    }
    // Pour un item consommable, on décrémente la quantité.
    if (itemInstance.itemType === 'consumable') {
      itemInstance.currentLevelOrQuantity = Math.max(itemInstance.currentLevelOrQuantity - 1, 0);
      // Si la quantité atteint 0, retirer l'item de la liste
      if (itemInstance.currentLevelOrQuantity === 0) {
        dinosaur.items = dinosaur.items.filter(item => item.id !== itemId);
      }
    }
    // Appliquer l'effet de l'item sur le dinosaure ici (par exemple, restaurer de la nourriture)
    // dinosaur.food = Math.min(dinosaur.food + 500, dinosaur.base_max_food);

    // Mettre à jour en base
    await this.dinosaurRepo.updateDinosaur(dinosaurId, dinosaur);
    return this.dinosaurFactory.convertToFrontendDinosaur(dinosaur);
  }

}
