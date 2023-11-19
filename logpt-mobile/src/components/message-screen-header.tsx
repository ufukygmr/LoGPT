import { Icon } from "@rneui/base";
import { Heading, IconButton, Menu, View } from "native-base";
import { IViewProps } from "native-base/lib/typescript/components/basic/View/types";
import React, { useContext } from "react";
import { UserContext } from "../../App";
import { colors } from "../lib/colors";
import { signOut } from "../lib/sign-out";
import { Session } from "../types/SessionType";

export interface MessageScreenHeaderProps extends IViewProps {
  title: string;
  sessions: Session[];
  toggleMenu: () => void;
}

export function MessageScreenHeader({
  title,
  sessions,
  toggleMenu,
  ...props
}: MessageScreenHeaderProps) {
  const { user, setUser } = useContext(UserContext);
  return (
    <View
      flexDirection={"row"}
      width={"100%"}
      alignItems={"center"}
      mt={36}
      borderBottomWidth={1}
      borderColor={colors.text.secondary}>
      <IconButton
        rounded={"full"}
        onPress={toggleMenu}
        icon={<Icon name="menu" size={24} color={colors.text.primary} />}
      />
      <Heading textAlign={"center"} flexGrow={1} color={colors.text.primary}>
        {title}
      </Heading>
      <Menu
        alignSelf={"flex-start"}
        trigger={(triggerProps) => (
          <IconButton
            {...triggerProps}
            rounded={"full"}
            icon={<Icon name="person" size={24} color={colors.text.primary} />}
          />
        )}>
        <Menu.Item>{user?.displayName as string}</Menu.Item>
        <Menu.Group title="Settings">
          <Menu.Item
            onPress={async () => {
              await signOut(setUser);
            }}>
            Log out
          </Menu.Item>
        </Menu.Group>
      </Menu>
    </View>
  );
}
