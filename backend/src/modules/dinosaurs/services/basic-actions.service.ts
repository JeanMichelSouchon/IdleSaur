import { DinosaurAction } from '../models/dinosaur-action.enum';
import { DinosaurEvent } from '../models/dinosaur-event.interface';
import { DinosaurActionsMap } from '../libs/dinosaur-actions.mapping';
import { DinosaurRepository } from '../repositories/dinosaur.repository';
import { FrontendDinosaurDTO } from '../models/frontend-dinosaur.dto';
import { DinosaurEventService } from './dinosaur-event.service';

/**
 * Service pour gérer les actions basiques du dinosaure (manger, dormir, se réveiller, ressusciter).
 */
export class BasicActionsService {
    private dinosaurRepository: DinosaurRepository;
    private dinosaurEventService: DinosaurEventService;

    constructor(dinosaurRepository: DinosaurRepository, dinosaurEventService: DinosaurEventService) {
        this.dinosaurRepository = dinosaurRepository;
        this.dinosaurEventService = dinosaurEventService;
    }

    /**
     * Action pour manger le dinosaure.
     * @param dinosaur Le dinosaure à manger.
     * @returns Le dinosaure mis à jour et l'événement généré.
     */
    public eatDinosaur(dinosaur: FrontendDinosaurDTO): { dinosaur: FrontendDinosaurDTO, event: DinosaurEvent } {
        const actionDetails = DinosaurActionsMap[DinosaurAction.Eat];

        if (!actionDetails.canPerform(dinosaur)) {
            throw new Error('Le dinosaure ne peut pas manger.');
        }

        // Calculer la quantité de nourriture à consommer (ne pas consommer plus que la faim ni que la nourriture disponible)
        const foodNeeded = Math.min(dinosaur.hunger, dinosaur.food);

        // Si aucune nourriture n'est disponible ou aucune faim n'est présente, renvoyer un event sans modifier le dinosaure
        if (foodNeeded <= 0) {
            const event: DinosaurEvent = {
                id: 0,
                actionType: DinosaurAction.Eat,
                positivityScore: 0,
                name: 'Pas de nourriture suffisante',
                description: 'Le dinosaure n\'a pas assez de nourriture pour satisfaire sa faim.',
                minLevel: 0,
                weight: 1,
                // Aucun modifier à appliquer
                modifiers: []
            };
            return { dinosaur, event };
        }

        // Créer l'événement basé sur la consommation réelle
        const event: DinosaurEvent = {
            id: 0,
            actionType: DinosaurAction.Eat,
            positivityScore: 0,
            name: 'Repas optimisé',
            description: 'Le dinosaure utilise la nourriture disponible pour réduire sa faim.',
            minLevel: 0,
            weight: 1,
            // Appliquer deux modifiers : 
            // - Consommation de nourriture : soustraction de la quantité consommée sur "food"
            // - Réduction de la faim : soustraction de la même quantité sur "hunger"
            modifiers: [
                { source: 'action', type: 'additive', value: -foodNeeded, target: 'food' },
                { source: 'action', type: 'additive', value: -foodNeeded, target: 'hunger' }
            ]
        };

        // Appliquer l'événement au dinosaure (les modifiers seront traités dans la fonction d'application)
        this.dinosaurEventService.applyEventToDinosaur(dinosaur, DinosaurAction.Eat, event);

        // Mettre à jour le dinosaure en base
        this.dinosaurRepository.updateDinosaur(dinosaur.id, dinosaur);

        return { dinosaur, event };
    }

