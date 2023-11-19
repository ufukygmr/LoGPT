import { Pressable, ScrollView, Text, View } from "native-base";
import React from "react";
import Animated, { SlideInLeft, SlideOutLeft } from "react-native-reanimated";
import { colors } from "../lib/colors";
import { Session } from "../types/SessionType";

export interface LeftMenuProps {
  sessions: Session[];
  handleSessionChange: (sessionId: string) => void;
}

export function LeftMenu({ sessions, handleSessionChange }: LeftMenuProps) {
  return (
    <Animated.View entering={SlideInLeft} exiting={SlideOutLeft}>
      <ScrollView borderRightWidth={1} borderColor={colors.text.secondary}>
        {sessions.map((session) => (
          <Pressable
            key={session.id}
            onPress={() => handleSessionChange(session.id)}
            _pressed={{ bg: colors.background.pressed }}>
            <View
              justifyContent={"center"}
              alignItems={"center"}
              py={4}
              borderBottomWidth={1}
              px={2}
              borderColor={colors.text.secondary}>
              <Text
                fontSize={"md"}
                fontWeight={500}
                color={colors.text.primary}>
                {session.title}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </Animated.View>
  );
}
