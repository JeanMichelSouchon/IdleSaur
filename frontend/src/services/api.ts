import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

// Création d'une instance Axios avec une configuration de base
const api = axios.create({
    baseURL: 'http://localhost:3000/', // URL de base de votre backend
    headers: {
        'Content-Type': 'application/json', // Type de contenu par défaut
    },
    timeout: 10000, // Temps d'attente maximal pour une requête (en ms)
});

// Intercepteur de requête pour ajouter le token JWT
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token'); // Récupération du token depuis le localStorage
        if (token) {
            // Ajout du token JWT dans l'en-tête Authorization
            config.headers = config.headers || {};
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        // Gestion des erreurs de requête
        return Promise.reject(error);
    }
);

export default api;
