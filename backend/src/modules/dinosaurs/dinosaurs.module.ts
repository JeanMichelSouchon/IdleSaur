import { Router } from 'express';
import { DinosaurTimeService } from './services/dinosaur-time.service';
import { BasicActionsService } from './services/basic-actions.service';
import { CarnivoreActionsService } from './services/carnivore-actions.service';
import { HerbivoreActionsService } from './services/herbivore-action.service';
import { AdvancedActionsService } from './services/advanced-actions.service';
import { DinosaursController } from './controllers/dinosaur.controller';
import { BasicActionsController } from './controllers/basic-actions.controller';
import { CarnivoreActionsController } from './controllers/carnivore-actions.controller';
import { HerbivoreActionsController } from './controllers/herbivore-actions.controller';
import { AdvancedActionsController } from './controllers/advanced-actions.controller';
import dinosaursRoutes from './routes/dinosaurs.routes';
import { DinosaurRepository } from './repositories/dinosaur.repository';
import { DinosaurMiddleware } from './middlewares/dinosaur.middleware';

/**
 * Module Dinosaurs.
 * Instancie les services et contrôleurs, et configure les routes.
 */
export class DinosaursModule {
  public router: Router;

  // Services principaux
  private dinosaurTimeService: DinosaurTimeService;

  // Services spécifiques
  private basicActionsService: BasicActionsService;
  private carnivoreActionsService: CarnivoreActionsService;
  private herbivoreActionsService: HerbivoreActionsService;
  private advancedActionsService: AdvancedActionsService;

  // Contrôleurs
  private dinosaursController: DinosaursController;
  private basicActionsController: BasicActionsController;
  private carnivoreActionsController: CarnivoreActionsController;
  private herbivoreActionsController: HerbivoreActionsController;
  private advancedActionsController: AdvancedActionsController;
  private dinosaurMiddleware: DinosaurMiddleware;

  constructor() {
    // Initialisation du repository
    const dinosaurRepository = new DinosaurRepository();

    // Initialisation des services spécifiques
    this.basicActionsService = new BasicActionsService(dinosaurRepository);
    this.carnivoreActionsService = new CarnivoreActionsService(dinosaurRepository);
    this.herbivoreActionsService = new HerbivoreActionsService(dinosaurRepository);
    this.advancedActionsService = new AdvancedActionsService(dinosaurRepository);

    // Initialisation du time service.
    this.dinosaurTimeService = new DinosaurTimeService(this.basicActionsService);

    // Initialisation des contrôleurs
    this.dinosaursController = new DinosaursController(dinosaurRepository);
    this.basicActionsController = new BasicActionsController(this.basicActionsService);
    this.carnivoreActionsController = new CarnivoreActionsController(this.carnivoreActionsService);
    this.herbivoreActionsController = new HerbivoreActionsController(this.herbivoreActionsService);
    this.advancedActionsController = new AdvancedActionsController(this.advancedActionsService);

    // Initialisation du middleware
    this.dinosaurMiddleware = new DinosaurMiddleware(dinosaurRepository, this.dinosaurTimeService);

    // Initialisation du routage avec tous les contrôleurs
    this.router = dinosaursRoutes(
      this.dinosaursController,
      this.basicActionsController,
      this.carnivoreActionsController,
      this.herbivoreActionsController,
      this.advancedActionsController,
      this.dinosaurMiddleware
    );
  }
}
