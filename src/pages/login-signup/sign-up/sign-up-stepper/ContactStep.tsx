import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useTabIndex, useTabNavigation} from "react-native-paper-tabs";
import React, {forwardRef, Ref, useEffect, useImperativeHandle, useState} from "react";
import LoginInput from "../../../../atoms/LoginInput";
import {useEmailValidator} from "../../../../hooks/validators/useEmailValidator";
import {usePhoneValidator} from "../../../../hooks/validators/usePhoneValidator";

type ContactStepProps = {
  setStepCompleted: (disabled: boolean) => void
  stepCompleted: boolean
}

export type ContactStepRef = {
  phone: string,
  email: string
}

const ContactStep = (props: ContactStepProps, ref: Ref<ContactStepRef>) => {
  const goTo = useTabNavigation();
  const index = useTabIndex();

  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  const emailErrors = useEmailValidator(email)
  const phoneErrors = usePhoneValidator(phone)

  useImperativeHandle(ref, () => ({
    phone,
    email
  }), [phone, email]);



  useEffect(() => {
    const stepCompleted = !!phone && !!email && emailErrors.length === 0 && phoneErrors.length === 0
    props.setStepCompleted(stepCompleted)
  }, [phone, email, emailErrors.length, phoneErrors.length])

  return (
    <View style={styles.root}>
      <View style={styles.inputsWrapper}>
        <LoginInput errors={phoneErrors} placeholder={"Phone"} setValue={setPhone} value={phone}></LoginInput>
        <LoginInput errors={emailErrors} placeholder={"Email"} setValue={setEmail} value={email}></LoginInput>
      </View>
      <View style={styles.nextButtonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => {
          goTo(index - 1)
        }}>
          <Text style={styles.nextButtonText}>Back</Text>
        </ TouchableOpacity>
        <TouchableOpacity style={!props.stepCompleted ? styles.nextButtonDisabled : styles.nextButton} onPress={() => {
          goTo(index + 1)
        }} disabled={!props.stepCompleted}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default forwardRef(ContactStep)

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  inputsWrapper: {
    flex: 75,
    width: "100%",
    justifyContent: "center",
    marginBottom: "10%",
    marginTop: "10%",
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
