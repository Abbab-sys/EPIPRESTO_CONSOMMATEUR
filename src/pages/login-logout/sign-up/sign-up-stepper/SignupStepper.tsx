import {Tabs, TabScreen,} from 'react-native-paper-tabs';
import React, {useRef, useState} from "react";
import AccountStep, {AccountStepRef} from "./AccountStep";
import AdressStep, {AdressStepRef} from "./AdressStep";
import InformationsStep, {InformationsStepRef} from "./InformationsStep";
import ContactStep, {ContactStepRef} from "./ContactStep";

export const SignupStepper = () => {
  const [informationsStepCompleted, setInformationsStepCompleted] = useState(false)
  const [contactStepCompleted, setContactStepCompleted] = useState(false)
  const [adressStepCompleted, setAdressStepCompleted] = useState(false)
  const [accountStepCompleted, setAccountStepCompleted] = useState(false)

  const informationsStepRef = useRef<InformationsStepRef>(null)
  const contactStepRef = useRef<ContactStepRef>(null)
  const adressStepRef = useRef<AdressStepRef>(null)
  const accountStepRef = useRef<AccountStepRef>(null)

  const signUp = () => {
    const {firstName, lastName} = informationsStepRef.current as InformationsStepRef
    const {phone, email} = contactStepRef.current as ContactStepRef
    const {adress} = adressStepRef.current as AdressStepRef
    const {username, password} = accountStepRef.current as AccountStepRef
    console.log(firstName, lastName, phone, email, adress, username, password)

  }

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
        <AdressStep ref={adressStepRef} setStepCompleted={setAdressStepCompleted}
                    stepCompleted={adressStepCompleted}></AdressStep>
      </TabScreen>
      <TabScreen label="Account" icon="account-outline" disabled={disabledAccountStep}>
        <AccountStep ref={accountStepRef} signUp={signUp} setStepCompleted={setAccountStepCompleted} stepCompleted={accountStepCompleted}/>
      </TabScreen>

    </Tabs>
  )
}
