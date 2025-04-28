import { Router } from 'express';
import { authenticateJWT } from '../../auth/middlewares/authMiddleware';
import { ShopController } from '../controllers/shop.controller';
import { DinosaurMiddleware } from '../../dinosaurs/middlewares/dinosaur.middleware';

/**
 * Définit les routes du shop pour l'ensemble des game assets.
 *
 * @param shopController Instance de ShopController.
 * @param dinosaurMiddleware Middleware pour récupérer et mettre à jour le dinosaure.
 * @returns Router configuré pour le shop.
 */
export default function (
  shopController: ShopController,
  dinosaurMiddleware: DinosaurMiddleware
): Router {
  const router = Router();

  // Récupération de tous les assets disponibles
  router.get(
    '/shop/assets',
    (req, res, next) => {
      shopController.getAllAssets(req, res).catch(next);
    }
  );

  // Achat d'une compétence classique
  router.post(
    '/shop/skills/:skillId',
    authenticateJWT,
    dinosaurMiddleware.fetchAndUpdateDinosaur,
    (req, res, next) => {
      shopController.purchaseSkill(req, res).catch(next);
    }
  );

  // Achat d'une Soul Skill
  router.post(
    '/shop/soul-skills/:soulSkillId',
    authenticateJWT,
    dinosaurMiddleware.fetchAndUpdateDinosaur,
    (req, res, next) => {
      shopController.purchaseSoulSkill(req, res).catch(next);
    }
  );

  // Achat d'un item
  router.post(
    '/shop/items/:itemId',
    authenticateJWT,
    dinosaurMiddleware.fetchAndUpdateDinosaur,
    (req, res, next) => {
      shopController.purchaseItem(req, res).catch(next);
    }
  );

  // Upgrade d'un item
  router.patch(
    '/shop/items/:itemId/upgrade',
    authenticateJWT,
    dinosaurMiddleware.fetchAndUpdateDinosaur,
    (req, res, next) => {
      shopController.upgradeItem(req, res).catch(next);
    }
  );

  // Achat d'un bâtiment
  router.post(
    '/shop/buildings/:buildingId',
    authenticateJWT,
    dinosaurMiddleware.fetchAndUpdateDinosaur,
    (req, res, next) => {
      shopController.purchaseBuilding(req, res).catch(next);
    }
  );

  // Upgrade d'un bâtiment (achat d'un upgrade spécifique)
  router.patch(
    '/shop/buildings/:buildingId/upgrade/:upgradeId',
    authenticateJWT,
    dinosaurMiddleware.fetchAndUpdateDinosaur,
    (req, res, next) => {
      shopController.upgradeBuilding(req, res).catch(next);
    }
  );

  return router;
}
