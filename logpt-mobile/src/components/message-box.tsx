import { format } from "date-fns";
import { Box, Text, View } from "native-base";
import { ColorType } from "native-base/lib/typescript/components/types";
import React, { useMemo, useState } from "react";
import { ViewStyle } from "react-native";
import { colors } from "../lib/colors";

export interface MessageBoxProps {
  message: string;
  time: string;
  incoming?: boolean;
  isHistoryMessage?: boolean;
}

interface BubbleIndicatorProps {
  backgroundColor: ColorType;
  incoming: boolean;
}
function BubbleIndicator({ backgroundColor, incoming }: BubbleIndicatorProps) {
  const bubbleStyle: ViewStyle = incoming ? { left: 0 } : { right: 0 };
  const indicatorStyle: ViewStyle = incoming
    ? {
        right: 0,
        borderBottomRightRadius: 100,
      }
    : {
        left: 0,
        borderBottomLeftRadius: 100,
      };
  return (
    <View
      position={"absolute"}
      bg={backgroundColor}
      zIndex={100}
      bottom={0}
      width={4}
      height={4}
      style={bubbleStyle}>
      <Box
        position={"absolute"}
        bottom={0}
        width={8}
        height={8}
        bg={colors.background.primary}
        style={indicatorStyle}></Box>
    </View>
  );
}

export function MessageBox({
  message,
  incoming = false,
  time,
  isHistoryMessage,
}: MessageBoxProps) {
  const backgroundColor: ColorType = useMemo(
    () => colors.message[incoming ? "incoming" : "outgoing"].background,
    [incoming]
  );
  const index = React.useRef(0);
  const [messageToShow, setMessageToShow] = useState(
    incoming && !isHistoryMessage ? "" : message
  );
  if (incoming && !isHistoryMessage && messageToShow !== message) {
    setTimeout(() => {
      setMessageToShow(messageToShow + message[index.current]);
      index.current++;
    }, 100);
  }
  return (
    <View
      alignSelf={incoming ? "flex-start" : "flex-end"}
      px={4}
      my={1}
      maxWidth={"50%"}>
      <Box
        bg={backgroundColor}
        px={4}
        py={2}
        borderRadius={8}
        borderBottomRightRadius={incoming ? 8 : 0}
        borderBottomLeftRadius={incoming ? 0 : 8}>
        <Text
          color={colors.text[incoming ? "primary" : "secondary"]}
          fontWeight={500}
          fontSize={"md"}>
          {messageToShow}
        </Text>
        <Text
          alignSelf={incoming ? "flex-start" : "flex-end"}
          fontSize={"xs"}
          color={colors.text.tertiary}>
          {format(new Date(time), "hh:mm")}
        </Text>
      </Box>
      <BubbleIndicator backgroundColor={backgroundColor} incoming={incoming} />
    </View>
  );
}
