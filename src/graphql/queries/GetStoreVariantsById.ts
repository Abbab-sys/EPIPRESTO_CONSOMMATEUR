import {gql} from "@apollo/client";

export const GET_STORE_VARIANTS_BY_ID = gql`
  query GetStoreById($idStore: ID!, $offset: Int!, $first: Int) {
    getStoreById(idStore: $idStore) {
      code
      message
      store {
        name
        address
        isOpen
        products(offset: $offset, first: $first) {
          published
          variants {
            _id
            variantTitle
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
            }
          }
        }
      }
    }
  }
`