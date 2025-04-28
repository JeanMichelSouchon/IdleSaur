import api from './api';
import { ShopAssetsDTO } from '../types/shop-assets.dto';
import { Dinosaur } from '../types/Dinosaur';

/**
 * Service dédié aux opérations du game-assets.
 * Fournit des méthodes pour récupérer les assets disponibles et effectuer les achats/upgrades.
 */
export const fetchShopAssets = async (): Promise<ShopAssetsDTO> => {
  const response = await api.get('/game-assets/shop/assets');
  return response.data;
};

export const purchaseSkill = async (skillId: number): Promise<{ dinosaur: Dinosaur; message: string }> => {
  const response = await api.post(`/game-assets/shop/skills/${skillId}`);
  return response.data;
};

export const purchaseSoulSkill = async (soulSkillId: number): Promise<{ dinosaur: Dinosaur; message: string }> => {
  const response = await api.post(`/game-assets/shop/soul-skills/${soulSkillId}`);
  return response.data;
};

export const purchaseItem = async (itemId: number): Promise<{ dinosaur: Dinosaur; message: string }> => {
  const response = await api.post(`/game-assets/shop/items/${itemId}`);
  return response.data;
};

export const upgradeItem = async (itemId: number): Promise<{ dinosaur: Dinosaur; message: string }> => {
  const response = await api.patch(`/game-assets/shop/items/${itemId}/upgrade`);
  return response.data;
};

export const purchaseBuilding = async (buildingId: number): Promise<{ dinosaur: Dinosaur; message: string }> => {
  const response = await api.post(`/game-assets/shop/buildings/${buildingId}`);
  return response.data;
};

export const upgradeBuilding = async (buildingId: number, upgradeId: number): Promise<{ dinosaur: Dinosaur; message: string }> => {
  const response = await api.patch(`/game-assets/shop/buildings/${buildingId}/upgrade/${upgradeId}`);
  return response.data;
};
