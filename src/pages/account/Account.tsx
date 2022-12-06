import {useLazyQuery, useMutation, useQuery} from '@apollo/client';
import React, {useContext, useEffect, useReducer} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {accountCredentialsReducer} from './reducers/AccountCredentialsReducer';
import {initialStoreCredentialsState} from './reducers/AccountCredentialsReducerState';
import {useSnackbar} from '../../hooks/UiHooks/UiHooks';
import {ClientAuthenticationContext} from '../../context/ClientAuthenticationContext';
import {
  GetClientInfoData,
  GET_CLIENT_INFO_BY_ID,
} from '../../graphql/queries/GetClientInfoById';
import {MODIFY_ACCOUNT} from '../../graphql/mutations/ModifyAccount';
import {
  IsClientUsernameUsedData,
  IS_CLIENT_USERNAME_USED,
} from '../../graphql/queries/IsClientUsernameUsed';

/*
 * Name: Account
 * Description: This file is used to display the account page.
 * Author: Alessandro van Reusel, Khalil Zriba
 */

const Account = ({navigation}: any) => {
  const {t: translation} = useTranslation('translation');
  const [{storeInput, storeErrorMessage}, dispatchCredentialsState] =
    useReducer(accountCredentialsReducer, initialStoreCredentialsState);

  //Snackbar for successful modification
  const [confirmModificationSnackbar, {open: openConfirmModificationSnackbar}] =
    useSnackbar({
      severity: 'success',
      messageTranslationKey: translation('settings.account.modifySuccess'),
    });
  //useState set visibility of password
  const [passwordVisible, setPasswordVisible] = React.useState(true);

  //Snackbar for unsuccessful modification
  const [modificationErrorSnackbar, {open: openModificationErrorSnackbar}] =
    useSnackbar({
      severity: 'error',
      messageTranslationKey: translation('settings.account.modifyError'),
    });

  //Snackbar for server error
  const [serverErrorSnackbar, {open: openServerErrorSnackbar}] = useSnackbar({
    severity: 'error',
    messageTranslationKey: translation('settings.account.serverError'),
  });

  const {clientId} = useContext(ClientAuthenticationContext);

  // Query to check if the username is already used
  const [isClientUsernameUsed, {data}] = useLazyQuery(IS_CLIENT_USERNAME_USED, {
    fetchPolicy: 'network-only',
  });
  const isClientUsernameUsedData: IsClientUsernameUsedData | undefined =
    data as IsClientUsernameUsedData;

  // Handle data from query to get client info
  const handleData = (data: GetClientInfoData) => {
    if (!data) return;
    dispatchCredentialsState({
      type: 'SET_STORE_CREDENTIALS',
      data: data,
    });
  };

  // Query to get client info
  const {loading, refetch} = useQuery<GetClientInfoData>(
    GET_CLIENT_INFO_BY_ID,
    {
      variables: {idClient: clientId},
      onCompleted: handleData,
      onError: openModificationErrorSnackbar,
      fetchPolicy: 'network-only',
    },
  );

  // Check if all fields are valid
  const areAllCredentialsFieldsValid = (): boolean => {
    const currErrorMessages = storeErrorMessage;
    return (
      currErrorMessages.usernameError.size === 0 &&
      currErrorMessages.streetError.size === 0 &&
      currErrorMessages.cityError.size === 0 &&
      currErrorMessages.postalCodeError.size === 0 &&
      currErrorMessages.provinceError.size === 0 &&
      currErrorMessages.phoneError.size === 0 &&
      currErrorMessages.firstNameError.size == 0 &&
      currErrorMessages.lastNameError.size == 0
    );
  };

  // Use effect to check if the username is already used
  useEffect(() => {
    isClientUsernameUsed({
      variables: {
        username: storeInput.username,
      },
    });
  }, [storeInput.username]);

  // Use effect to set the error message for the username
  useEffect(() => {
    if (isClientUsernameUsedData) {
      if (isClientUsernameUsedData.isClientUsernameUsed) {
        dispatchCredentialsState({
          type: 'SET_USERNAME_ERROR',
          usernameError: 'signUp.stepper.account.username.error',
          error: true,
        });
      } else {
        dispatchCredentialsState({
          type: 'SET_USERNAME_ERROR',
          usernameError: 'signUp.stepper.account.username.error',
          error: false,
        });
      }
    }
  }, [isClientUsernameUsedData]);

  // Mutation to modify the account
  const [modifyAccount] = useMutation(MODIFY_ACCOUNT, {
    onCompleted: () => {
      refetch({idClient: clientId});
      openConfirmModificationSnackbar();
    },
    onError: error => {
      openServerErrorSnackbar();
    },
  });

  // Handle the modification of the account
  const handleModify = () => {
    Keyboard.dismiss();
    const areCredentialsValid = areAllCredentialsFieldsValid();
    if (areCredentialsValid) {
      modifyAccount({
        variables: {
          clientId: clientId,
          fieldsToUpdate: {
            firstName: storeInput.firstName,
            lastName: storeInput.lastName,
            address:
              storeInput.street +
              ', ' +
              storeInput.city +
              ', ' +
              storeInput.postalCode +
              ', ' +
              storeInput.province,
            phone: storeInput.phone,
            username: storeInput.username,
            password: storeInput.password,
          },
        },
      });
    } else {
      openModificationErrorSnackbar();
    }
  };

  const DATA: any = [
    {
      title: 'signUp.stepper.account.sectionTitle',
      data: [
        {
          keyboardType: 'default',
          disabled: false,
          title: 'signUp.stepper.account.username.title',
          value: storeInput.username,
          error: storeErrorMessage.usernameError,
          onChangeText: (text: string) =>
            dispatchCredentialsState({
              type: 'CHANGE_USERNAME',
              newUsername: text,
            }),
        },
        {
          keyboardType: 'default',
          disabled: false,
          title: 'signUp.stepper.account.password',
          value: storeInput.password,
          error: storeErrorMessage.passwordError,
          onChangeText: (text: string) =>
            dispatchCredentialsState({
              type: 'CHANGE_PASSWORD',
              newPassword: text,
            }),
        },
      ],
    },

    {
      title: 'signUp.stepper.address.sectionTitle',
      data: [
        {
          keyboardType: 'default',
          disabled: false,
          title: 'signUp.stepper.address.street',
          value: storeInput.street,
          error: storeErrorMessage.streetError,
          onChangeText: (text: string) =>
            dispatchCredentialsState({
              type: 'CHANGE_STREET',
              newStreet: text,
            }),
        },
        {
          keyboardType: 'default',
          disabled: false,
          title: 'signUp.stepper.address.city',
          value: storeInput.city,
          error: storeErrorMessage.cityError,
          onChangeText: (text: string) =>
            dispatchCredentialsState({
              type: 'CHANGE_CITY',
              newCity: text,
            }),
        },
        {
          keyboardType: 'default',
          disabled: false,
          title: 'signUp.stepper.address.province',
          value: storeInput.province,
          error: storeErrorMessage.provinceError,
          onChangeText: (text: string) =>
            dispatchCredentialsState({
              type: 'CHANGE_PROVINCE',
              newProvince: text,
            }),
        },
        {
          keyboardType: 'default',
          disabled: false,
          title: 'signUp.stepper.address.postalCode',
          value: storeInput.postalCode,
          error: storeErrorMessage.postalCodeError,

          onChangeText: (text: string) =>
            dispatchCredentialsState({
              type: 'CHANGE_POSTAL_CODE',
              newPostalCode: text,
            }),
        },
      ],
    },
    {
      title: 'signUp.stepper.informations.sectionTitle',
      data: [
        {
          keyboardType: 'default',
          disabled: false,
          title: 'signUp.stepper.informations.firstName.title',
          value: storeInput.firstName,
          error: storeErrorMessage.firstNameError,
          onChangeText: (text: string) =>
            dispatchCredentialsState({
              type: 'CHANGE_FIRST_NAME',
              newFirstName: text,
            }),
        },
        {
          keyboardType: 'default',
          disabled: false,
          title: 'signUp.stepper.informations.lastName.title',
          value: storeInput.lastName,
          error: storeErrorMessage.lastNameError,
          onChangeText: (text: string) =>
            dispatchCredentialsState({
              type: 'CHANGE_LAST_NAME',
              newLastName: text,
            }),
        },
      ],
    },
    {
      title: 'signUp.stepper.contact.sectionTitle',
      data: [
        {
          keyboardType: 'numeric',
          disabled: false,
          title: 'signUp.stepper.contact.phone.title',
          value: storeInput.phone,
          error: storeErrorMessage.phoneError,
          onChangeText: (text: string) =>
            dispatchCredentialsState({
              type: 'CHANGE_PHONE',
              newPhone: text,
            }),
        },
        {
          keyboardType: 'default',
          disabled: true,
          title: 'signUp.stepper.contact.email.title',
          value: storeInput.email,
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.titleWrapper}>
        <TouchableOpacity
          style={styles.back_button}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            style={styles.back_button_icon}
            source={require('../../assets/images/back.png')}
          />
        </TouchableOpacity>
        <Text style={styles.title}>
          {translation('settings.account.title')}
        </Text>
      </View>
      <View style={styles.scrollView}>
        {loading ? (
          <ActivityIndicator size="large" color="#FFA500" />
        ) : (
          <View>
            <SectionList
              sections={DATA}
              keyExtractor={(item, index) => item + index}
              renderItem={({item}) => (
                <View style={sectionsList.root}>
                  <Text style={sectionsList.title}>
                    {translation(item.title)}
                  </Text>
                  <View>
                    <TextInput
                      theme={{roundness: 12}}
                      mode={'outlined'}
                      keyboardType={item.keyboardType}
                      disabled={item.disabled}
                      secureTextEntry={
                        item.title === 'signUp.stepper.account.password' &&
                        passwordVisible
                      }
                      right={
                        item.title === 'signUp.stepper.account.password' ? (
                          <TextInput.Icon
                            icon={passwordVisible ? 'eye' : 'eye-off'}
                            iconColor={'black'}
                            forceTextInputFocus={false}
                            onPress={() => {
                              setPasswordVisible(!passwordVisible);
                            }}
                          />
                        ) : null
                      }
                      textColor={item.disabled ? 'grey' : 'black'}
                      onChangeText={item.onChangeText}
                      value={item.value}
                    />
                    <HelperText type="error">
                      {item.error
                        ? translation(item.error.values().next().value)
                        : ''}
                    </HelperText>
                  </View>
                </View>
              )}
              renderSectionHeader={({section: {title}}) => (
                <Text style={sectionsList.sectionTitle}>
                  {translation(title)}
                </Text>
              )}
            />
          </View>
        )}
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button} onPress={handleModify}>
          <Text style={styles.buttonText}>
            {translation('settings.account.modify')}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonMargin} />
      {modificationErrorSnackbar}
      {confirmModificationSnackbar}
      {serverErrorSnackbar}
    </SafeAreaView>
  );
};

