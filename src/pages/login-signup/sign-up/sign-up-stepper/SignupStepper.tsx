import {Tabs, TabScreen} from 'react-native-paper-tabs';
import React, {useEffect, useRef, useState} from 'react';
import AccountStep, {AccountStepRef} from './AccountStep';
import AdressStep, {AdressStepRef} from './AdressStep';
import InformationsStep, {InformationsStepRef} from './InformationsStep';
import ContactStep, {ContactStepRef} from './ContactStep';
import {
  CLIENT_SIGN_UP,
  ClientSignUpData,
} from '../../../../graphql/queries/ClientSignUp';
import {useMutation} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

/*
 * Name: Signup Stepper
 * Description: This file is used to display all the steps of the signup process.
 * Author: Zouhair Derouich, Adam Naoui-Busson
 */

export const SignupStepper = () => {
  const {t} = useTranslation('translation');
  const navigation = useNavigation();

  const [informationsStepCompleted, setInformationsStepCompleted] =
    useState(false);
  const [contactStepCompleted, setContactStepCompleted] = useState(false);
  const [adressStepCompleted, setAdressStepCompleted] = useState(false);
  const [accountStepCompleted, setAccountStepCompleted] = useState(false);

  const informationsStepRef = useRef<InformationsStepRef>(null);
  const contactStepRef = useRef<ContactStepRef>(null);
  const addressStepRef = useRef<AdressStepRef>(null);
  const accountStepRef = useRef<AccountStepRef>(null);

  // Mutation to sign up a client with all the information
  const [clientSignUp, {data}] = useMutation(CLIENT_SIGN_UP);
  const isClientUsernameUsedData: ClientSignUpData | undefined =
    data as ClientSignUpData;

  // Function to sign up a client
  const signUp = async () => {
    const {firstName, lastName} =
      informationsStepRef.current as InformationsStepRef;
    const {phone, email} = contactStepRef.current as ContactStepRef;
    const {address} = addressStepRef.current as AdressStepRef;
    const {username, password} = accountStepRef.current as AccountStepRef;

    await clientSignUp({
      variables: {
        accountInput: {
          firstName,
          lastName,
          phone,
          email,
          address,
          username,
          password,
        },
      },
    });
  };

  // Use effect to go back to the login page if the sign up is successful
  useEffect(() => {
    if (isClientUsernameUsedData?.clientSignUp.code === 200) {
      navigation.goBack();
    }
  }, [isClientUsernameUsedData]);

  const disabledContactStep = !informationsStepCompleted;
  const disabledAdressStepStep =
    !contactStepCompleted || !informationsStepCompleted;
  const disabledAccountStep =
    !adressStepCompleted || !contactStepCompleted || !informationsStepCompleted;

  return (
    <Tabs
      showTextLabel={true}
      iconPosition="top"
      style={{backgroundColor: '#FECFA0'}}
      mode="scrollable"
      showLeadingSpace={true}
      disableSwipe={true}>
      <TabScreen
        label={t('signUp.stepper.informations.sectionTitle')}
        icon="information-outline">
        <InformationsStep
          ref={informationsStepRef}
          setStepCompleted={setInformationsStepCompleted}
          stepCompleted={informationsStepCompleted}
        />
      </TabScreen>
      <TabScreen
        label={t('signUp.stepper.contact.sectionTitle')}
        icon={'card-account-phone-outline'}
        disabled={disabledContactStep}>
        <ContactStep
          ref={contactStepRef}
          setStepCompleted={setContactStepCompleted}
          stepCompleted={contactStepCompleted}
        />
      </TabScreen>
      <TabScreen
        label={t('signUp.stepper.address.sectionTitle')}
        icon={'home-account'}
        disabled={disabledAdressStepStep}>
        <AdressStep
          ref={addressStepRef}
          setStepCompleted={setAdressStepCompleted}
          stepCompleted={adressStepCompleted}></AdressStep>
      </TabScreen>
      <TabScreen
        label={t('signUp.stepper.account.sectionTitle')}
        icon="account-outline"
        disabled={disabledAccountStep}>
        <AccountStep
          ref={accountStepRef}
          signUp={signUp}
          setStepCompleted={setAccountStepCompleted}
          stepCompleted={accountStepCompleted}
        />
      </TabScreen>
    </Tabs>
  );
};
