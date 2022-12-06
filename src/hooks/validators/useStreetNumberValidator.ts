import {useEffect, useState} from 'react';
import {Error} from '../../types/errors/Error';
import {MANDATORY_FIELD_EMPTY} from '../../types/errors/MandatoryFieldsErrors';
import {STREET_NUMBER_NOT_VALID} from '../../types/errors/StreetNumberErrors';

/*
 * Name: Use Street Number Validator
 * Description: This is a custom hook that validates the street number.
 * Author: Zouhair Derouich, Adam Naoui-Busson
 */

export const useStreetNumberValidator = (streetNumber: string) => {
  const [errors, setErrors] = useState<Error[]>([]);

  const validateStreetNumber = (number: string): boolean => {
    return /^[0-9]+$/.test(number);
  };

  //Use effect to validate the street number
  useEffect(() => {
    if (streetNumber === '' && errors.indexOf(MANDATORY_FIELD_EMPTY) === -1) {
      setErrors(prevErrors => {
        return [...prevErrors, MANDATORY_FIELD_EMPTY];
      });
    } else if (streetNumber && errors.indexOf(MANDATORY_FIELD_EMPTY) !== -1) {
      setErrors(prevErrors => {
        return prevErrors.filter(error => error !== MANDATORY_FIELD_EMPTY);
      });
    }

    if (
      !validateStreetNumber(streetNumber) &&
      errors.indexOf(STREET_NUMBER_NOT_VALID) === -1
    ) {
      setErrors(prevErrors => {
        return [...prevErrors, STREET_NUMBER_NOT_VALID];
      });
    } else if (
      validateStreetNumber(streetNumber) &&
      errors.indexOf(STREET_NUMBER_NOT_VALID) !== -1
    ) {
      setErrors(prevErrors => {
        return prevErrors.filter(error => error !== STREET_NUMBER_NOT_VALID);
      });
    }
  }, [streetNumber]);

  return errors;
};
