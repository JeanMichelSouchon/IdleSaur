import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Définir la configuration de connexion en utilisant socketPath si nécessaire
const dbConfig = {
  // Si DB_HOST commence par '/', c'est un chemin Unix (socket)
  ...(process.env.DB_HOST && process.env.DB_HOST.startsWith('/')
      ? { socketPath: process.env.DB_HOST }
      : { host: process.env.DB_HOST || 'localhost' }),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'iddlesaur',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const pool = mysql.createPool(dbConfig);

export default pool;
