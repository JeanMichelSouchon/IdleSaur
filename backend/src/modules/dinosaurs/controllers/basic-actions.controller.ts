import { Response } from 'express';
import { AuthenticatedRequest } from '../../auth/middlewares/authMiddleware';
import { plainToInstance } from 'class-transformer';
import { BasicActionsService } from '../services/basic-actions.service';
import { FrontendDinosaurDTO } from '../models/frontend-dinosaur.dto';

/**
 * Contrôleur pour les actions basiques du dinosaure (manger, dormir, se réveiller, ressusciter).
 */
export class BasicActionsController {
    private basicActionsService: BasicActionsService;

    constructor(basicActionsService: BasicActionsService) {
        this.basicActionsService = basicActionsService;
    }

    /**
     * Action pour manger le dinosaure.
     */
    public eatDinosaur = async (req: AuthenticatedRequest, res: Response) => {
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

            const { dinosaur: updatedDino, event } = await this.basicActionsService.eatDinosaur(dinosaur);

            const dinosaurDTO = plainToInstance(FrontendDinosaurDTO, updatedDino);
            res.status(200).json({ message: 'Action réussie', dinosaur: dinosaurDTO, event });
        } catch (error) {
            console.error('Erreur lors de l\'action manger du dinosaure:', error);
            res.status(500).json({ message: 'Erreur interne du serveur' });
        }
    };

    /**
     * Action pour faire dormir le dinosaure.
     */
    public sleepDinosaur = async (req: AuthenticatedRequest, res: Response) => {
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

            const { dinosaur: updatedDino, event } = await this.basicActionsService.sleepDinosaur(dinosaur);

            const dinosaurDTO = plainToInstance(FrontendDinosaurDTO, updatedDino);
            res.status(200).json({ message: 'Le dinosaure est maintenant en sommeil.', dinosaur: dinosaurDTO, event });
        } catch (error) {
            console.error('Erreur lors de l\'action dormir du dinosaure:', error);
            res.status(500).json({ message: 'Erreur interne du serveur' });
        }
    };

    /**
     * Action pour réveiller le dinosaure.
     */
    public wakeDinosaur = async (req: AuthenticatedRequest, res: Response) => {
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

            const { dinosaur: updatedDino, event } = await this.basicActionsService.wakeDinosaur(dinosaur);

            const dinosaurDTO = plainToInstance(FrontendDinosaurDTO, updatedDino);
            res.status(200).json({ message: 'Le dinosaure s\'est réveillé.', dinosaur: dinosaurDTO, event });
        } catch (error) {
            console.error('Erreur lors de l\'action réveiller du dinosaure:', error);
            res.status(500).json({ message: 'Erreur interne du serveur' });
        }
    };

    /**
     * Action pour ressusciter le dinosaure.
     */
    public resurrectDinosaur = async (req: AuthenticatedRequest, res: Response) => {
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

            if (!dinosaur.is_dead) {
                res.status(400).json({ message: 'Le dinosaure n\'est pas mort.' });
                return;
            }

            const { dinosaur: updatedDino, event } = await this.basicActionsService.resurrectDinosaur(dinosaur);

            const dinosaurDTO = plainToInstance(FrontendDinosaurDTO, updatedDino);
            res.status(200).json({ message: 'Le dinosaure a été ressuscité.', dinosaur: dinosaurDTO, event });
        } catch (error) {
            console.error('Erreur lors de l\'action ressusciter du dinosaure:', error);
            res.status(500).json({ message: 'Erreur interne du serveur' });
        }
    };
}
