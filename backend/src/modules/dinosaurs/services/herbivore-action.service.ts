import { DinosaurAction } from '../models/dinosaur-action.enum';
import { DinosaurEvent } from '../models/dinosaur-event.interface';
import { DinosaurActionsMap } from '../libs/dinosaur-actions.mapping';
import { DinosaurRepository } from '../repositories/dinosaur.repository';
import { FrontendDinosaurDTO } from '../models/frontend-dinosaur.dto';
import { DinosaurEventService } from './dinosaur-event.service';

/**
 * Service pour gérer les actions spécifiques aux dinosaures herbivores (cueillir).
 */
export class HerbivoreActionsService {
    private dinosaurRepository: DinosaurRepository;
    private dinosaurEventService: DinosaurEventService;

    constructor(dinosaurRepository: DinosaurRepository, dinosaurEventService: DinosaurEventService) {
        this.dinosaurRepository = dinosaurRepository;
        this.dinosaurEventService = dinosaurEventService
    }

    /**
     * Action pour cueillir le dinosaure herbivore.
     * @param dinosaur Le dinosaure à cueillir.
     * @returns Le dinosaure mis à jour et l'événement généré.
     */
    public async grazeDinosaur(dinosaur: FrontendDinosaurDTO): Promise<{ dinosaur: FrontendDinosaurDTO, event: DinosaurEvent }> {
        const actionDetails = DinosaurActionsMap[DinosaurAction.Graze];

        if (!actionDetails.canPerform(dinosaur)) {
            throw new Error('Le dinosaure ne peut pas cueillir.');
        }

        const event = await this.dinosaurEventService.getRandomEventForAction(DinosaurAction.Graze, dinosaur);
        this.dinosaurEventService.applyEventToDinosaur(dinosaur, DinosaurAction.Graze, event);

        this.dinosaurRepository.updateDinosaur(dinosaur.id, dinosaur);
        return { dinosaur, event };
    }
}
