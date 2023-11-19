import { Icon } from "@rneui/base";
import { Input, KeyboardAvoidingView, ScrollView, View } from "native-base";
import React, { useContext, useState } from "react";
import { Platform } from "react-native";
import { UserContext } from "../../App";
import { colors } from "../lib/colors";
import { Message } from "../types/MessageType";
import { Session } from "../types/SessionType";
import { LeftMenu } from "./left-menu";
import { MessageBox } from "./message-box";
import { MessageScreenHeader } from "./message-screen-header";

export interface MessageScreenProps {
  sessionId: string;
}

const sessions: Session[] = [
  {
    id: "s1",
    author: "Burak",
    time: new Date(),
    title: "Session 1",
  },
  {
    id: "s2",
    author: "Burak",
    time: new Date(),
    title: "Session 2",
  },
  {
    id: "s3",
    author: "Burak",
    time: new Date(),
    title: "Session 3",
  },
  {
    id: "s4",
    author: "Burak",
    time: new Date(),
    title: "Session 4",
  },
  {
    id: "s5",
    author: "Burak",
    time: new Date(),
    title: "Session 5",
  },
];

const msgs: Message[] = [
  {
    id: "m0",
    author: "CIeoT3QMyXcmbIsXR2ZzMxUzYph1",
    content: "Sa",
    sessionID: "s1",
    time: new Date(),
  },
  {
    id: "m1",
    author: "bot",
    content: "As",
    sessionID: "s1",
    time: new Date(),
  },
  {
    id: "m2",
    author: "CIeoT3QMyXcmbIsXR2ZzMxUzYph1",
    content: "Nbr",
    sessionID: "s1",
    time: new Date(),
  },
  {
    id: "m3",
    author: "bot",
    content: "Ii, sndn",
    sessionID: "s1",
    time: new Date(),
  },
  {
    id: "m4",
    author: "CIeoT3QMyXcmbIsXR2ZzMxUzYph1",
    content: "iidr tşq",
    sessionID: "s1",
    time: new Date(),
  },
  {
    id: "m5",
    author: "bot",
    content: "öd",
    sessionID: "s1",
    time: new Date(),
  },
  {
    id: "m6",
    author: "CIeoT3QMyXcmbIsXR2ZzMxUzYph1",
    content: "bb",
    sessionID: "s1",
    time: new Date(),
  },
  {
    id: "m7",
    author: "bot",
    content: "bb",
    sessionID: "s1",
    time: new Date(),
  },
];
export function MessageScreen({ sessionId }: MessageScreenProps) {
  const { user, setUser } = useContext(UserContext);
  const [messages, setMessages] = useState(msgs);
  const [currentSession, setCurrentSession] = useState(sessions[0]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [showLeftMenu, setShowLeftMenu] = useState(false);
  function handleSessionChange(sessionId: string) {
    const newSession = sessions.find((session) => session.id === sessionId);
    if (!newSession) return;
    setCurrentSession(newSession);
    setShowLeftMenu(false);
  }
  function handleSend() {
    setMessages([
      ...messages,
      {
        id: `m${messages.length}`,
        author: user?.uid as string,
        content: currentMessage,
        sessionID: sessionId,
        time: new Date(),
      },
    ]);
    setCurrentMessage("");
  }
  const toggleMenu = () => setShowLeftMenu(!showLeftMenu);
  return (
    <KeyboardAvoidingView
      flex={1}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <MessageScreenHeader
        toggleMenu={toggleMenu}
        title={currentSession.title}
        sessions={[currentSession]}
      />
      <View flexDirection={"row"} flex={1}>
        {showLeftMenu && (
          <LeftMenu
            sessions={sessions}
            handleSessionChange={handleSessionChange}
          />
        )}
        <ScrollView
          style={{ transform: [{ scaleY: -1 }] }}
          flex={1}
          flexGrow={1}>
          <View style={{ transform: [{ scaleY: -1 }] }}>
            {messages.map((message) => (
              <MessageBox
                key={message.id}
                message={message.content}
                time={message.time}
                incoming={message.author != user?.uid}
              />
            ))}
          </View>
        </ScrollView>
      </View>
      <Input
        placeholder="Enter message..."
        size={"2xl"}
        width={"90%"}
        alignSelf={"center"}
        py={4}
        mb={4}
        mt={4}
        fontSize={"md"}
        color={colors.text.primary}
        value={currentMessage}
        onChangeText={setCurrentMessage}
        rightElement={
          <Icon
            onPress={() => handleSend()}
            style={{ paddingRight: 12 }}
            name="send"
            color={colors.text.primary}
          />
        }></Input>
    </KeyboardAvoidingView>
  );
}
