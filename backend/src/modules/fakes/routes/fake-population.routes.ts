import { Router } from 'express';
import { FakePopulationController } from '../controllers/fake-population.controller';

export default function(fakePopulationController: FakePopulationController): Router {
  const router = Router();
  // Exemple : POST /fakes/populate?userCount=15&dinoCount=30
  router.post('/populate', fakePopulationController.populate);
  return router;
}
