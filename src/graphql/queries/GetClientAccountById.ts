import {gql} from '@apollo/client';

/*
 * Name: Get Client Account By Id
 * Description: This is a GraphQL query that is used to get a client account by id.
 * Author: Zouhair Derouich, Ryma Messedaa
 */

export const GET_CLIENT_ACCOUNT_BY_ID = gql`
  query Query($idClient: ID!, $distance: Float!) {
    getClientAccountById(idClient: $idClient) {
      code
      message
      clientAccount {
        _id
        firstName
        orders {
          _id
          orderNumber
          logs {
            status
          }
        }
        nearbyShops(distance: $distance) {
          _id
          name
          isOpen
          isPaused
          address
          shopCategory
          disponibilities {
            activesHours {
              endingHour
              openingHour
            }
            day
          }
        }
      }
    }
  }
`;

export enum OrderStatus {
  CLOSED = 'CLOSED',
  CONFIRMED = 'CONFIRMED',
  DELIVERED = 'DELIVERED',
  IN_DELIVERY = 'IN DELIVERY',
  WAITING_CONFIRMATION = 'WAITING CONFIRMATION',
}

export type GetClientAccountData = {
  getClientAccountById: {
    code: number;
    message: string;
    clientAccount: {
      _id: string;
      firstName: string;
      orders: [
        {
          _id: string;
          orderNumber: string;
          logs: [status: OrderStatus];
        },
      ];
      nearbyShops: [
        {
          _id: string;
          name: string;
          isOpen: boolean;
        },
      ];
    };
  };
};
