import { Router } from 'express';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import authRoutes from './routes/auth.routes';

export class AuthModule {
  public router: Router;
  private authService: AuthService;
  private authController: AuthController;

  constructor() {
    this.authService = new AuthService();
    this.authController = new AuthController(this.authService);
    this.router = authRoutes(this.authController);
  }

  /**
   * Initialise le module en peuplant l'administrateur par défaut.
   */
  public async populateDefaultAdmins(): Promise<void> {
    await this.authService.populateDefaultAdmins();
    console.log("Initialisation du module Auth terminée.");
  }
}