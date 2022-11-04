import {gql} from "@apollo/client";

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
}
