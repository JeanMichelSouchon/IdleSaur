import { Router } from 'express';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import usersRoutes from './routes/users.routes';
import { PlayerScoreRepository } from './repositories/player-score.repository';

export class UsersModule {
  public router: Router;
  private usersService: UsersService;
  private usersController: UsersController;

  constructor() {
    const playerScoreRepo = new PlayerScoreRepository();
    this.usersService = new UsersService(playerScoreRepo);
    this.usersController = new UsersController(this.usersService);
    this.router = usersRoutes(this.usersController);
  }
}