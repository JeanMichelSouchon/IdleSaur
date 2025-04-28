import { Request, Response } from 'express';
import { GameplayService } from '../services/gameplay.service';
import { AuthenticatedRequest } from '../../auth/middlewares/authMiddleware';

/**
 * Contrôleur pour gérer les actions de gameplay (activation de skills, consommation d'items).
 */
export class GameplayController {
  private gameplayService: GameplayService;

  constructor(gameplayService: GameplayService) {
    this.gameplayService = gameplayService;
  }

  public activateSkill = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
          res.status(400).json({ message: 'Utilisateur non authentifié' });
          return;
      }

      const dinosaur = req.dinosaur;
      if (!dinosaur) {
          res.status(400).json({ message: 'Dinosaure non trouvé pour l utilisateur' });
          return;
      }

      const skillId = Number(req.body.skillId);
      const updatedDino = await this.gameplayService.activateSkill(dinosaur.id, skillId);
      res.status(200).json(updatedDino);
    } catch (error) {
      console.error('Erreur lors de l\'activation du skill:', error);
      res.status(500).json({ message: 'Erreur lors de l\'activation du skill' });
    }
  };

  public consumeItem = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
          res.status(400).json({ message: 'Utilisateur non authentifié' });
          return;
      }

      const dinosaur = req.dinosaur;
      if (!dinosaur) {
          res.status(400).json({ message: 'Dinosaure non trouvé pour l utilisateur' });
          return;
      }

      const itemId = Number(req.body.itemId);
      const updatedDino = await this.gameplayService.consumeItem(dinosaur.id, itemId);
      res.status(200).json(updatedDino);
    } catch (error) {
      console.error('Erreur lors de la consommation de l\'item:', error);
      res.status(500).json({ message: 'Erreur lors de la consommation de l\'item' });
    }
  };
}
