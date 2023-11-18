import admin from 'firebase-admin';
import { env } from 'process';
import { requireEnvVar } from '../utils';

const firebaseCredential = requireEnvVar('FIREBASE_CREDENTIAL');
export const firebaseClient = admin.initializeApp({
  credential: admin.credential.cert(firebaseCredential),
});

export const getUserByToken = async (token: string) => {
  const user = await firebaseClient.auth().verifyIdToken(token);
  return user;
};
