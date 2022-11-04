import {useEffect, useState} from "react";
import {Error} from "../../types/errors/Error";
import {MANDATORY_FIELD_EMPTY} from "../../types/errors/MandatoryFieldsErrors";


export const useMandatoryFieldValidator = (fieldValue: string) => {
  const [errors, setErrors] = useState<Error[]>([]);


  useEffect(() => {
    if (fieldValue === '' && errors.indexOf(MANDATORY_FIELD_EMPTY) === -1) {
      setErrors((prevErrors) => {
        return [...prevErrors, MANDATORY_FIELD_EMPTY]
      });
    } else if (fieldValue && errors.indexOf(MANDATORY_FIELD_EMPTY) !== -1) {
      setErrors((prevErrors) => {
        return prevErrors.filter((error) => error !== MANDATORY_FIELD_EMPTY)
      });
    }
  }, [fieldValue]);

  return errors;
}


