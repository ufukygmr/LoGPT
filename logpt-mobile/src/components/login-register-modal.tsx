import { Icon } from "@rneui/base";
import { Button, Heading, Input, Link, Modal, Text, View } from "native-base";
import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import { colors } from "../lib/colors";
import { signIn } from "../lib/sign-in";
import { signUp } from "../lib/sign-up";
import { isEmailValid } from "../lib/validate-email";

export interface LoginRegisterModalProps {
  type: "Login" | "Register";
}

export function LoginRegisterModal({ type }: LoginRegisterModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [pageType, setPageType] = useState(type);
  const [authenticated, setAuthenticated] = useState(false);
  const [fieldValidity, setFieldValidity] = useState({
    email: true,
    password: true,
    name: true,
    surname: true,
  });
  const [pageValidity, setPageValidity] = useState(true);
  const [isOpen, setOpen] = useState(true);

  const { user, setUser } = useContext(UserContext);

  function checkAndSetPageValidity() {
    const validity = {
      email: isEmailValid(email),
      password: password.length > 0,
      name: pageType === "Login" || name.length > 0,
      surname: pageType === "Login" || surname.length > 0,
    };
    setFieldValidity(validity);
    setPageValidity(!Object.values(validity).includes(false));
  }

  async function handleLoginOrRegister() {
    checkAndSetPageValidity();
    if (pageValidity) {
      const authResult =
        pageType === "Login"
          ? await signIn(email, password, setUser)
          : await signUp(email, password, `${name} ${surname}`, setUser);
      if (authResult) setAuthenticated(true);
    }
  }

  if (authenticated) {
    setTimeout(() => {
      setOpen(false);
    }, 3000);
    return (
      <Modal isOpen={isOpen}>
        <View
          bg={colors.background}
          h={"80%"}
          w={"80%"}
          borderColor={colors.border.modal}
          borderWidth={1}
          padding={6}
          borderRadius={8}
          justifyContent={"center"}
          alignItems={"center"}>
          <Icon name="check-circle" size={48} color={colors.text.primary} />
          <Heading size={"xl"} color={colors.text.primary}>
            Welcome, {user.displayName}!
          </Heading>
        </View>
      </Modal>
    );
  }
  return (
    <Modal isOpen={isOpen}>
      <View
        bg={colors.background}
        h={"80%"}
        w={"80%"}
        borderColor={colors.border.modal}
        borderWidth={1}
        padding={6}
        borderRadius={8}
        justifyContent={"center"}>
        <Heading
          size={"lg"}
          color={colors.text.primary}
          alignSelf={"center"}
          mb={12}>
          Welcome to LoGPT!
        </Heading>
        <Heading
          size={"xl"}
          color={colors.text.primary}
          alignSelf={"center"}
          mb={12}>
          {pageType}
        </Heading>
        {pageType === "Register" && (
          <View flexDirection={"row"} justifyContent={"space-between"} mb={4}>
            <View width={"49%"}>
              <Heading size={"sm"} color={colors.text.primary}>
                Name
              </Heading>
              <Input
                autoCorrect={false}
                isInvalid={!fieldValidity.name}
                value={name}
                onChangeText={setName}
                placeholder={"name"}
                color={colors.text.primary}
                size={"md"}
              />
            </View>
            <View width={"49%"}>
              <Heading size={"sm"} color={colors.text.primary}>
                Surname
              </Heading>
              <Input
                autoCorrect={false}
                isInvalid={!fieldValidity.surname}
                value={surname}
                onChangeText={setSurname}
                placeholder={"surname"}
                color={colors.text.primary}
                size={"md"}
              />
            </View>
          </View>
        )}
        <Heading size={"sm"} color={colors.text.primary}>
          Email Address
        </Heading>
        <Input
          autoCorrect={false}
          isInvalid={!fieldValidity.email}
          value={email}
          onChangeText={setEmail}
          placeholder={"email"}
          color={colors.text.primary}
          size={"md"}
        />
        <Heading size={"sm"} color={colors.text.primary} mt={4}>
          Password
        </Heading>
        <Input
          autoCorrect={false}
          isInvalid={!fieldValidity.password}
          value={password}
          onChangeText={setPassword}
          placeholder={"password"}
          color={colors.text.primary}
          size={"md"}
          type="password"
        />
        <Button
          mt={12}
          _text={{ fontSize: "md", fontWeight: 500 }}
          onPress={handleLoginOrRegister}>
          {pageType}
        </Button>
        <Text
          color={colors.border.error}
          opacity={pageValidity ? 0 : 100}
          mt={2}
          textAlign={"right"}>
          Please fill in all the fields!
        </Text>
        <Link
          _text={{ color: colors.text.primary }}
          onPress={() =>
            setPageType(pageType === "Login" ? "Register" : "Login")
          }
          position={"absolute"}
          bottom={8}
          alignSelf={"center"}>
          {pageType === "Register"
            ? "Already registered? Login!"
            : "Don't have an account yet? Register!"}
        </Link>
      </View>
    </Modal>
  );
}
