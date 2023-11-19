import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export async function resetPassword(email: string) {
  const auth = getAuth();
  const result = await sendPasswordResetEmail(auth, email)
    .then((userCredential) => {
      // Signed in
      return true;
      // ...
    })
    .catch((error) => {
      console.log("error:", error);
      return false;
    });
  return result;
}
