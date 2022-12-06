import {gql} from '@apollo/client';

/*
 * Name: Get Orders
 * Description: This is a GraphQL query that is used to get the orders of a client.
 * Author: Alessandro van Reusel, Zouhair Derouich
 */

export const GET_ORDERS = gql`
  query GetOrders($idClient: ID!) {
    getClientAccountById(idClient: $idClient) {
      code
      message
      clientAccount {
        orders {
          _id
          orderNumber
          logs {
            status
            time
          }
          subTotal
          deliveryFee
          taxs
          productsVariantsOrdered {
            quantity
          }
        }
      }
    }
  }
`;

export type GetOrdersData = {
  getClientAccountById: {
    code: number;
    message: string;
    clientAccount: {
      orders: {
        _id: string;
        orderNumber: number;
        logs: {
          status: string;
          time: string;
        }[];
        subTotal: number;
        deliveryFee: number;
        taxs: number;
        productsVariantsOrdered: {
          quantity: number;
        }[];
      }[];
    };
  };
};
