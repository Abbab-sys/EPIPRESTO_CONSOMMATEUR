import {Error} from './Error';

/*
 * Name: Email Errors
 * Description: This file contains all the errors related to the email.
 * Author: Adam Naoui-Busson, Zouhair Derouich
 */

export const EMAIL_NOT_VALID: Error = {
  messageKey: 'signUp.stepper.contact.email.errors.format',
};

export const EMAIL_USED: Error = {
  messageKey: 'signUp.stepper.contact.email.errors.used',
};
