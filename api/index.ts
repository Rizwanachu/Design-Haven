import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import { registerRoutes } from '../server/routes';
import { createServer } from 'http';

const app = express();
app.use(express.json());

// Helper to handle the async registerRoutes
const startServer = async () => {
  const httpServer = createServer(app);
  await registerRoutes(httpServer, app);
};

const serverPromise = startServer();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await serverPromise;
  
  return new Promise((resolve, reject) => {
    app(req as any, res as any, (err: any) => {
      if (err) {
        return reject(err);
      }
      resolve(true);
    });
  });
}
