import {Error} from './Error';

/*
 * Name: Zip Code Errors
 * Description: This file contains all the errors related to the zip code.
 * Author: Adam Naoui-Busson
 */

export const ZIP_CODE_EMPTY: Error = {
  messageKey: 'Zip code is empty',
};

export const ZIP_CODE_EMPTY_NOT_VALID: Error = {
  messageKey: 'Zip code not valid',
};
