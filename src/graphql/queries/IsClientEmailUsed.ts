import {gql} from "@apollo/client";

/*
 * Name: Is Client Email Used
 * Description: This is a GraphQL query that is used to check if a client email is used.
 * Author: Adam Naoui-Busson
 */

export const IS_CLIENT_EMAIL_USED = gql`
    query Query($email: String!) {
        isClientEmailUsed(email: $email)
    }
`;

export type IsClientEmailUsedData = {
  isClientEmailUsed: boolean;
}
