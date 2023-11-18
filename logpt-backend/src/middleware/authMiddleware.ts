import { NextFunction, Response } from 'express';
import { getUserByToken } from '../clients/firebaseClient';

export async function firebaseAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  // console.log(JSON.stringify(req.headers['authorization']));
  const bearerHeader = req.headers['authorization'];
  // console.log(' aaaa');
  console.log('Auth Token ==> ', bearerHeader);
  if (!bearerHeader) {
    return res.status(401).json({
      success: false,
      message: 'No authorization header',
    });
  }

  const user = getUserByToken(bearerHeader.split(' ')[1]);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid authorization token',
    });
  }

  return next();
}
