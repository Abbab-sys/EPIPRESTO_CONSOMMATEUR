import React from "react";
import {HelperText, Text, TextInput} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import {Error} from "../types/errors/Error";
import { useTranslation } from "react-i18next";

export type LoginInputProps = {
  value: string,
  setValue: (value: string) => void,
  errors?: Error[],
  label?: string;
  placeholder?: string;
}
const LoginInput = (props: LoginInputProps) => {

  const {t} = useTranslation('translation')

  const errors = props.errors || [];

  return (
    <View style={styles.root}>
      <View style={styles.leftBlank}></View>
      <View style={styles.textInputContainer}>
        <View style={styles.loginTextWrapper}>
          <Text numberOfLines={1} style={styles.nextButtonText}>{props.placeholder ? props.placeholder : ""}</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.textInputWrapper}>
            <TextInput style={styles.textInput} theme={{roundness: 12}}
                       mode={"outlined"} value={props.value} onChangeText={props.setValue}>
            </TextInput>
            {errors.length>0? <HelperText type="error" visible={errors.length > 0}>
              {errors.length > 0 && t(errors[0].messageKey)}
            </HelperText> : null}
          </View>
        </View>
      </View>

      <View style={styles.rightBlank}></View>
    </View>

  )
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
  },
  leftBlank: {
    flex: 77,
  },
  rightBlank: {
    flex: 74,
  },
  textInputContainer: {
    flex: 224,
    flexDirection: 'column',
  },
  loginTextWrapper: {
    flex: 26,
    justifyContent: 'flex-end',
  },
  nextButtonText: {
    fontFamily: "Lato",
    fontSize: 22,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 26,
    letterSpacing: -0.02,
    color: "#000000",


  },
  inputContainer: {
    flex: 40,
  },
  textInputWrapper: {
    flex: 1,
  },
  textInput: {},

})
export default LoginInput;