    /**
     * Action pour faire dormir le dinosaure.
     * @param dinosaur Le dinosaure à faire dormir.
     * @returns Le dinosaure mis à jour et l'événement généré.
     */
    public async sleepDinosaur(dinosaur: FrontendDinosaurDTO): Promise<{ dinosaur: FrontendDinosaurDTO, event: DinosaurEvent }> {
        const actionDetails = DinosaurActionsMap[DinosaurAction.Sleep];

        if (!actionDetails.canPerform(dinosaur)) {
            throw new Error('Le dinosaure ne peut pas dormir.');
        }

        const event = await this.dinosaurEventService.getRandomEventForAction(DinosaurAction.Sleep, dinosaur);

        dinosaur.is_sleeping = true;
        this.dinosaurEventService.applyEventToDinosaur(dinosaur, DinosaurAction.Sleep, event);

        this.dinosaurRepository.updateDinosaur(dinosaur.id, dinosaur);
        return { dinosaur, event };
    }

    /**
     * Action pour réveiller le dinosaure.
     * @param dinosaur Le dinosaure à réveiller.
     * @returns Le dinosaure mis à jour et l'événement généré.
     */
    public async wakeDinosaur(dinosaur: FrontendDinosaurDTO): Promise<{ dinosaur: FrontendDinosaurDTO, event: DinosaurEvent }> {
        const actionDetails = DinosaurActionsMap[DinosaurAction.WakeUp];

        if (!actionDetails.canPerform(dinosaur)) {
            throw new Error('Le dinosaure ne peut pas se réveiller.');
        }

        const event = await this.dinosaurEventService.getRandomEventForAction(DinosaurAction.WakeUp, dinosaur);

        dinosaur.is_sleeping = false;
        this.dinosaurEventService.applyEventToDinosaur(dinosaur, DinosaurAction.WakeUp, event);

        this.dinosaurRepository.updateDinosaur(dinosaur.id, dinosaur);
        return { dinosaur, event };
    }

    /**
     * Action pour ressusciter le dinosaure.
     * @param dinosaur Le dinosaure à ressusciter.
     * @returns Le dinosaure mis à jour et l'événement généré.
     */
    public async resurrectDinosaur(dinosaur: FrontendDinosaurDTO, isAdmin: boolean = false): Promise<{ dinosaur: FrontendDinosaurDTO, event: DinosaurEvent }> {
        const actionDetails = DinosaurActionsMap[DinosaurAction.Resurrect];

        if (!actionDetails.canPerform(dinosaur)) {
            throw new Error('Le dinosaure ne peut pas ressusciter.');
        }

        const event = await this.dinosaurEventService.getRandomEventForAction(DinosaurAction.Resurrect, dinosaur);

        // Apply event lors d'une resurrection renvoie une nouvelle instance de dino
        // Penser a bien utiliser newDino, et non pâs dinosaur comme partout ailleurs
        const newDino: FrontendDinosaurDTO = await this.dinosaurEventService.applyEventToDinosaur(dinosaur, DinosaurAction.Resurrect, event, isAdmin);

        this.dinosaurRepository.updateDinosaur(newDino.id, newDino);
        return { dinosaur, event };
    }

    /**
     * Action pour cueillir le dinosaure herbivore.
     * @param dinosaur Le dinosaure à cueillir.
     * @returns Le dinosaure mis à jour et l'événement généré.
     */
    public async grazeDinosaur(dinosaur: FrontendDinosaurDTO): Promise<{ dinosaur: FrontendDinosaurDTO, event: DinosaurEvent }> {
        const actionDetails = DinosaurActionsMap[DinosaurAction.Graze];

        if (!actionDetails.canPerform(dinosaur)) {
            throw new Error('Le dinosaure ne peut pas brouter.');
        }

        const event = await this.dinosaurEventService.getRandomEventForAction(DinosaurAction.Graze, dinosaur);
        // Ici la fonction renvoie une nouvelle instance de dino
        // Penser a bien utiliser newDino, et non pâs dinosaur comme partout ailleurs.
        const newDino: FrontendDinosaurDTO = await this.dinosaurEventService.applyEventToDinosaur(dinosaur, DinosaurAction.Graze, event);

        this.dinosaurRepository.updateDinosaur(newDino.id, newDino);
        return { dinosaur, event };
    }
}
