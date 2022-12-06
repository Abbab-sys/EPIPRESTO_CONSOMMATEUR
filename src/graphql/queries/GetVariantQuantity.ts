import {gql} from "@apollo/client";

/*
 * Name: Get Variant Quantity
 * Description: This is a GraphQL query that is used to get the quantity of a variant.
 * Author: Adam Naoui-Busson
 */

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
