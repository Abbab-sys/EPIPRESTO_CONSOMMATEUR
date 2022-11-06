import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useTabIndex, useTabNavigation} from "react-native-paper-tabs";
import React, {forwardRef, Ref, useImperativeHandle, useMemo, useState} from "react";
import LoginInput from "../../../../atoms/LoginInput";
import {useUsernameValidator} from "../../../../hooks/validators/useUsernameValidator";
import {useMandatoryFieldValidator} from "../../../../hooks/validators/useMandatoryFieldValidator";
import {useConfirmPasswordValidator} from "../../../../hooks/validators/useConfirmPasswordValidator";
import {Error} from "../../../../types/errors/Error";
import { useTranslation } from "react-i18next";

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
  const {t} = useTranslation('translation')
  const goTo = useTabNavigation();
  const index = useTabIndex();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const usernameErrors = useUsernameValidator(username)
  const passwordErrors: Error[] = []
  const confirmPasswordErrors = useConfirmPasswordValidator(password, confirmPassword)


  const stepCompleted = useMemo(() => {
    return !!username && !!password && !!confirmPassword && usernameErrors.length === 0 && passwordErrors.length === 0 && confirmPasswordErrors.length === 0
  }, [username, password, confirmPassword, usernameErrors.length, passwordErrors.length, confirmPasswordErrors.length])

  useImperativeHandle(ref, () => ({
    username,
    password
  }), [username, password]);

  return (
    <View style={styles.root}>
      <View style={styles.inputsWrapper}>
        <LoginInput
          errors={usernameErrors}
          placeholder={t('signUp.stepper.account.username.title')}
          setValue={setUsername}
          value={username}
        />
        <LoginInput
          errors={passwordErrors}
          placeholder={t('signUp.stepper.account.password')}
          setValue={setPassword}
          value={password}
        />
        <LoginInput
          errors={confirmPasswordErrors}
          placeholder={t('signUp.stepper.account.confirmPassword.title')}
          setValue={setConfirmPassword}
          value={confirmPassword}
        />
      </View>
      <View style={styles.nextButtonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => {
          goTo(index - 1)
        }}>
          <Text style={styles.nextButtonText}>{t('signUp.previous')}</Text>
        </ TouchableOpacity>
        <TouchableOpacity style={!stepCompleted ? styles.nextButtonDisabled : styles.nextButton} onPress={props.signUp}
                          disabled={!stepCompleted}>
          <Text style={styles.nextButtonText}>{t('signUp.stepper.account.submit')}</Text>
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
  nextButtonDisabled: {
    borderRadius: 12,
    backgroundColor: "#FDFDFD96",
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
