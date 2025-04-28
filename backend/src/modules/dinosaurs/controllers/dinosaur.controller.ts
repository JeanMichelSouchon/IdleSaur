import { Response, Request } from 'express';
import { AuthenticatedRequest } from '../../auth/middlewares/authMiddleware';
import { plainToInstance } from 'class-transformer';
import { DinosaurActionDTO } from '../models/dinosaur-action.dto';
import { ChangeDinosaurNameRequestBody } from '../models/change-dinosaur-name.dto';
import { calculateEpochThresholds } from '../utils/epochUtils';
import { DinosaurRepository } from '../repositories/dinosaur.repository';
import { FrontendDinosaurDTO } from '../models/frontend-dinosaur.dto';
import { DinosaurEventService } from '../services/dinosaur-event.service';
import { getExperienceThresholdForLevel } from '../utils/levelThresholds';

export class DinosaursController {
  private dinosaurRepository: DinosaurRepository;
  private dinosaurEventService: DinosaurEventService;
  constructor(
    dinosaurRepository: DinosaurRepository,
    dinosaurEventService: DinosaurEventService
  ) {
    this.dinosaurRepository = dinosaurRepository;
    this.dinosaurEventService = dinosaurEventService;
  }
  
  // Nouvelle méthode pour obtenir les seuils des époques
  public getEpochThresholds = (req: Request, res: Response) => {
      try {
          const thresholds = calculateEpochThresholds();
          res.status(200).json({ thresholds });
      } catch (error) {
          console.error('Erreur lors de la récupération des seuils d\'époques:', error);
          res.status(500).json({ message: 'Erreur interne du serveur' });
      }
  };

  // Méthode pour obtenir les actions disponibles pour un dinosaure
  public getAvailableActionsForDinosaur = async (req: AuthenticatedRequest, res: Response) => {
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

      // Obtenir les actions disponibles avec leurs détails
      const availableActions = this.dinosaurEventService.getAvailableActions(dinosaur);

      res.status(200).json({
        dinosaur: plainToInstance(FrontendDinosaurDTO, dinosaur),
        availableActions: plainToInstance(DinosaurActionDTO, availableActions),
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des actions disponibles pour le dinosaure:', error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  };

  public getNextLevelXp = async (req: AuthenticatedRequest, res: Response) => {
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
  
      // Calcul de la valeur d'expérience nécessaire pour le prochain niveau
      const nextLevelXp = getExperienceThresholdForLevel(dinosaur.level + 1);
  
      res.status(200).json({ nextLevelXp });
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'expérience nécessaire pour le prochain niveau:', error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  };

  // Méthode pour obtenir les informations du dinosaure de l'utilisateur
  public getMyDinosaur = async (req: AuthenticatedRequest, res: Response) => {
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

      const dinosaurDTO = plainToInstance(FrontendDinosaurDTO, dinosaur);
      res.status(200).json(dinosaurDTO);
    } catch (error) {
      console.error('Erreur lors de la récupération du dinosaure:', error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  };

  // Méthode pour changer le nom du dinosaure de l'utilisateur
  public changeDinosaurName = async (
    req: AuthenticatedRequest & Request<{}, {}, ChangeDinosaurNameRequestBody>,
    res: Response
  ) => {
    try {
      const userId = req.user?.id;
      const newName = req.body.name;

      if (!userId) {
        res.status(400).json({ message: 'Utilisateur non authentifié' });
        return;
      }

      if (!newName || typeof newName !== 'string' || newName.trim().length === 0) {
        res.status(400).json({ message: 'Nom invalide' });
        return;
      }

      const updated = await this.dinosaurRepository.updateDinosaurName(userId, newName.trim());
      if (!updated) {
        res.status(404).json({ message: 'Dinosaure non trouvé' });
        return;
      }

      res.status(200).json({ message: 'Nom du dinosaure mis à jour avec succès', newName });
    } catch (error) {
      console.error('Erreur lors du changement de nom du dinosaure:', error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  };
}
