import {useEffect, useState} from "react";
import {Error} from "../../types/errors/Error";
import {CONFIRM_PASSWORD_NOT_MATCHING} from "../../types/errors/ConfirmPasswordErrors";


export const useConfirmPasswordValidator = (password: string,confirmPassword:string) => {
  const [errors, setErrors] = useState<Error[]>([]);


  useEffect(() => {
    if (password !== confirmPassword && errors.indexOf(CONFIRM_PASSWORD_NOT_MATCHING) === -1) {
      setErrors((prevErrors) => {
        return [...prevErrors, CONFIRM_PASSWORD_NOT_MATCHING]
      });
    } else if (password === confirmPassword && errors.indexOf(CONFIRM_PASSWORD_NOT_MATCHING) !== -1) {
      setErrors((prevErrors) => {
        return prevErrors.filter((error) => error !== CONFIRM_PASSWORD_NOT_MATCHING)
      });
    }
  }, [password,confirmPassword]);

  return errors;
}


