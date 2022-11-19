export interface ClientInput {
    idClient: string;
    username:string;
    street: string;
    city: string;
    postalCode: string;
    province: string; 
    phone: string;
    firstName: string;
    lastName:string;
    password: string;
    email: string;
    currentUsername: string;
  }
  
  export interface StoreErrorMessage {
    usernameError: Set<string>;
    streetError: Set<string>;
    cityError: Set<string>;
    postalCodeError: Set<string>;
    provinceError: Set<string>;
    phoneError: Set<string>;
    firstNameError: Set<string>;
    lastNameError: Set<string>;
    passwordError: Set<string>;
  }
  
  export const initialStoreErrorMessage: StoreErrorMessage = {
    usernameError: new Set(),
    streetError: new Set(),
    cityError: new Set(),
    postalCodeError: new Set(),
    provinceError: new Set(),
    phoneError: new Set(),
    firstNameError: new Set(),
    lastNameError: new Set(),
    passwordError: new Set(),
  };
  