export const sectionsList = StyleSheet.create({
  root: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFA500',
  },
  title: {
    fontSize: 16,
    color: 'black',
  },
});

export const styles = StyleSheet.create({
  fieldsView: {
    margin: '5%',
    height: 'auto',
  },
  statusView: {
    margin: '5%',
    flexDirection: 'row',
  },
  titleWrapper: {
    flex: 95,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 36,
    includeFontPadding: false,
    textAlignVertical: 'center',
    textAlign: 'center',
    marginRight: 50,
    color: '#000000',
  },
  scrollView: {
    flex: 584,
    marginLeft: 20,
    marginRight: 20,
  },
  buttonView: {
    flex: 40,
    alignItems: 'center',
  },
  buttonMargin: {
    marginTop: 10,
  },
  root: {
    height: '100%',
    flex: 1,
    backgroundColor: '#EAEAEA',
  },
  button: {
    backgroundColor: '#FFAA55',
    borderRadius: 40,
    width: '76%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  back_button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    marginLeft: 10,
  },

  back_button_icon: {
    width: 35,
    height: 35,
    tintColor: '#FFA500',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFA500',
    fontFamily: 'Lato',
    fontStyle: 'normal',
  },
  buttonText: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 24,
    color: '#FFFFFF',
  },
});

export default Account;
