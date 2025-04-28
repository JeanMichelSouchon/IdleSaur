import { Request, Response, NextFunction } from 'express';
import { DinosaurRepository } from '../repositories/dinosaur.repository';
import { DinosaurTimeService } from '../services/dinosaur-time.service';
import { AuthenticatedRequest } from '../../auth/middlewares/authMiddleware';
import { DinosaurFactory } from '../factories/dinosaur.factory';
import { FrontendDinosaurDTO } from '../models/frontend-dinosaur.dto';
import { DatabaseDinosaur } from '../models/database-dinosaur.interface';

/**
 * Middleware pour récupérer, créer (si nécessaire) et mettre à jour le dinosaure avant chaque requête.
 */
export class DinosaurMiddleware {
  private dinosaurRepository: DinosaurRepository;
  private dinosaurTimeService: DinosaurTimeService;

  constructor(
    dinosaurRepository: DinosaurRepository,
    dinosaurTimeService: DinosaurTimeService
  ) {
    this.dinosaurRepository = dinosaurRepository;
    this.dinosaurTimeService = dinosaurTimeService;
  }

  public fetchAndUpdateDinosaur = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(400).json({ message: 'Utilisateur non authentifié' });
        return;
      }

      let databaseDinosaur: DatabaseDinosaur | null = await this.dinosaurRepository.getDinosaurByUserId(userId);

      // Si aucun dinosaure n'existe, le créer via la factory et l'insérer en base
      if (!databaseDinosaur) {
        const newDino = await DinosaurFactory.createDinosaur(userId);
        databaseDinosaur = await this.dinosaurRepository.createDinosaur(newDino);
        if (!databaseDinosaur) {
          res.status(500).json({ message: 'Échec de la création du dinosaure' });
          return;
        }
      }

      const dinosaur: FrontendDinosaurDTO = DinosaurFactory.convertToFrontendDinosaur(databaseDinosaur);

      // Ajuster les statistiques du dinosaure en fonction du temps via le service
      const adjustedDino = this.dinosaurTimeService.adjustDinosaurStats(dinosaur);

      // Sauvegarder les nouvelles valeurs en base
      const resolvedDino = await adjustedDino;
      const updateSuccess = await this.dinosaurRepository.updateDinosaur(resolvedDino.id, resolvedDino);
      if (!updateSuccess) {
        res.status(500).json({ message: 'Échec de la mise à jour du dinosaure' });
        return;
      }

      // Attacher le dinosaure mis à jour à la requête
      req.dinosaur = await adjustedDino;
      next();
    } catch (error) {
      console.error('Erreur dans le middleware de dinosaure:', error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  };
}
