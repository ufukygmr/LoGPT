import { StatusBar } from "expo-status-bar";
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, User } from "firebase/auth";
import { NativeBaseProvider, View } from "native-base";
import React, { createContext, useState } from "react";
import { LoginRegisterModal } from "./src/components/login-register-modal";
import { MessageScreen } from "./src/components/message-screen";
import { firebaseConfig } from "./src/config/firebase-config";
import { colors } from "./src/lib/colors";

export const UserContext = createContext<{
  user: User | undefined | null;
  setUser: (arg: User | null) => void;
}>({
  user: undefined,
  setUser: (user) => {},
});
export default function App() {
  const fireBaseApp = initializeApp(firebaseConfig);

  const auth = getAuth(fireBaseApp)
    ? getAuth(fireBaseApp)
    : initializeAuth(fireBaseApp);
  const [user, setUser] = useState<User | undefined | null>(auth.currentUser);
  auth.onAuthStateChanged((user) => setUser(user));
  return (
    <NativeBaseProvider>
      <UserContext.Provider
        value={{ user: auth.currentUser, setUser: setUser }}>
        <View bg={colors.background.primary} flex={1}>
          {user ? (
            <MessageScreen sessionId="s1" />
          ) : (
            <LoginRegisterModal type="Login" />
          )}
          <StatusBar style="auto" />
        </View>
      </UserContext.Provider>
    </NativeBaseProvider>
  );
}
