import {gql} from "@apollo/client";

export const IS_CLIENT_EMAIL_USED = gql`
    query Query($email: String!) {
        isClientEmailUsed(email: $email)
    }
`;

export type IsClientEmailUsedData = {
  isClientEmailUsed: boolean;
}
