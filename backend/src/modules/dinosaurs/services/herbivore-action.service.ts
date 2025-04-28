import { DinosaurAction } from '../models/dinosaur-action.enum';
import { getRandomEventForAction, applyEventToDinosaur } from '../utils/dinosaur-actions.util';
import { DinosaurEvent } from '../models/dinosaur-event.interface';
import { DinosaurActionsMap } from '../libs/dinosaur-actions.mapping';
import { DinosaurRepository } from '../repositories/dinosaur.repository';
import { FrontendDinosaurDTO } from '../models/frontend-dinosaur.dto';

/**
 * Service pour gérer les actions spécifiques aux dinosaures herbivores (cueillir).
 */
export class HerbivoreActionsService {
    private dinosaurRepository: DinosaurRepository;

    constructor(dinosaurRepository: DinosaurRepository) {
        this.dinosaurRepository = dinosaurRepository;
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

        const event = await getRandomEventForAction(DinosaurAction.Graze, dinosaur.level);
        applyEventToDinosaur(dinosaur, DinosaurAction.Graze, event);

        this.dinosaurRepository.updateDinosaur(dinosaur.id, dinosaur);
        return { dinosaur, event };
    }
}
