import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, Text, View } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider>
      <View
        bg={"#2e4057"}
        flex={1}
        justifyContent={"center"}
        alignItems={"center"}>
        <Text color={"#f4ebd9"}>Welcome to LoGPT!</Text>
        <StatusBar style="auto" />
      </View>
    </NativeBaseProvider>
  );
}
