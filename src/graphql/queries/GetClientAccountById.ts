import {gql} from "@apollo/client";

export const GET_CLIENT_ACCOUNT_BY_ID = gql`
    query GetClientAccountById($idClient: ID!, $distance: Int!) {
        getClientAccountById(idClient: $idClient) {
        clientAccount {
            nearbyShops(distance: $distance) {
            _id
            address
            isOpen
            name
            }
        }
        }
    }
`;