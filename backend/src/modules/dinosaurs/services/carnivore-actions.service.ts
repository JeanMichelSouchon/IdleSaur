import { DinosaurAction } from '../models/dinosaur-action.enum';
import { DinosaurEvent } from '../models/dinosaur-event.interface';
import { DinosaurActionsMap } from '../libs/dinosaur-actions.mapping';
import { DinosaurRepository } from '../repositories/dinosaur.repository';
import { FrontendDinosaurDTO } from '../models/frontend-dinosaur.dto';
import { DinosaurEventService } from './dinosaur-event.service';

/**
 * Service pour gérer les actions spécifiques aux dinosaures carnivores (chasser).
 */
export class CarnivoreActionsService {
    private dinosaurRepository: DinosaurRepository;
    private dinosaurEventService: DinosaurEventService;

    constructor(dinosaurRepository: DinosaurRepository, dinosaurEventService: DinosaurEventService) {
        this.dinosaurRepository = dinosaurRepository;
        this.dinosaurEventService = dinosaurEventService;
    }

    /**
     * Action pour chasser le dinosaure carnivore.
     * @param dinosaur Le dinosaure à chasser.
     * @returns Le dinosaure mis à jour et l'événement généré.
     */
    public async huntDinosaur(dinosaur: FrontendDinosaurDTO): Promise<{ dinosaur: FrontendDinosaurDTO, event: DinosaurEvent }> {
        const actionDetails = DinosaurActionsMap[DinosaurAction.Hunt];

        if (!actionDetails.canPerform(dinosaur)) {
            throw new Error('Le dinosaure ne peut pas chasser.');
        }

        const event = await this.dinosaurEventService.getRandomEventForAction(DinosaurAction.Hunt, dinosaur);
        this.dinosaurEventService.applyEventToDinosaur(dinosaur, DinosaurAction.Hunt, event);

        this.dinosaurRepository.updateDinosaur(dinosaur.id, dinosaur);

        return { dinosaur, event };
    }
}
