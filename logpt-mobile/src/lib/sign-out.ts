import { getAuth, User } from "firebase/auth";

export async function signOut(setUser: (arg: User | null) => void) {
  const auth = getAuth();
  // TODO: Logout
  const result = await auth
    .signOut()
    .then(() => {
      // Signed in
      setUser(null);
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
