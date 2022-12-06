import {AccountCredentialsReducerState} from './AccountCredentialsReducerState';
import {AccountCredentialsReducerActions} from './AccountCredentialsReducerActions';
import {initialStoreErrorMessage} from '../../../interfaces/ClientModificationInterfaces';

/*
 * Name: Account Credentials Reducer
 * Description: This is the reducer for the Account Credentials Reducer.
 * Author: Alessandro van Reusel
 */

export function accountCredentialsReducer(
  state: AccountCredentialsReducerState,
  action: AccountCredentialsReducerActions,
): AccountCredentialsReducerState {
  switch (action.type) {
    // Change the username
    case 'CHANGE_USERNAME': {
      const errorMessage = {...initialStoreErrorMessage};
      manageError(
        errorMessage.usernameError,
        'signUp.emptyFieldError',
        action.newUsername === '',
      );
      return {
        ...state,
        storeInput: {
          ...state.storeInput,
          username: action.newUsername,
        },
        storeErrorMessage: {
          ...state.storeErrorMessage,
          usernameError: errorMessage.usernameError,
        },
      };
    }
    // Change the street
    case 'CHANGE_STREET': {
      const errorMessage = {...initialStoreErrorMessage};
      manageError(
        errorMessage.streetError,
        'signUp.emptyFieldError',
        action.newStreet === '',
      );
      return {
        ...state,
        storeInput: {
          ...state.storeInput,
          street: action.newStreet,
        },
        storeErrorMessage: {
          ...state.storeErrorMessage,
          streetError: errorMessage.streetError,
        },
      };
    }
    // Change the city
    case 'CHANGE_CITY': {
      const errorMessage = {...initialStoreErrorMessage};
      manageError(
        errorMessage.cityError,
        'signUp.emptyFieldError',
        action.newCity === '',
      );
      return {
        ...state,
        storeInput: {
          ...state.storeInput,
          city: action.newCity,
        },
        storeErrorMessage: {
          ...state.storeErrorMessage,
          cityError: errorMessage.cityError,
        },
      };
    }
    // Change the postal code
    case 'CHANGE_POSTAL_CODE': {
      const errorMessage = {...initialStoreErrorMessage};
      manageError(
        errorMessage.postalCodeError,
        'signUp.emptyFieldError',
        action.newPostalCode === '',
      );
      return {
        ...state,
        storeInput: {
          ...state.storeInput,
          postalCode: action.newPostalCode,
        },
        storeErrorMessage: {
          ...state.storeErrorMessage,
          postalCodeError: errorMessage.postalCodeError,
        },
      };
    }
    // Change the province
    case 'CHANGE_PROVINCE': {
      const errorMessage = {...initialStoreErrorMessage};
      manageError(
        errorMessage.provinceError,
        'signUp.emptyFieldError',
        action.newProvince === '',
      );
      return {
        ...state,
        storeInput: {
          ...state.storeInput,
          province: action.newProvince,
        },
        storeErrorMessage: {
          ...state.storeErrorMessage,
          provinceError: errorMessage.provinceError,
        },
      };
    }
    // Change the phone
    case 'CHANGE_PHONE': {
      const errorMessage = {...initialStoreErrorMessage};
      manageError(
        errorMessage.phoneError,
        'signUp.stepper.contact.phone.errors.format',
        !/^[0-9]{10}$/.test(action.newPhone),
      );
      manageError(
        errorMessage.phoneError,
        'signUp.emptyFieldError',
        action.newPhone === '',
      );

      return {
        ...state,
        storeInput: {
          ...state.storeInput,
          phone: action.newPhone,
        },
        storeErrorMessage: {
          ...state.storeErrorMessage,
          phoneError: errorMessage.phoneError,
        },
      };
    }
    // Change the first name
    case 'CHANGE_FIRST_NAME': {
      const errorMessage = {...initialStoreErrorMessage};
      manageError(
        errorMessage.firstNameError,
        'signUp.emptyFieldError',
        action.newFirstName === '',
      );
      return {
        ...state,
        storeInput: {
          ...state.storeInput,
          firstName: action.newFirstName,
        },
        storeErrorMessage: {
          ...state.storeErrorMessage,
          firstNameError: errorMessage.firstNameError,
        },
      };
    }
    // Change the last name
    case 'CHANGE_LAST_NAME': {
      const errorMessage = {...initialStoreErrorMessage};
      manageError(
        errorMessage.lastNameError,
        'signUp.emptyFieldError',
        action.newLastName === '',
      );
      return {
        ...state,
        storeInput: {
          ...state.storeInput,
          lastName: action.newLastName,
        },
        storeErrorMessage: {
          ...state.storeErrorMessage,
          lastNameError: errorMessage.lastNameError,
        },
      };
    }
    // Change the password
    case 'CHANGE_PASSWORD': {
      const errorMessage = {...initialStoreErrorMessage};
      manageError(
        errorMessage.passwordError,
        'signUp.emptyFieldError',
        action.newPassword === '',
      );
      manageError(
        errorMessage.passwordError,
        'signUp.passwordError',
        action.newPassword.length < 8,
      );
      return {
        ...state,
        storeInput: {
          ...state.storeInput,
          password: action.newPassword,
        },
        storeErrorMessage: {
          ...state.storeErrorMessage,
          passwordError: errorMessage.passwordError,
        },
      };
    }
    // Set the username error
    case 'SET_USERNAME_ERROR': {
      const errorMessage = {...initialStoreErrorMessage};
      manageError(
        errorMessage.usernameError,
        action.usernameError,
        action.error &&
          state.storeInput.username !== state.storeInput.currentUsername,
      );
      return {
        ...state,
        storeErrorMessage: {
          ...state.storeErrorMessage,
          usernameError: errorMessage.usernameError,
        },
      };
    }
    // Set the store credentials
    case 'SET_STORE_CREDENTIALS': {
      const storeCredentials = action.data.getClientAccountById.clientAccount;
      const adressArray = storeCredentials.address.split(',');
      return {
        ...state,
        storeInput: {
          ...state.storeInput,
          firstName: storeCredentials.firstName,
          street: adressArray[0],
          city: adressArray[1].replace(/\s/g, ''),
          province: adressArray[2].replace(/\s/g, ''),
          postalCode: adressArray[3].replace(/\s/g, ''),
          phone: storeCredentials.phone,
          password: storeCredentials.password,
          idClient: storeCredentials._id,
          username: storeCredentials.username,
          lastName: storeCredentials.lastName,
          email: storeCredentials.email,
          currentUsername: storeCredentials.username,
        },
        storeErrorMessage: {
          ...state.storeErrorMessage,
        },
      };
    }
    default:
      return state;
  }
}

// Check if the error is already in the error set and add or remove it
const manageError = (
  errorSet: Set<string>,
  errorKey: string,
  errorCondition: boolean,
) => {
  if (!errorCondition && errorSet.has(errorKey)) {
    errorSet.delete(errorKey);
  }
  if (errorCondition && !errorSet.has(errorKey)) {
    errorSet.add(errorKey);
  }
  return errorSet;
};
