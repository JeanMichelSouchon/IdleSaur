import { Router } from 'express';
import { authenticateJWT } from '../../auth/middlewares/authMiddleware';
import { authorizeAdmin } from '../../auth/middlewares/authorizeAdmin';
import { AdminController } from '../controllers/admin.controller';

/**
 * Définit les routes pour l'administration.
 * @param adminController Instance de AdminController.
 * @returns Router avec les routes d'administration.
 */
export default function (adminController: AdminController): Router {
  const router = Router();

  // Route pour obtenir le tableau des niveaux avec les paliers d'expérience
  router.get('/levels-xp-table', authenticateJWT, authorizeAdmin, (req, res) => adminController.getLevelsXpTable(req, res));

  // Routes pour la gestion des utilisateurs
  router.get('/users', authenticateJWT, authorizeAdmin, (req, res) => adminController.getAllUsers(req, res));
  router.get('/users/username/:username', authenticateJWT, authorizeAdmin, (req, res) => adminController.getUserByUsername(req, res));
  router.get('/users/email/:email', authenticateJWT, authorizeAdmin, (req, res) => adminController.getUserByEmail(req, res));
  router.get('/users/:id', authenticateJWT, authorizeAdmin, (req, res) => adminController.getUserById(req, res));

  // Ajout de la rotue pour la demande de modification// Route pour exporter et télécharger les utilisateurs créés durant les X dernières semaines
  router.get('/users/export/last-weeks/:weeks?', authenticateJWT, authorizeAdmin, (req, res) => 
    adminController.exportUsersCreatedLastWeeks(req, res)
  );
  
  router.delete('/users/:id', authenticateJWT, authorizeAdmin, (req, res) => adminController.deleteUser(req, res));


  // Routes pour la gestion des dinosaures
  router.get('/dinosaurs', authenticateJWT, authorizeAdmin, (req, res) => adminController.getAllDinosaurs(req, res));
  router.get('/dinosaurs/:id', authenticateJWT, authorizeAdmin, (req, res) => adminController.getDinosaurById(req, res));
  router.post('/dinosaurs', authenticateJWT, authorizeAdmin, (req, res) => adminController.createDinosaur(req, res));
  router.put('/dinosaurs/:id', authenticateJWT, authorizeAdmin, (req, res) => adminController.updateDinosaur(req, res));
  router.delete('/dinosaurs/:id', authenticateJWT, authorizeAdmin, (req, res) => adminController.deleteDinosaur(req, res));

  return router;
}