import {gql} from "@apollo/client";

export const GET_STRIPE = gql`
    query GetStripe($idClient:ID,$variantsToOrder: [VariantToOrder!]!) {
        getStripe(idClient:$idClient,variantsToOrder: $variantsToOrder) {
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
    }
  };
}
