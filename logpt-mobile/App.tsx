import { StatusBar } from "expo-status-bar";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { NativeBaseProvider, Text, View } from "native-base";
import { createContext, useState } from "react";
import { LoginRegisterModal } from "./src/components/login-register-modal";
import { MessageBox } from "./src/components/message-box";

export const UserContext = createContext({
  user: undefined,
  setUser: (user) => {},
});
export default function App() {
  const [user, setUser] = useState(undefined);
  console.log("CRED:", process.env);
  const firebaseConfig = {
    apiKey: "AIzaSyCpZWPR2vUuQU_4ddZZtoFOf8dadb86GfQ",
    authDomain: "logpt-d400d.firebaseapp.com",
    databaseURL: "https://logpt-d400d.firebaseio.com",
    projectId: "logpt-d400d",
    storageBucket: "logpt-d400d.appspot.com",
    messagingSenderId: "153520068577",
    appId: "1:153520068577:web:1428760e884568451264a0",
    measurementId: "G-321MSQ0BDB",
  };

  const fireBaseApp = initializeApp(firebaseConfig);

  const auth = getAuth(fireBaseApp);
  return (
    <NativeBaseProvider>
      <UserContext.Provider
        value={{ user: auth.currentUser, setUser: setUser }}>
        <View
          bg={"#2e4057"}
          flex={1}
          justifyContent={"center"}
          alignItems={"center"}
          px={6}>
          <Text color={"#f4ebd9"}>Welcome to LoGPT!</Text>
          <MessageBox message={"Sa"} incoming />
          <MessageBox message={"Sa"} />
          <LoginRegisterModal type="Login" />
          <StatusBar style="auto" />
        </View>
      </UserContext.Provider>
    </NativeBaseProvider>
  );
}
