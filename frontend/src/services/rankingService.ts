import api from './api';

/**
 * Récupère la liste de tous les utilisateurs depuis l'endpoint /users/all
 * (protégé par authenticateJWT d'après ton routeur).
 */
export const fetchRanking = async () => {
  const response = await api.get('/users/all');
  return response.data;
};
