import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useTabIndex, useTabNavigation} from "react-native-paper-tabs";
import React, {forwardRef, Ref, useImperativeHandle, useState} from "react";
import LoginInput from "../../../../atoms/LoginInput";

type AccountStepProps = {
  signUp: () => void
  setStepCompleted: (disabled: boolean) => void
  stepCompleted: boolean
}

export type AccountStepRef = {
  username: string,
  password: string
}

const AccountStep = (props: AccountStepProps, ref: Ref<AccountStepRef>) => {
  const goTo = useTabNavigation();
  const index = useTabIndex();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useImperativeHandle(ref, () => ({
    username,
    password
  }), [username, password]);

  return (
    <View style={styles.root}>
      <View style={styles.inputsWrapper}>
        <LoginInput placeholder={"Username"} setValue={setUsername} value={username}></LoginInput>
        <LoginInput placeholder={"Password"} setValue={setPassword} value={password}></LoginInput>
        <LoginInput placeholder={"Confirm Password"} setValue={setConfirmPassword}
                    value={confirmPassword}></LoginInput>
      </View>
      <View style={styles.nextButtonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => {
          goTo(index - 1)
        }}>
          <Text style={styles.nextButtonText}>Back</Text>
        </ TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={props.signUp}>
          <Text style={styles.nextButtonText}>Submit</Text>
        </ TouchableOpacity>

      </View>
    </View>
  );
}
export default forwardRef(AccountStep)
const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  inputsWrapper: {
    flex: 75,
    width: "100%",
    justifyContent: "flex-start",
  },
  nextButtonContainer: {
    flex: 25,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",

  },
  backButton: {
    borderRadius: 12,
    backgroundColor: "#FDFDFD",
    alignSelf: "center",
    justifyContent: "center",
    width: '36%',
    height: '58%',
  },
  nextButton: {
    borderRadius: 12,
    backgroundColor: "#FDFDFD",
    alignSelf: "center",
    justifyContent: "center",
    width: '36%',
    height: '58%',
  },
  nextButtonText: {
    fontFamily: "Lato",
    fontSize: 22,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 26,
    textAlign: "center",
    letterSpacing: -0.02,
    alignSelf: "center",
    color: "#000000"
  },
})
