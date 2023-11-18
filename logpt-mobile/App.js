import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, Text, View } from "native-base";
import { MessageBox } from "./src/components/message-box";

export default function App() {
  return (
    <NativeBaseProvider>
      <View
        bg={"#2e4057"}
        flex={1}
        justifyContent={"center"}
        alignItems={"center"}
        px={6}>
        <Text color={"#f4ebd9"}>Welcome to LoGPT!</Text>
        <MessageBox message={"Sa"} incoming />
        <MessageBox message={"Sa"} />
        <StatusBar style="auto" />
      </View>
    </NativeBaseProvider>
  );
}
