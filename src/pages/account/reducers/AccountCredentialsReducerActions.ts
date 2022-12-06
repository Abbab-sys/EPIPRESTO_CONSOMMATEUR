import {GetClientInfoData} from '../../../graphql/queries/GetClientInfoById';

/*
 * Name: Account Credentials Reducer Actions
 * Description: This is the interface for the Account Credentials Reducer Actions.
 * Author: Alessandro van Reusel
 */

export type AccountCredentialsReducerActions =
  | {type: 'CHANGE_USERNAME'; newUsername: string}
  | {type: 'CHANGE_STREET'; newStreet: string}
  | {type: 'CHANGE_CITY'; newCity: string}
  | {type: 'CHANGE_POSTAL_CODE'; newPostalCode: string}
  | {type: 'CHANGE_PROVINCE'; newProvince: string}
  | {type: 'CHANGE_PHONE'; newPhone: string}
  | {type: 'CHANGE_FIRST_NAME'; newFirstName: string}
  | {type: 'CHANGE_LAST_NAME'; newLastName: string}
  | {type: 'CHANGE_PASSWORD'; newPassword: string}
  | {type: 'SET_USERNAME_ERROR'; usernameError: string; error: boolean}
  | {type: 'SET_STORE_CREDENTIALS'; data: GetClientInfoData};
