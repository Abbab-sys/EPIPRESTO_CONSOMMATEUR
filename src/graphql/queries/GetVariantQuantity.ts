import {gql} from "@apollo/client";

export const GET_VARIANT_QUANTITY = gql`query GetVariantQuantity($idVariant: ID!) {
    getProductVariantById(idVariant: $idVariant) {
      code
      message
      productVariant {
        stock
        _id
      }
    }
  }
  `;

export type GetVariantQuantityData = {
    getProductVariantById: {
        code: number;
        message: string;
        productVariant: {
            stock: number;
            _id: string;
        }
    }
}
