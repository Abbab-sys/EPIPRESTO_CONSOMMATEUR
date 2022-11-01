import {gql} from "@apollo/client";

export const IS_CLIENT_USERNAME_USED = gql`
    query Query($username: String!) {
        isClientUsernameUsed(username: $username)
    }
`;

export type IsClientUsernameUsedData = {
  isClientUsernameUsed: boolean;
}
