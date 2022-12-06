import {useEffect, useState} from 'react';
import {Error} from '../../types/errors/Error';
import {MANDATORY_FIELD_EMPTY} from '../../types/errors/MandatoryFieldsErrors';
import {ZIP_CODE_EMPTY_NOT_VALID} from '../../types/errors/ZipCodeErrors';

/*
 * Name: Use Zip Code Validator
 * Description: This is a custom hook that validates the zip code.
 * Author: Zouhair Derouich, Adam Naoui-Busson
 */

export const useZipCodeValidator = (zipCode: string) => {
  const [errors, setErrors] = useState<Error[]>([]);

  const validateZipCode = (code: string): boolean => {
    return /^[A-Z][0-9][A-Z]\w*[0-9][A-Z][0-9]$/.test(code.toUpperCase());
  };

  //Use effect to validate the zip code
  useEffect(() => {
    if (zipCode === '' && errors.indexOf(MANDATORY_FIELD_EMPTY) === -1) {
      setErrors(prevErrors => {
        return [...prevErrors, MANDATORY_FIELD_EMPTY];
      });
    } else if (zipCode && errors.indexOf(MANDATORY_FIELD_EMPTY) !== -1) {
      setErrors(prevErrors => {
        return prevErrors.filter(error => error !== MANDATORY_FIELD_EMPTY);
      });
    }

    if (
      !validateZipCode(zipCode) &&
      errors.indexOf(ZIP_CODE_EMPTY_NOT_VALID) === -1
    ) {
      setErrors(prevErrors => {
        return [...prevErrors, ZIP_CODE_EMPTY_NOT_VALID];
      });
    } else if (
      validateZipCode(zipCode) &&
      errors.indexOf(ZIP_CODE_EMPTY_NOT_VALID) !== -1
    ) {
      setErrors(prevErrors => {
        return prevErrors.filter(error => error !== ZIP_CODE_EMPTY_NOT_VALID);
      });
    }
  }, [zipCode]);

  return errors;
};
