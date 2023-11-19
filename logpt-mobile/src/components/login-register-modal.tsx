import {
  AlertDialog,
  Button,
  Heading,
  Input,
  Link,
  Modal,
  Text,
  View,
} from "native-base";
import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../../App";
import { colors } from "../lib/colors";
import { resetPassword } from "../lib/reset-password";
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
  const [authenticated, setAuthenticated] = useState<boolean | undefined>(
    undefined
  );
  const [sentEmail, setSentEmail] = useState(false);
  const [emailError, setEmailError] = useState(false);
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
      setAuthenticated(authResult as boolean);
    }
  }
  const cancelRef = useRef(null);
  return (
    <Modal isOpen={isOpen}>
      <AlertDialog leastDestructiveRef={cancelRef} isOpen={sentEmail}>
        <AlertDialog.Content padding={12} alignItems={"center"}>
          <Text>Sent email to {email}.</Text>
          <Button mt={6} onPress={() => setSentEmail(false)}>
            OK
          </Button>
          <AlertDialog.CloseButton />
        </AlertDialog.Content>
      </AlertDialog>
      <View
        bg={colors.background.primary}
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
        {!pageValidity && (
          <Text color={colors.border.error} mt={2} textAlign={"right"}>
            Please fill in all the fields!
          </Text>
        )}
        {authenticated === false && (
          <Text color={colors.border.error} mt={2} textAlign={"right"}>
            Incorrect email or password!
          </Text>
        )}
        {pageType === "Login" && (
          <Button
            mt={6}
            _text={{ fontSize: "md", fontWeight: 500 }}
            onPress={() => {
              if (email.length === 0 || !isEmailValid(email)) {
                setEmailError(true);
                return;
              }
              setEmailError(false);
              resetPassword(email);
              setSentEmail(true);
            }}>
            Reset Password
          </Button>
        )}
        {emailError && (
          <Text color={colors.border.error} mt={2} textAlign={"right"}>
            Please enter a valid email
          </Text>
        )}
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
