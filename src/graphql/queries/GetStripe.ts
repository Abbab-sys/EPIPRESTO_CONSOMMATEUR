import {gql} from "@apollo/client";

export const GET_STRIPE = gql`
    query GetStripe($variantsToOrder: [VariantToOrder!]!) {
        getStripe(variantsToOrder: $variantsToOrder) {
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

export type GetStripeVariantToOrder = {
    variantId: string;
    quantity: number;
}
export type GetStripeData = {
  getStripe: {
    code: number;
    message: string;
    stripe: {
      paymentIntent: string;
      ephemeralKey: string;
      customer: string;
      publishableKey: string;
    }
  };
}
