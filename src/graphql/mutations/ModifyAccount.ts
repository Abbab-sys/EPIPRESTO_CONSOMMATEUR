import {gql} from '@apollo/client';

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

