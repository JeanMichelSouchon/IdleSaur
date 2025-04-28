import { Request, Response } from 'express';
import { ShopService } from '../services/shop.service';
import { AuthenticatedRequest } from '../../auth/middlewares/authMiddleware';
import { ShopAssetsDTO } from '../models/shop-assets.dto';

/**
 * Contrôleur dédié aux opérations de la boutique pour l'ensemble des game assets.
 */
export class ShopController {
  constructor(private shopService: ShopService) {}

  /**
   * Récupère tous les assets disponibles.
   * Route : GET /shop/assets
   */
  public getAllAssets = async (req: Request, res: Response): Promise<void> => {
    try {
      const assets: ShopAssetsDTO = await this.shopService.getAllAssets();
      res.status(200).json(assets);
    } catch (error: any) {
      console.error('Erreur lors de la récupération des assets :', error);
      res.status(500).json({ message: error.message || 'Erreur interne du serveur' });
    }
  };

  /**
   * Achat d'une compétence classique.
   * Route : POST /shop/skills/:skillId
   */
  public purchaseSkill = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const dinosaur = req.dinosaur;
      if (!dinosaur) {
        res.status(400).json({ message: 'Dinosaure non trouvé' });
        return;
      }
      const skillId = Number(req.params.skillId);
      if (isNaN(skillId)) {
        res.status(400).json({ message: 'Identifiant de compétence invalide' });
        return;
      }
      const { dinosaur: updatedDino, message } = await this.shopService.purchaseSkill(dinosaur, skillId);
      res.status(200).json({ message, dinosaur: updatedDino });
    } catch (error: any) {
      console.error('Erreur lors de l\'achat de la compétence :', error);
      res.status(500).json({ message: error.message || 'Erreur interne du serveur' });
    }
  };

  /**
   * Achat d'une Soul Skill.
   * Route : POST /shop/soul-skills/:soulSkillId
   */
  public purchaseSoulSkill = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const dinosaur = req.dinosaur;
      const user = req.user;
      if (!dinosaur || !user) {
        res.status(400).json({ message: 'Dinosaure ou User non trouvé' });
        return;
      }
      const soulSkillId = Number(req.params.soulSkillId);
      if (isNaN(soulSkillId)) {
        res.status(400).json({ message: 'Identifiant de Soul Skill invalide' });
        return;
      }
      const { dinosaur: updatedDino, message } = await this.shopService.purchaseSoulSkill(dinosaur, user, soulSkillId);
      res.status(200).json({ message, dinosaur: updatedDino });
    } catch (error: any) {
      console.error('Erreur lors de l\'achat de la Soul Skill :', error);
      res.status(500).json({ message: error.message || 'Erreur interne du serveur' });
    }
  };

  /**
   * Achat d'un item.
   * Route : POST /shop/items/:itemId
   */
  public purchaseItem = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const dinosaur = req.dinosaur;
      if (!dinosaur) {
        res.status(400).json({ message: 'Dinosaure non trouvé' });
        return;
      }
      const itemId = Number(req.params.itemId);
      if (isNaN(itemId)) {
        res.status(400).json({ message: 'Identifiant d\'item invalide' });
        return;
      }
      const { dinosaur: updatedDino, message } = await this.shopService.purchaseItem(dinosaur, itemId);
      res.status(200).json({ message, dinosaur: updatedDino });
    } catch (error: any) {
      console.error('Erreur lors de l\'achat de l\'item :', error);
      res.status(500).json({ message: error.message || 'Erreur interne du serveur' });
    }
  };

  /**
   * Upgrade d'un item.
   * Route : PATCH /shop/items/:itemId/upgrade
   */
  public upgradeItem = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const dinosaur = req.dinosaur;
      if (!dinosaur) {
        res.status(400).json({ message: 'Dinosaure non trouvé' });
        return;
      }
      const itemId = Number(req.params.itemId);
      if (isNaN(itemId)) {
        res.status(400).json({ message: 'Identifiant d\'item invalide' });
        return;
      }
      const { dinosaur: updatedDino, message } = await this.shopService.upgradeItem(dinosaur, itemId);
      res.status(200).json({ message, dinosaur: updatedDino });
    } catch (error: any) {
      console.error('Erreur lors de l\'upgrade de l\'item :', error);
      res.status(500).json({ message: error.message || 'Erreur interne du serveur' });
    }
  };

  /**
   * Achat d'un bâtiment.
   * Route : POST /shop/buildings/:buildingId
   */
  public purchaseBuilding = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const dinosaur = req.dinosaur;
      if (!dinosaur) {
        res.status(400).json({ message: 'Dinosaure non trouvé' });
        return;
      }
      const buildingId = Number(req.params.buildingId);
      if (isNaN(buildingId)) {
        res.status(400).json({ message: 'Identifiant de bâtiment invalide' });
        return;
      }
      const { dinosaur: updatedDino, message } = await this.shopService.purchaseBuilding(dinosaur, buildingId);
      res.status(200).json({ message, dinosaur: updatedDino });
    } catch (error: any) {
      console.error('Erreur lors de l\'achat du bâtiment :', error);
      res.status(500).json({ message: error.message || 'Erreur interne du serveur' });
    }
  };

  /**
   * Upgrade d'un bâtiment (achat d'un upgrade spécifique).
   * Route : PATCH /shop/buildings/:buildingId/upgrade/:upgradeId
   */
  public upgradeBuilding = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const dinosaur = req.dinosaur;
      if (!dinosaur) {
        res.status(400).json({ message: 'Dinosaure non trouvé' });
        return;
      }
      const buildingId = Number(req.params.buildingId);
      const upgradeId = Number(req.params.upgradeId);
      if (isNaN(buildingId) || isNaN(upgradeId)) {
        res.status(400).json({ message: 'Identifiants invalides' });
        return;
      }
      const { dinosaur: updatedDino, message } = await this.shopService.upgradeBuilding(dinosaur, buildingId, upgradeId);
      res.status(200).json({ message, dinosaur: updatedDino });
    } catch (error: any) {
      console.error('Erreur lors de l\'upgrade du bâtiment :', error);
      res.status(500).json({ message: error.message || 'Erreur interne du serveur' });
    }
  };
}
