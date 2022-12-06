import {gql} from '@apollo/client';

/*
 * Name: Client Sign Up
 * Description: This is a GraphQL query that is used to sign up a client.
 * Author: Adam Naoui-Busson
 */

export const CLIENT_SIGN_UP = gql`
  mutation Mutation($accountInput: ClientAccountInput) {
    clientSignUp(accountInput: $accountInput) {
      code
      message
    }
  }
`;

export type ClientSignUpData = {
  clientSignUp: {
    code: number;
    message: string;
  };
};
