import {Error} from './Error';

/*
 * Name: Phone Errors
 * Description: This file contains all the errors related to the phone.
 * Author: Adam Naoui-Busson, Zouhair Derouich
 */

export const PHONE_EMPTY: Error = {
  messageKey: 'signUp.emptyFieldError',
};

export const PHONE_NOT_VALID: Error = {
  messageKey: 'signUp.stepper.contact.phone.errors.format',
};
