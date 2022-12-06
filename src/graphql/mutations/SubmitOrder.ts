import {gql} from '@apollo/client';

/*
 * Name: Submit Order
 * Description: This is a GraphQL mutation that is used to submit an order.
 * Author: Adam Naoui-Busson, Zouhair Derouich
 */

export const SUBMIT_ORDER = gql`
  mutation Mutation(
    $clientId: ID!
    $paymentMethod: PaymentMethod!
    $productsVariantsToOrder: [ProductOrderedInput!]!
  ) {
    submitOrder(
      clientId: $clientId
      paymentMethod: $paymentMethod
      productsVariantsToOrder: $productsVariantsToOrder
    ) {
      code
      message
      order {
        _id
      }
    }
  }
`;

export type SubmitOrderData = {
  submitOrder: {
    code: number;
    message: string;
    order: {
      _id: string;
    };
  };
};
