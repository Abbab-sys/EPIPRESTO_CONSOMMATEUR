import {gql} from '@apollo/client';

/*
 * Name: Get Client Info By Id
 * Description: This is a GraphQL query that is used to get the client info by id.
 * Author: Alessandro van Reusel
 */

export const GET_CLIENT_INFO_BY_ID = gql`
  query getClientInfoById($idClient: ID!) {
    getClientAccountById(idClient: $idClient) {
      clientAccount {
        _id
        address
        email
        firstName
        lastName
        password
        phone
        username
      }
    }
  }
`;
export type GetClientInfoData = {
  getClientAccountById: {
    clientAccount: {
      _id: string;
      address: string;
      email: string;
      firstName: string;
      lastName: string;
      password: string;
      phone: string;
      username: string;
    };
  };
};
