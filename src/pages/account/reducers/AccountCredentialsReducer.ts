import {AccountCredentialsReducerState} from './AccountCredentialsReducerState';
import {AccountCredentialsReducerActions} from './AccountCredentialsReducerActions';
import {initialStoreErrorMessage} from '../../../interfaces/ClientModificationInterfaces';

export function accountCredentialsReducer(
  state: AccountCredentialsReducerState,
  action: AccountCredentialsReducerActions,
): AccountCredentialsReducerState {
  switch (action.type) {
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
    case 'SET_USERNAME_ERROR': {
      const errorMessage = {...initialStoreErrorMessage};
      manageError(
        errorMessage.usernameError,
        action.usernameError,
        action.error && state.storeInput.username !== state.storeInput.oldUsername,
      );
      return {
        ...state,
        storeErrorMessage: {
          ...state.storeErrorMessage,
          usernameError: errorMessage.usernameError,
        },
      };
    }
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
          oldUsername: storeCredentials.username,
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
