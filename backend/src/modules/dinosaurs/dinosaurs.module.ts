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
import { DynamicEventRepository } from './repositories/dynamic-event.repository';
import { DinosaurGameAssetsRepository } from './repositories/dinosaur-game-assets.repository';
import { DinosaurFactory } from './factories/dinosaur.factory';
import { GameplayController } from './controllers/gameplay.controller';
import { GameplayService } from './services/gameplay.service';
import { DinosaurLivesRepository } from './repositories/dinosaur-lives.repository';
import { AfterlifeService } from './services/afterlife.service';
import { DinosaurEventService } from './services/dinosaur-event.service';
import { PlayerScoreRepository } from './repositories/player-score.repository';

/**
 * Module Dinosaurs.
 * Instancie les services et contrôleurs, et configure les routes.
 */
export class DinosaursModule {
  public router: Router;

  // Repository Nécessitant de peupler
  private dynamicEventRepository: DynamicEventRepository;

  // Services principaux
  private dinosaurTimeService: DinosaurTimeService;

  // Services spécifiques
  private basicActionsService: BasicActionsService;
  private carnivoreActionsService: CarnivoreActionsService;
  private herbivoreActionsService: HerbivoreActionsService;
  private advancedActionsService: AdvancedActionsService;
  private gameplayService: GameplayService;
  private afterlifeService: AfterlifeService;
  private dinosaurEventService: DinosaurEventService;

  // Contrôleurs
  private dinosaursController: DinosaursController;
  private basicActionsController: BasicActionsController;
  private carnivoreActionsController: CarnivoreActionsController;
  private herbivoreActionsController: HerbivoreActionsController;
  private advancedActionsController: AdvancedActionsController;
  private gameplayController: GameplayController;

  // Middlewares
  private dinosaurMiddleware: DinosaurMiddleware;

  constructor() {
    // Instanciation du repository d'assets
    const gameAssetsRepo = new DinosaurGameAssetsRepository();
    const dinosaurLivesRepository = new DinosaurLivesRepository();
    const dinosaurRepository = new DinosaurRepository(gameAssetsRepo, dinosaurLivesRepository);
    const dinosaurFactory = new DinosaurFactory(dinosaurRepository);
    const dynamicEventRepository = new DynamicEventRepository();
    const playerScoreRepository = new PlayerScoreRepository();
    this.dynamicEventRepository = dynamicEventRepository;

    // Initialisation des services spécifiques
    this.afterlifeService = new AfterlifeService(dinosaurLivesRepository, playerScoreRepository);
    this.dinosaurEventService = new DinosaurEventService(
      dynamicEventRepository,
      this.afterlifeService,
      dinosaurFactory
    );
    this.basicActionsService = new BasicActionsService(dinosaurRepository, this.dinosaurEventService);
    this.carnivoreActionsService = new CarnivoreActionsService(dinosaurRepository, this.dinosaurEventService);
    this.herbivoreActionsService = new HerbivoreActionsService(dinosaurRepository, this.dinosaurEventService);
    this.advancedActionsService = new AdvancedActionsService(dinosaurRepository, this.dinosaurEventService);
    this.gameplayService = new GameplayService(dinosaurRepository, dinosaurFactory);

    // Initialisation du time service.
    this.dinosaurTimeService = new DinosaurTimeService(this.basicActionsService);

    // Initialisation des contrôleurs
    this.dinosaursController = new DinosaursController(dinosaurRepository, this.dinosaurEventService);
    this.basicActionsController = new BasicActionsController(this.basicActionsService);
    this.carnivoreActionsController = new CarnivoreActionsController(this.carnivoreActionsService);
    this.herbivoreActionsController = new HerbivoreActionsController(this.herbivoreActionsService);
    this.advancedActionsController = new AdvancedActionsController(this.advancedActionsService);
    this.gameplayController = new GameplayController(this.gameplayService);

    // Initialisation du middleware
    this.dinosaurMiddleware = new DinosaurMiddleware(dinosaurRepository, this.dinosaurTimeService, dinosaurFactory);

    // Initialisation du routage avec tous les contrôleurs
    this.router = dinosaursRoutes(
      this.dinosaursController,
      this.basicActionsController,
      this.carnivoreActionsController,
      this.herbivoreActionsController,
      this.advancedActionsController,
      this.gameplayController,
      this.dinosaurMiddleware
    );
  }

  /**
   * Effectue le peuplage des dynamic events si la table est vide.
   */
  public async seedDinosaurs(): Promise<void> {
    await this.dynamicEventRepository.seedDynamicEventsIfEmpty();
    console.log('Dynamic events in Dinosaurs module have been seeded.');
  }

  public getDinosaurMiddleware(): DinosaurMiddleware {
    return this.dinosaurMiddleware;
  }
}
