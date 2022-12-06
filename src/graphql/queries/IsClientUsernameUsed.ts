import {gql} from '@apollo/client';

/*
 * Name: Is Client Username Used
 * Description: This is a GraphQL query that is used to check if a client username is used.
 * Author: Adam Naoui-Busson
 */

export const IS_CLIENT_USERNAME_USED = gql`
  query Query($username: String!) {
    isClientUsernameUsed(username: $username)
  }
`;

export type IsClientUsernameUsedData = {
  isClientUsernameUsed: boolean;
};
