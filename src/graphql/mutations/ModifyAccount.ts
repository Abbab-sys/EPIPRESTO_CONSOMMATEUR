import {gql} from '@apollo/client';

/*
 * Name: Modify Account
 * Description: This is a GraphQL mutation that is used to modify a client account.
 * Author: Alessandro van Reusel
 */

export const MODIFY_ACCOUNT = gql`
  mutation modifyAccount(
    $clientId: ID!
    $fieldsToUpdate: UpdateClientAccount!
  ) {
    updateClientAccount(clientId: $clientId, fieldsToUpdate: $fieldsToUpdate) {
      code
      message
    }
  }
`;

export type modifyAccountData = {
  updateClientAccount: {
    code: number;
    message: string;
  };
};
