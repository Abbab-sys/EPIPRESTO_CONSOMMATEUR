import {useEffect, useState} from "react";
import {Error} from "../../types/errors/Error";
import {PHONE_EMPTY, PHONE_NOT_VALID} from "../../types/errors/PhoneErrors";


export const usePhoneValidator = (phone: string) => {
  const [errors, setErrors] = useState<Error[]>([]);

  const validatePhone = (phone: string): boolean => {
    return /^[0-9]{10}$/.test(phone)
  };

  useEffect(() => {
    if (phone === '' && errors.indexOf(PHONE_EMPTY) === -1) {
      setErrors((prevErrors) => {
        return [...prevErrors, PHONE_EMPTY]
      });
    } else if (phone && errors.indexOf(PHONE_EMPTY) !== -1) {
      setErrors((prevErrors) => {
        return prevErrors.filter((error) => error !== PHONE_EMPTY)
      });
    }

    if (!validatePhone(phone) && errors.indexOf(PHONE_NOT_VALID) === -1) {
      setErrors((prevErrors) => {
        return [...prevErrors, PHONE_NOT_VALID]
      });
    } else if (validatePhone(phone) && errors.indexOf(PHONE_NOT_VALID) !== -1) {
      console.log('useEmailValidator: email is valid');
      setErrors((prevErrors) => {
        return prevErrors.filter((error) => error !== PHONE_NOT_VALID)
      });
    }
  }, [phone]);
  return errors;
}


