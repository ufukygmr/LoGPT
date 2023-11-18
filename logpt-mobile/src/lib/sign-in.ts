import { getAuth, signInWithEmailAndPassword, User } from "firebase/auth";

export function signIn(
  email: string,
  password: string,
  setUser: (arg: User) => void
) {
  const auth = getAuth();
  const result = signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      setUser(user);
      return true;
      // ...
    })
    .catch((error) => {
      console.log("error:", error);
      const errorCode = error.code;
      const errorMessage = error.message;
      return false;
    });
  return result;
}
