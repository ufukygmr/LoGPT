import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  User,
} from "firebase/auth";

export function signUp(
  email: string,
  password: string,
  displayName: string,
  setUser: (arg: User) => void
) {
  const auth = getAuth();
  const result = createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      updateProfile(user, {
        displayName,
      }).then(() => {
        setUser(auth.currentUser as User);
        return true;
      });
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return false;
      // ..
    });
  return result;
}
