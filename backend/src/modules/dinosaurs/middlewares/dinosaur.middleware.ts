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
  private dinosaurFactory: DinosaurFactory;

  constructor(
    dinosaurRepository: DinosaurRepository,
    dinosaurTimeService: DinosaurTimeService,
    dinosaurFactory: DinosaurFactory
  ) {
    this.dinosaurRepository = dinosaurRepository;
    this.dinosaurTimeService = dinosaurTimeService;
    this.dinosaurFactory = dinosaurFactory;
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

      if (!databaseDinosaur) {
        const isUserAdmin = req.user?.isAdmin;
        const newDino = await this.dinosaurFactory.createDinosaur(userId, isUserAdmin);
        databaseDinosaur = await this.dinosaurRepository.createDinosaur(newDino);
        if (!databaseDinosaur) {
          res.status(500).json({ message: 'Échec de la création du dinosaure' });
          return;
        }
      }

      const dinosaur: FrontendDinosaurDTO = this.dinosaurFactory.convertToFrontendDinosaur(databaseDinosaur);

      const adjustedDino = await this.dinosaurTimeService.adjustDinosaurStats(dinosaur);

      const updateSuccess = await this.dinosaurRepository.updateDinosaur(adjustedDino.id, adjustedDino);
      if (!updateSuccess) {
        res.status(500).json({ message: 'Échec de la mise à jour du dinosaure' });
        return;
      }

      req.dinosaur = adjustedDino;
      next();
    } catch (error) {
      console.error('Erreur dans le middleware de dinosaure:', error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  };
}
