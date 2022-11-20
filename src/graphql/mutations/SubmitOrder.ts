import { gql } from "@apollo/client";

export const SUBMIT_ORDER = gql`
  mutation Mutation($clientId: ID!, $paymentMethod: PaymentMethod!, $productsVariantsToOrder: [ProductOrderedInput!]!) {
    submitOrder(clientId: $clientId, paymentMethod: $paymentMethod, productsVariantsToOrder: $productsVariantsToOrder) {
      code
      message
      order {
        _id
      }
    }
  }
`

export type SubmitOrderData = {
  submitOrder: {
    code: number;
    message: string;
    order: {
      _id: string;
    }
  };
}