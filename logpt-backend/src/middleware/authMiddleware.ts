import { NextFunction, Response } from 'express';
import { getUserByToken } from '../clients/firebaseClient';

export async function firebaseAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> {
  const bearerHeader = req.headers['authorization'];
  if (!bearerHeader) {
    return res.status(401).json({
      success: false,
      message: 'No authorization header',
    });
  }
  const token = bearerHeader.split(' ')[1];

  const user = getUserByToken(token);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid authorization token',
    });
  }

  return next();
}
