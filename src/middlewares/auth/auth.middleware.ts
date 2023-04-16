import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['auth-user']; // Récupérer le token depuis le header 'auth-user'
    if (token) {
      try {
        const decoded = verify(token, 'your-secret-key'); // Décoder le token avec la clé secrète appropriée
        req['userId'] = decoded['userId']; // Injecter la propriété userId dans l'objet request
        next();
      } catch (err) {
        res.json({ message: 'Token invalide' }); // Retourner une réponse d'erreur si le token est invalide
      }
    } else {
      res.json({ message: 'Accès non autorisé' }); // Retourner une réponse d'erreur si le token n'existe pas
    }
  }
}
