// 🔧 STUB - Replit Auth désactivé pour déploiement Netlify
// Cette version stub permet au code de compiler sans authentification réelle

import type { Express, Request, Response, NextFunction } from "express";

// Fonction stub pour setup auth (ne fait rien)
export async function setupAuth(app: Express): Promise<void> {
  console.log("⚠️  Auth désactivée (mode Netlify - pas de Replit)");

  // Ajouter req.isAuthenticated() stub sur toutes les requêtes
  app.use((req: any, res: Response, next: NextFunction) => {
    req.isAuthenticated = () => false;
    req.user = null;
    next();
  });
}

// Middleware stub qui passe toujours (pas d'auth requise)
export function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
  // En mode Netlify, on skip l'auth
  // Les routes protégées retourneront 401 si req.isAuthenticated() === false
  next();
}
