import admin from 'firebase-admin';
import { requireEnvVar } from '../utils';
// import s from '../../firebase-credential.json';
//TODO: Handle That
// const firebaseCredential = requireEnvVar('FIREBASE_CREDENTIAL');
const firebaseCredential = '/app/firebase-credential.json';
// const firebaseCredential = '/Users/ufukyagmur/Desktop/logpt/logpt-backend/firebase-credential.json';
export const firebaseClient = admin.initializeApp({
  credential: admin.credential.cert(firebaseCredential),
});

export const getUserByToken = async (token: string) => {
  try {
    const user = await firebaseClient.auth().verifyIdToken(token);
    return user;
  } catch (e) {
    console.error(e);
    return null;
  }
};
