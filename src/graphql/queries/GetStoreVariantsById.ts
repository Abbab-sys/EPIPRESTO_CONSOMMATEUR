import {gql} from '@apollo/client';

/*
 * Name: Get Store Variants By Id
 * Description: This is a GraphQL query that is used to get the store variants by id.
 * Author: Ryma Messedaa
 */

export const GET_STORE_VARIANTS_BY_ID = gql`
  query GetStoreById(
    $idStore: ID!
    $first: Int!
    $offset: Int!
    $filterAvailable: Boolean
    $variantsOffset2: Int!
    $variantsFilterAvailable2: Boolean
    $variantsFirst2: Int
  ) {
    getStoreById(idStore: $idStore) {
      code
      message
      store {
        name
        address
        isOpen
        isPaused
        products(
          first: $first
          offset: $offset
          filterAvailable: $filterAvailable
        ) {
          published
          variants(
            offset: $variantsOffset2
            filterAvailable: $variantsFilterAvailable2
            first: $variantsFirst2
          ) {
            _id
            displayName
            imgSrc
            stock
            price
            byWeight
            taxable
            availableForSale
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
  }
`;
