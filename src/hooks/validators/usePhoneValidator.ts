import {useEffect, useState} from 'react';
import {Error} from '../../types/errors/Error';
import {PHONE_EMPTY, PHONE_NOT_VALID} from '../../types/errors/PhoneErrors';

/*
 * Name: Use Phone Validator
 * Description: This is a custom hook that validates the phone number.
 * Author: Zouhair Derouich, Adam Naoui-Busson
 */

export const usePhoneValidator = (phone: string) => {
  const [errors, setErrors] = useState<Error[]>([]);

  const validatePhone = (phone: string): boolean => {
    return /^[0-9]{10}$/.test(phone);
  };

  //Use effect to validate the phone number
  useEffect(() => {
    if (phone === '' && errors.indexOf(PHONE_EMPTY) === -1) {
      setErrors(prevErrors => {
        return [...prevErrors, PHONE_EMPTY];
      });
    } else if (phone && errors.indexOf(PHONE_EMPTY) !== -1) {
      setErrors(prevErrors => {
        return prevErrors.filter(error => error !== PHONE_EMPTY);
      });
    }

    if (!validatePhone(phone) && errors.indexOf(PHONE_NOT_VALID) === -1) {
      setErrors(prevErrors => {
        return [...prevErrors, PHONE_NOT_VALID];
      });
    } else if (validatePhone(phone) && errors.indexOf(PHONE_NOT_VALID) !== -1) {
      setErrors(prevErrors => {
        return prevErrors.filter(error => error !== PHONE_NOT_VALID);
      });
    }
  }, [phone]);
  return errors;
};
