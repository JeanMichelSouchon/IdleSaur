import { Router } from 'express';
import fakePopulationRoutes from './routes/fake-population.routes';
import { FakePopulationService } from './services/fake-population.service';
import { FakePopulationController } from './controllers/fake-population.controller';

export class FakesModule {
  public router: Router;
  private fakePopulationService: FakePopulationService;
  private fakePopulationController: FakePopulationController;

  constructor() {
    this.fakePopulationService = new FakePopulationService();
    this.fakePopulationController = new FakePopulationController(this.fakePopulationService);
    this.router = fakePopulationRoutes(this.fakePopulationController);
  }

  /**
   * Effectue le peuplement des données factices et affiche le résultat dans la console.
   */
  public async seedFakes(): Promise<void> {
    const { usersCreated, dinosaursCreated } = await this.fakePopulationService.populateFakeData();
    console.log(`Seed Fakes: ${usersCreated} utilisateurs et ${dinosaursCreated} dinosaures créés.`);
  }
}
