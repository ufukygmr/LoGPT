import { Icon } from "@rneui/base";
import {
  Input,
  KeyboardAvoidingView,
  ScrollView,
  Spinner,
  View,
} from "native-base";
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

export function MessageScreen({ sessionId }: MessageScreenProps) {
  const { user, setUser } = useContext(UserContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [allSessions, setSessions] = useState<Session[]>([]);
  const [currentSession, setCurrentSession] = useState<Session>(allSessions[0]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [showLeftMenu, setShowLeftMenu] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

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
        setMessages(response);
      })
    );
  }, [allSessions]);

  function handleSessionChange(sessionId: string) {
    const newSession = allSessions.find((session) => session.id === sessionId);
    if (!newSession) return;
    setCurrentSession(newSession);
    user.getIdToken().then((token) =>
      getMessages(token, allSessions[0].id).then((response: Message[]) => {
        setMessages(response);
      })
    );
    setShowLeftMenu(false);
  }
  async function handleSend() {
    setIsWaiting(true);
    const token = await user.getIdToken();
    setMessages([
      ...messages,
      {
        author: currentSession.author,
        id: "",
        content: currentMessage,
        sessionID: currentSession.id,
        time: new Date().toISOString(),
      },
    ]);
    setCurrentMessage("");
    const response = await sendMessage(
      token,
      currentSession.id,
      currentMessage
    );
    setMessages([...messages, response]);
    setIsWaiting(false);
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
            sessions={allSessions}
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
                key={index}
                message={message.content}
                time={message.time}
                incoming={message.author !== currentSession.author}
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
        isDisabled={isWaiting}
        rightElement={
          isWaiting ? (
            <Spinner paddingRight={6} color={colors.text.primary} />
          ) : (
            <Icon
              onPress={() => handleSend()}
              style={{ paddingRight: 12 }}
              name="send"
              color={colors.text.primary}
            />
          )
        }></Input>
    </KeyboardAvoidingView>
  );
}
