import {useEffect, useState} from 'react';
import {Error} from '../../types/errors/Error';
import {MANDATORY_FIELD_EMPTY} from '../../types/errors/MandatoryFieldsErrors';

/*
 * Name: Use Mandatory Field Validator
 * Description: This is a custom hook that validates the mandatory fields.
 * Author: Zouhair Derouich, Adam Naoui-Busson
 */

export const useMandatoryFieldValidator = (fieldValue: string) => {
  const [errors, setErrors] = useState<Error[]>([]);

  // Use effect to validate the mandatory fields
  useEffect(() => {
    if (fieldValue === '' && errors.indexOf(MANDATORY_FIELD_EMPTY) === -1) {
      setErrors(prevErrors => {
        return [...prevErrors, MANDATORY_FIELD_EMPTY];
      });
    } else if (fieldValue && errors.indexOf(MANDATORY_FIELD_EMPTY) !== -1) {
      setErrors(prevErrors => {
        return prevErrors.filter(error => error !== MANDATORY_FIELD_EMPTY);
      });
    }
  }, [fieldValue]);

  return errors;
};
