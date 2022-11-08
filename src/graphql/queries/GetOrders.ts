import {gql} from "@apollo/client";

export const GET_ORDERS = gql`
query GetOrders($idClient: ID!) {
    getClientById(idClient: $idClient) {
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
    getClientById: {
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
        }
    }    
}
