import {gql} from '@apollo/client';

/*
 * Name: Login Client By Username
 * Description: This is a GraphQL query that is used to login a client by username.
 * Author: Adam Naoui-Busson
 */

export const LOGIN_CLIENT_BY_USERNAME = gql`
  query LoginClientByUsername($username: String!, $password: String!) {
    loginClientByUsername(username: $username, password: $password) {
      code
      message
      clientAccount {
        _id
      }
    }
  }
`;

export type LoginClientByUsernameData = {
  loginClientByUsername: {
    code: number;
    message: string;
    clientAccount: {
      _id: string;
    };
  };
};
