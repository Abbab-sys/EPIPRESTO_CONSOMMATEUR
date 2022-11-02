import {useEffect, useState} from "react";
import {Error} from "../../types/errors/Error";
import {EMAIL_EMPTY, EMAIL_NOT_VALID, EMAIL_USED} from "../../types/errors/EmailErrors";
import {useLazyQuery} from "@apollo/client";
import {IS_CLIENT_EMAIL_USED, IsClientEmailUsedData} from "../../graphql/queries/IsClientEmailUsed";


export const useEmailValidator = (email: string) => {
  const [errors, setErrors] = useState<Error[]>([]);

  const [isClientEmailUsed, {data}] = useLazyQuery(IS_CLIENT_EMAIL_USED, {
    fetchPolicy: "network-only",
  });
  const isClientEmailUsedData: IsClientEmailUsedData | undefined = data as IsClientEmailUsedData;

  const validateEmail = (email: string): boolean => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
  };

  useEffect(() => {
    if (email === '' && errors.indexOf(EMAIL_EMPTY) === -1) {
      setErrors((prevErrors) => {
        return [...prevErrors, EMAIL_EMPTY]
      });
    } else if (email && errors.indexOf(EMAIL_EMPTY) !== -1) {
      setErrors((prevErrors) => {
        return prevErrors.filter((error) => error !== EMAIL_EMPTY)
      });
    }

    if (!validateEmail(email) && errors.indexOf(EMAIL_NOT_VALID) === -1) {
      setErrors((prevErrors) => {
        return [...prevErrors, EMAIL_NOT_VALID]
      });
    } else if (validateEmail(email) && errors.indexOf(EMAIL_NOT_VALID) !== -1) {
      setErrors((prevErrors) => {
        return prevErrors.filter((error) => error !== EMAIL_NOT_VALID)
      });
      setErrors((prevErrors) => {
        return [...prevErrors, EMAIL_USED]
      });
    }

    const timeout = setTimeout(async () => {
      await isClientEmailUsed({
        variables: {
          email: email
        }
      });
    }, 250);

    return () => clearTimeout(timeout);
  }, [email]);

  useEffect(() => {
    if(!isClientEmailUsedData) return; // To prevent the waiting time for the server to respond, we can use a local validation

    if (isClientEmailUsedData?.isClientEmailUsed && errors.indexOf(EMAIL_USED) === -1) {
      setErrors((prevErrors) => {
        return [...prevErrors, EMAIL_USED]
      });
    } else if (!isClientEmailUsedData?.isClientEmailUsed && errors.indexOf(EMAIL_USED) !== -1) {
      setErrors((prevErrors) => {
        return prevErrors.filter((error) => error !== EMAIL_USED)
      });
    }
  }, [isClientEmailUsedData]);

  console.log(errors);


  return errors;
}


