import {gql} from '@apollo/client';

/*
 * Name: Get Store Variants By Id
 * Description: This is a GraphQL query that is used to get the store variants by id.
 * Author: Ryma Messedaa
 */

export const GET_STORE_VARIANTS_BY_ID = gql`
  query GetStoreById(
    $idStore: ID!
    $offset: Int!
    $first: Int!
    $searchText: String
  ) {
    getStoreById(idStore: $idStore) {
      code
      message
      store {
        name
        address
        isOpen
        isPaused
        products(offset: $offset, first: $first) {
          published
          variants(offset: $offset, first: $first, searchText: $searchText) {
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
