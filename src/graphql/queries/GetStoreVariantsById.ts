import {gql} from "@apollo/client";

export const GET_STORE_VARIANTS_BY_ID = gql`
  query GetStoreById($idStore: ID!, $offset: Int!, $first: Int, $searchText: String) {
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
`