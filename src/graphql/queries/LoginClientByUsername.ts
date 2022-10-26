import {gql} from "@apollo/client";

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
        }
    }
}
