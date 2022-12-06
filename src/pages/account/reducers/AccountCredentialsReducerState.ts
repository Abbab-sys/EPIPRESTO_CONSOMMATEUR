import {
  ClientInput,
  initialStoreErrorMessage,
  StoreErrorMessage,
} from '../../../interfaces/ClientModificationInterfaces';

/*
 * Name: Account Credentials Reducer State
 * Description: This is the interface for the Account Credentials Reducer State and its initial state.
 * Author: Alessandro van Reusel
 */

export interface AccountCredentialsReducerState {
  storeInput: ClientInput;
  storeErrorMessage: StoreErrorMessage;
}

export const initialStoreCredentialsState: AccountCredentialsReducerState = {
  storeInput: {
    idClient: '',
    firstName: '',
    street: '',
    city: '',
    postalCode: '',
    province: '',
    phone: '',
    username: '',
    lastName: '',
    password: '',
    email: '',
    currentUsername: '',
  },
  storeErrorMessage: {
    ...initialStoreErrorMessage,
  },
};
