import {useEffect, useState} from 'react';
import {Error} from '../../types/errors/Error';
import {CONFIRM_PASSWORD_NOT_MATCHING} from '../../types/errors/ConfirmPasswordErrors';

/*
 * Name: Use Confirm Password Validator
 * Description: This is a custom hook that validates the confirm password.
 * Author: Zouhair Derouich, Adam Naoui-Busson
 */

export const useConfirmPasswordValidator = (
  password: string,
  confirmPassword: string,
) => {
  const [errors, setErrors] = useState<Error[]>([]);

  // Use effect to validate the confirm password
  useEffect(() => {
    if (
      password !== confirmPassword &&
      errors.indexOf(CONFIRM_PASSWORD_NOT_MATCHING) === -1
    ) {
      setErrors(prevErrors => {
        return [...prevErrors, CONFIRM_PASSWORD_NOT_MATCHING];
      });
    } else if (
      password === confirmPassword &&
      errors.indexOf(CONFIRM_PASSWORD_NOT_MATCHING) !== -1
    ) {
      setErrors(prevErrors => {
        return prevErrors.filter(
          error => error !== CONFIRM_PASSWORD_NOT_MATCHING,
        );
      });
    }
  }, [password, confirmPassword]);

  return errors;
};
