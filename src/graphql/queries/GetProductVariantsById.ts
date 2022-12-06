import {gql} from '@apollo/client';

/*
 * Name: Get Product Variants By Id
 * Description: This is a GraphQL query that is used to get the product variants by id.
 * Author: Adam Naoui-Busson, Khalil Zriba
 */

export const GET_PRODUCT_VARIANTS_BY_ID = gql`
  query Query($idProduct: ID!, $first: Int, $offset: Int!) {
    getProductById(idProduct: $idProduct) {
      code
      message
      product {
        _id
        brand
        description
        imgSrc
        title
        relatedStore {
          _id
          name
        }
        variants(first: $first, offset: $offset) {
          _id
          displayName
          imgSrc
          stock
          price
          byWeight
          availableForSale
          taxable
          relatedProduct {
            brand
            title
            tags
            description
          }
        }
      }
    }
  }
`;
