import {useEffect, useState} from "react";
import {Error} from "../../types/errors/Error";
import {useLazyQuery} from "@apollo/client";
import {IS_CLIENT_USERNAME_USED, IsClientUsernameUsedData} from "../../graphql/queries/IsClientUsernameUsed";
import {USERNAME_USED} from "../../types/errors/UsernameErrors";
import { MANDATORY_FIELD_EMPTY } from "../../types/errors/MandatoryFieldsErrors";


export const useUsernameValidator = (username: string) => {
  const [errors, setErrors] = useState<Error[]>([]);

  const [isClientUsernameUsed, {data}] = useLazyQuery(IS_CLIENT_USERNAME_USED, {
    fetchPolicy: "network-only",
  });
  const isClientUsernameUsedData: IsClientUsernameUsedData | undefined = data as IsClientUsernameUsedData;


  useEffect(() => {
    if (username === '' && errors.indexOf(MANDATORY_FIELD_EMPTY) === -1) {
      setErrors((prevErrors) => {
        return [...prevErrors, MANDATORY_FIELD_EMPTY]
      });
    } else if (username && errors.indexOf(MANDATORY_FIELD_EMPTY) !== -1) {
      setErrors((prevErrors) => {
        return prevErrors.filter((error) => error !== MANDATORY_FIELD_EMPTY)
      });
    }
    // To prevent the waiting time for the server to respond, we can use a local validation
    setErrors((prevErrors) => {
      return [...prevErrors, USERNAME_USED]
    });
    const timeout = setTimeout(async () => {
      await isClientUsernameUsed({
        variables: {
          username: username
        }
      });
    }, 250);

    return () => clearTimeout(timeout);
  }, [username]);

  useEffect(() => {
    if (!isClientUsernameUsedData) return;

    if (isClientUsernameUsedData?.isClientUsernameUsed && errors.indexOf(USERNAME_USED) === -1) {
      setErrors((prevErrors) => {
        return [...prevErrors, USERNAME_USED]
      });
    } else if (!isClientUsernameUsedData?.isClientUsernameUsed && errors.indexOf(USERNAME_USED) !== -1) {
      setErrors((prevErrors) => {
        return prevErrors.filter((error) => error !== USERNAME_USED)
      });
    }
  }, [isClientUsernameUsedData]);


  return errors;
}


