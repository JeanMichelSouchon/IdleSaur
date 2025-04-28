import { Request, Response } from 'express';
import { FakePopulationService } from '../services/fake-population.service';

export class FakePopulationController {
  private fakePopulationService: FakePopulationService;

  constructor(fakePopulationService: FakePopulationService) {
    this.fakePopulationService = fakePopulationService;
  }

  /**
   * Route qui déclenche le peuplement de faux utilisateurs et dinosaures.
   * Les paramètres "userCount" et "dinoCount" sont fournis en query string.
   */
  public populate = async (req: Request, res: Response) => {
    try {
      const result = await this.fakePopulationService.populateFakeData();
      res.status(200).json({ message: 'Peuplement effectué avec succès', result });
    } catch (error) {
      console.error("Erreur lors du peuplement des données factices :", error);
      res.status(500).json({ message: 'Erreur lors du peuplement des données factices' });
    }
  }
}
