import { Router } from 'express';
import { DinosaurSkillRepository } from './repositories/dinosaur-skill.repository';
import { DinosaurItemRepository } from './repositories/dinosaur-item.repository';
import { DinosaurBuildingRepository } from './repositories/dinosaur-building.repository';
import { DinosaurSoulSkillRepository } from './repositories/dinosaur-soul-skill.repository';
import { ShopController } from './controllers/shop.controller';
import { ShopService } from './services/shop.service';
import { ShopDinosaurRepository } from './repositories/shop-dinosaur.repository';
import shopRoutes from './routes/shop.routes';
import { DinosaurMiddleware } from '../dinosaurs/middlewares/dinosaur.middleware';

/**
 * Module Game‑Assets.
 * Gère le peuplage des définitions d'assets (skills, items, bâtiments, soul skills),
 * et intègre le shop (achats/upgrades) ainsi que d'autres fonctionnalités ultérieures.
 */
export class GameAssetsModule {
  public router: Router;

  private skillRepository: DinosaurSkillRepository;
  private itemRepository: DinosaurItemRepository;
  private buildingRepository: DinosaurBuildingRepository;
  private soulSkillRepository: DinosaurSoulSkillRepository;
  private dinoMiddleware: DinosaurMiddleware;

  constructor(dinoMiddleware: DinosaurMiddleware) {
    this.dinoMiddleware = dinoMiddleware;
    this.skillRepository = new DinosaurSkillRepository();
    this.itemRepository = new DinosaurItemRepository();
    this.buildingRepository = new DinosaurBuildingRepository();
    this.soulSkillRepository = new DinosaurSoulSkillRepository();

    // Initialisation du router principal pour le module Game‑Assets
    this.router = Router();

    // Intégration des routes du shop dans le module
    const shopDinoRepo = new ShopDinosaurRepository();
    const shopService = new ShopService(
      shopDinoRepo,
      this.skillRepository,
      this.itemRepository,
      this.buildingRepository,
      this.soulSkillRepository
    );
    // Le middleware destiné à récupérer le dinosaure (adapté à vos besoins)
    const shopController = new ShopController(shopService);

    // Enregistrement des routes du shop
    this.router.use(shopRoutes(shopController, this.dinoMiddleware));
  }

  /**
   * Effectue le peuplage des définitions si les tables sont vides.
   */
  public async seedGameAssets(): Promise<void> {
    await this.skillRepository.seedDinosaurSkillsIfEmpty();
    await this.itemRepository.seedDinosaurItemsIfEmpty();
    await this.buildingRepository.seedDinosaurBuildingsIfEmpty();
    await this.soulSkillRepository.seedDinosaurSoulSkillsIfEmpty();
    console.log('Game Assets have been seeded.');
  }
}
