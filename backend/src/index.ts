import 'reflect-metadata'; // Required by class-transformer, should be imported before any other import
import * as Sentry from '@sentry/node'; // idem

// Init sentry before any other import
Sentry.init({
  dsn: "https://71c19a9dfe6a45c5a8f3dabc043ae535@o4508799823314944.ingest.de.sentry.io/4508799849594960",
  integrations: [],
  environment: "development",  
  tracesSampleRate: 1.0,
});


import express, { Application } from 'express';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';
import { DinosaursModule } from './modules/dinosaurs/dinosaurs.module';
import { errorHandlerMiddleware } from './common/middlewares/errorHandler';


dotenv.config();

process.on('unhandledRejection', (reason) => {
  Sentry.captureException(reason);
});

process.on('uncaughtException', (error) => {
  Sentry.captureException(error);
});

const app: Application = express();
const PORT = process.env.PORT || 3000;

Sentry.setupExpressErrorHandler(app);

// Middleware
app.use(cors());
app.use(express.json());


// Modules
const usersModule = new UsersModule();
const authModule = new AuthModule();
const adminModule = new AdminModule();
const dinosaursModule = new DinosaursModule();

// Routes
app.use('/auth', authModule.router);
app.use('/users', usersModule.router);
app.use('/admin', adminModule.router);
app.use('/dinosaurs', dinosaursModule.router);
app.get("/debug-sentry", function mainHandler(req, res) {
  const err = new Error("My first Sentry error!");  
  Sentry.captureException(err);
  throw err;
});

app.use(errorHandlerMiddleware);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});

