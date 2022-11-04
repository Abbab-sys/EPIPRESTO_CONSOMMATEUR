import {Tabs, TabScreen,} from 'react-native-paper-tabs';
import React, {useEffect, useRef, useState} from "react";
import AccountStep, {AccountStepRef} from "./AccountStep";
import AdressStep, {AdressStepRef} from "./AdressStep";
import InformationsStep, {InformationsStepRef} from "./InformationsStep";
import ContactStep, {ContactStepRef} from "./ContactStep";
import {CLIENT_SIGN_UP, ClientSignUpData} from "../../../../graphql/queries/ClientSignUp";
import {useMutation} from "@apollo/client";
import {useNavigation} from "@react-navigation/native";

export const SignupStepper = () => {
  const navigation = useNavigation();

  const [informationsStepCompleted, setInformationsStepCompleted] = useState(false)
  const [contactStepCompleted, setContactStepCompleted] = useState(false)
  const [adressStepCompleted, setAdressStepCompleted] = useState(false)
  const [accountStepCompleted, setAccountStepCompleted] = useState(false)

  const informationsStepRef = useRef<InformationsStepRef>(null)
  const contactStepRef = useRef<ContactStepRef>(null)
  const addressStepRef = useRef<AdressStepRef>(null)
  const accountStepRef = useRef<AccountStepRef>(null)


  const [clientSignUp, {data}] = useMutation(CLIENT_SIGN_UP)
  const isClientUsernameUsedData: ClientSignUpData | undefined = data as ClientSignUpData;

  const signUp = async () => {
    const {firstName, lastName} = informationsStepRef.current as InformationsStepRef
    const {phone, email} = contactStepRef.current as ContactStepRef
    const {address} = addressStepRef.current as AdressStepRef
    const {username, password} = accountStepRef.current as AccountStepRef

    await clientSignUp({
      variables: {
        accountInput: {
          firstName,
          lastName,
          phone,
          email,
          address,
          username,
          password
        }
      }
    })
  }

  useEffect(() => {
    if (isClientUsernameUsedData?.clientSignUp.code === 200) {
      navigation.goBack()
    }
  }, [isClientUsernameUsedData])

  const disabledContactStep = !informationsStepCompleted
  const disabledAdressStepStep = !contactStepCompleted || !informationsStepCompleted
  const disabledAccountStep = !adressStepCompleted || !contactStepCompleted || !informationsStepCompleted
  return (
    <Tabs
      // defaultIndex={0} // default = 0
      // uppercase={false} // true/false | default=true | labels are uppercase
      showTextLabel={true} // true/false | default=false (KEEP PROVIDING LABEL WE USE IT AS KEY INTERNALLY + SCREEN READERS)
      // iconPosition // leading, top | default=leading
      iconPosition="top"
      style={{backgroundColor: '#FECFA0'}} // works the same as AppBar in react-native-paper
      //theme={theme} // works the same as AppBar in react-native-paper
      mode="scrollable" // fixed, scrollable | default=fixed
      // onChangeIndex={(newIndex) => {}} // react on index change
      showLeadingSpace={true} //  (default=true) show leading space in scrollable tabs inside the header
      disableSwipe={true} // (default=false) disable swipe to left/right gestures
    >

      <TabScreen label="Informations" icon="information-outline">
        <InformationsStep ref={informationsStepRef} setStepCompleted={setInformationsStepCompleted}
                          stepCompleted={informationsStepCompleted}/>
      </TabScreen>
      <TabScreen label="Contact" icon={"card-account-phone-outline"} disabled={disabledContactStep}>
        <ContactStep ref={contactStepRef} setStepCompleted={setContactStepCompleted}
                     stepCompleted={contactStepCompleted}/>
      </TabScreen>
      <TabScreen label="Address" icon={"home-account"} disabled={disabledAdressStepStep}>
        <AdressStep ref={addressStepRef} setStepCompleted={setAdressStepCompleted}
                    stepCompleted={adressStepCompleted}></AdressStep>
      </TabScreen>
      <TabScreen label="Account" icon="account-outline" disabled={disabledAccountStep}>
        <AccountStep ref={accountStepRef} signUp={signUp} setStepCompleted={setAccountStepCompleted}
                     stepCompleted={accountStepCompleted}/>
      </TabScreen>

    </Tabs>
  )
}
