import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useTabIndex, useTabNavigation} from "react-native-paper-tabs";
import React, {forwardRef, Ref, useEffect, useImperativeHandle, useState} from "react";
import LoginInput from "../../../../atoms/LoginInput";
import {useStreetNumberValidator} from "../../../../hooks/validators/useStreetNumberValidator";
import {useZipCodeValidator} from "../../../../hooks/validators/useZipCodeValidator";

type AdressStepProps = {
  setStepCompleted: (disabled: boolean) => void
  stepCompleted: boolean
}

export type AdressStepRef = {
  adress: string,
}

const AdressStep = (props: AdressStepProps, ref: Ref<AdressStepRef>) => {
  const goTo = useTabNavigation();
  const index = useTabIndex();

  const [streetNumber, setStreetNumber] = useState('')
  const streetNumberErrors = useStreetNumberValidator(streetNumber)

  const [streetName, setStreetName] = useState('')
  const [city, setCity] = useState('')
  const [zipCode, setZipCode] = useState('')
  const zipCodeErrors = useZipCodeValidator(zipCode)

  const [province, setProvince] = useState('')

  useImperativeHandle(ref, () => ({
    adress: `${streetNumber} ${streetName}, ${city}, ${zipCode}, ${province}`
  }), [streetNumber, streetName, city, zipCode, province]);

  useEffect(() => {
    const stepCompleted = !!streetNumber && streetNumberErrors.length === 0 && !!streetName && !!city && !!zipCode && zipCodeErrors.length === 0 && !!province
    props.setStepCompleted(stepCompleted)
  }, [streetNumber, streetNumberErrors, zipCodeErrors, streetName, city, zipCode, province])

  return (
    <View style={styles.root}>
      <View style={styles.inputsWrapper}>
        <ScrollView style={styles.inputScrollView}>
          <View style={styles.streetNumberWrapper}>
            <LoginInput placeholder={"Number"} setValue={setStreetNumber} value={streetNumber}></LoginInput>
          </View>
          <View style={styles.streetNameWrapper}>
            <LoginInput placeholder={"Street"} setValue={setStreetName} value={streetName}></LoginInput>
          </View>
          <View style={styles.postalNumberWrapper}>
            <LoginInput placeholder={"Postal Code"} setValue={setZipCode} value={zipCode}></LoginInput>
          </View>
          <View style={styles.provinceWrapper}>
            <LoginInput placeholder={"City"} setValue={setCity} value={city}></LoginInput>
          </View>
          <View style={styles.countryWrapper}>
            <LoginInput placeholder={"Province"} setValue={setProvince} value={province}></LoginInput>
          </View>
        </ScrollView>
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
export default forwardRef(AdressStep)
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
  inputScrollView: {
    flex: 1,
  },
  streetNumberWrapper: {},
  streetNameWrapper: {},
  postalNumberWrapper: {},
  provinceWrapper: {},
  countryWrapper: {},
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
