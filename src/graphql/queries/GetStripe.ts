import {gql} from '@apollo/client';

/*
 * Name: Get Stripe
 * Description: This is a GraphQL query that is used to get the stripe data.
 * Author: Adam Naoui-Busson
 */

export const GET_STRIPE = gql`
  query GetStripe($idClient: ID, $variantsToOrder: [VariantToOrder!]!) {
    getStripe(idClient: $idClient, variantsToOrder: $variantsToOrder) {
      code
      message
      stripe {
        paymentIntent
        ephemeralKey
        customer
        publishableKey
      }
    }
  }
`;
export type GetStripeData = {
  getStripe: {
    code: number;
    message: string;
    stripe: {
      paymentIntent: string;
      ephemeralKey: string;
      customer: string;
      publishableKey: string;
    };
  };
};
