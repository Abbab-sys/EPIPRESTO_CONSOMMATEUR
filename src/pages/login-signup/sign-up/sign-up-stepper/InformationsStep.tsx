import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTabIndex, useTabNavigation} from 'react-native-paper-tabs';
import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  Ref,
} from 'react';
import LoginInput from '../../../../atoms/LoginInput';
import {useMandatoryFieldValidator} from '../../../../hooks/validators/useMandatoryFieldValidator';
import {useTranslation} from 'react-i18next';

/*
 * Name: Informations Step
 * Description: This file is used to display the first step of the signup process (first and last name).
 * Author: Zouhair Derouich, Adam Naoui-Busson
 */

type InformationsStepProps = {
  setStepCompleted: (disabled: boolean) => void;
  stepCompleted: boolean;
};
export type InformationsStepRef = {
  firstName: string;
  lastName: string;
};

const InformationsStep = (
  props: InformationsStepProps,
  ref: Ref<InformationsStepRef>,
) => {
  const {t} = useTranslation('translation');
  const goTo = useTabNavigation();
  const index = useTabIndex();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // Imperative handle to get the first and last name
  useImperativeHandle(
    ref,
    () => ({
      firstName,
      lastName,
    }),
    [firstName, lastName],
  );

  // Function to check if the inputs are valid
  const checkInputs = (): boolean => {
    if (!firstName) {
      return false;
    }
    return !!lastName;
  };

  // Use effect to check if the inputs are valid and set the step as completed
  useEffect(() => {
    props.setStepCompleted(checkInputs());
  }, [firstName, lastName]);

  const firstNameErrors = useMandatoryFieldValidator(firstName);
  const lastNameErrors = useMandatoryFieldValidator(lastName);

  return (
    <View style={styles.root}>
      <View style={styles.inputsWrapper}>
        <LoginInput
          errors={firstNameErrors}
          placeholder={t('signUp.stepper.informations.firstName.title')}
          setValue={setFirstName}
          value={firstName}
        />
        <LoginInput
          errors={lastNameErrors}
          placeholder={t('signUp.stepper.informations.lastName.title')}
          setValue={setLastName}
          value={lastName}
        />
      </View>
      <View style={styles.nextButtonContainer}>
        <TouchableOpacity
          style={
            !props.stepCompleted ? styles.nextButtonDisabled : styles.nextButton
          }
          onPress={() => {
            goTo(index + 1);
          }}
          disabled={!props.stepCompleted}>
          <Text style={styles.nextButtonText}>{t('signUp.next')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default forwardRef(InformationsStep);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputsWrapper: {
    flex: 75,
    width: '100%',
    justifyContent: 'center',
    marginBottom: '10%',
    marginTop: '10%',
  },
  nextButtonContainer: {
    flex: 25,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  nextButtonDisabled: {
    borderRadius: 12,
    backgroundColor: '#FDFDFD96',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '36%',
    height: '58%',
  },
  nextButton: {
    borderRadius: 12,
    backgroundColor: '#FDFDFD',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '36%',
    height: '58%',
  },
  nextButtonText: {
    fontFamily: 'Lato',
    fontSize: 22,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 26,
    textAlign: 'center',
    letterSpacing: -0.02,
    alignSelf: 'center',
    color: '#000000',
  },
});
