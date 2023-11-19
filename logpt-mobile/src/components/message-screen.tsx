import { Icon } from "@rneui/base";
import { Input, KeyboardAvoidingView, ScrollView, View } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import { UserContext } from "../../App";
import { colors } from "../lib/colors";
import { getHistory } from "../lib/get-history";
import { getMessages } from "../lib/get-messages";
import { sendMessage } from "../lib/send-message";
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

export function MessageScreen({ sessionId }: MessageScreenProps) {
  const { user, setUser } = useContext(UserContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [allSessions, setSessions] = useState<Session[]>([]);
  const [currentSession, setCurrentSession] = useState<Session>(allSessions[0]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [showLeftMenu, setShowLeftMenu] = useState(false);

  console.log("msgs:", messages, "CS:", currentSession);
  useEffect(() => {
    user
      .getIdToken()
      .then((token) =>
        getHistory(token).then((response) => setSessions(response))
      );
  }, []);
  useEffect(() => {
    setCurrentSession(allSessions[0]);
    user.getIdToken().then((token) =>
      getMessages(token, allSessions[0].id).then((response) => {
        console.log("RESP:", response);
        setMessages(response);
      })
    );
  }, [allSessions]);

  function handleSessionChange(sessionId: string) {
    const newSession = sessions.find((session) => session.id === sessionId);
    if (!newSession) return;
    setCurrentSession(newSession);
    setShowLeftMenu(false);
  }
  async function handleSend() {
    const token = await user.getIdToken();
    const response = await sendMessage(
      token,
      currentSession.id,
      currentMessage
    );
    setMessages([
      ...messages,
      {
        author: currentSession.author,
        id: response.id,
        content: currentMessage,
        sessionID: currentSession.id,
        time: new Date().toISOString(),
      },
      response,
    ]);
  }
  const toggleMenu = () => setShowLeftMenu(!showLeftMenu);
  return (
    <KeyboardAvoidingView
      flex={1}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <MessageScreenHeader
        toggleMenu={toggleMenu}
        title={currentSession ? currentSession.title : ""}
        sessions={allSessions}
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
            {messages.map((message, index) => (
              <MessageBox
                key={message.id}
                message={message.content}
                time={message.time}
                incoming={message.author != currentSession.author}
                isHistoryMessage={index < messages.length - 1}
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
