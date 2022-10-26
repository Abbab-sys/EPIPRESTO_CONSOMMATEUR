import {useEffect, useRef, useContext} from 'react';
import {SafeAreaView, TextInput, StyleSheet, Button} from "react-native";
import {useLazyQuery} from '@apollo/client';
import {LOGIN_CLIENT_BY_USERNAME, LoginClientByUsernameData} from "../../graphql/queries/LoginClientByUsername";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../navigation/Navigation";
import {ClientAuthenticationContext} from "../../context/ClientAuthenticationContext";

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login: (props: LoginProps) => JSX.Element = () => {

  const {setClientId} = useContext(ClientAuthenticationContext);

  const usernameInputRef = useRef<TextInput & { value: string }>(null);
  const passwordInputRef = useRef<TextInput & { value: string }>(null);

  const [loginByUsername, {data}] = useLazyQuery(LOGIN_CLIENT_BY_USERNAME, {
    fetchPolicy: "network-only",
  });

  const unwrappedData: LoginClientByUsernameData | undefined = data as LoginClientByUsernameData;

  const handleLogin = async () => {
    const username: string | undefined = usernameInputRef.current?.value;
    const password: string | undefined = passwordInputRef.current?.value;
    if (!username || !password) return;
    await loginByUsername({
      variables: {
        username,
        password,
      },
    })
  }

  useEffect(() => {
      if (!unwrappedData) return;
      console.log("loginResult", unwrappedData);
      setClientId(unwrappedData.loginClientByUsername.clientAccount._id);
    }
    , [unwrappedData?.loginClientByUsername.code]);

  const handleUsernameChange = (text: string) => {
    if (!usernameInputRef.current) return
    usernameInputRef.current.value = text;
  }
  const handlePasswordChange = (text: string) => {
    if (!passwordInputRef.current) return
    passwordInputRef.current.value = text;
  }

  return (
    <SafeAreaView style={{flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
      <TextInput ref={usernameInputRef} style={styles.input} placeholder={"Username"}
                 onChangeText={handleUsernameChange}>
      </TextInput>
      <TextInput ref={passwordInputRef} style={styles.input} placeholder={"Password"}
                 onChangeText={handlePasswordChange}>
      </TextInput>

      <Button title={"SUBMIT"} onPress={handleLogin}/>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});


export default Login;
