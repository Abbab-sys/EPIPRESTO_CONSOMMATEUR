import {ClientInput, initialStoreErrorMessage, StoreErrorMessage} from "../../../interfaces/ClientModificationInterfaces";

export interface AccountCredentialsReducerState {
  storeInput: ClientInput;
  storeErrorMessage: StoreErrorMessage
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
    oldUsername: '',
  },
  storeErrorMessage: {
    ...initialStoreErrorMessage
  }
}
