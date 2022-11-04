import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useTabIndex, useTabNavigation} from "react-native-paper-tabs";
import React, {useEffect, useState, forwardRef, useImperativeHandle, Ref} from "react";
import LoginInput from "../../../../atoms/LoginInput";
import {useMandatoryFieldValidator} from "../../../../hooks/validators/useMandatoryFieldValidator";

type InformationsStepProps = {
  setStepCompleted: (disabled: boolean) => void
  stepCompleted: boolean
}
export type InformationsStepRef = {
  firstName: string,
  lastName: string
}

const InformationsStep = (props: InformationsStepProps, ref: Ref<InformationsStepRef>) => {
  const goTo = useTabNavigation();
  const index = useTabIndex();

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  //TODO imperative handle to expose if it is done

  useImperativeHandle(ref, () => ({
    firstName,
    lastName
  }), [firstName, lastName]);

  const checkInputs = (): boolean => {
    if (!firstName) {
      // firstNameInputRef.current?.focus()
      return false
    }
    return !!lastName;
  }

  useEffect(() => {
    props.setStepCompleted(checkInputs())
  }, [firstName, lastName])

  const firstNameErrors=useMandatoryFieldValidator(firstName)
  const lastNameErrors=useMandatoryFieldValidator(lastName)

  return (
    <View style={styles.root}>
      <View style={styles.inputsWrapper}>
        <LoginInput errors={firstNameErrors} placeholder={"First Name"} setValue={setFirstName} value={firstName}></LoginInput>
        <LoginInput errors={lastNameErrors} placeholder={"Last Name"} setValue={setLastName} value={lastName}></LoginInput>
      </View>
      <View style={styles.nextButtonContainer}>
        <TouchableOpacity style={!props.stepCompleted ? styles.nextButtonDisabled : styles.nextButton}
                          onPress={() => {
                            goTo(index + 1)
                          }}
                          disabled={!props.stepCompleted}>
          <Text style={styles.nextButtonText}>Next</Text>
        </ TouchableOpacity>

      </View>
    </View>
  );
}
export default forwardRef(InformationsStep)

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
  nextButtonDisabled: {
    borderRadius: 12,
    backgroundColor: "#FDFDFD96",
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
