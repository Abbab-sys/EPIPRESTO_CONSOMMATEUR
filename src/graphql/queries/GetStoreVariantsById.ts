import {gql} from "@apollo/client";

export const GET_STORE_VARIANTS_BY_ID = gql`
  query GetStoreById($idStore: ID!, $offset: Int!, $first: Int) {
    getStoreById(idStore: $idStore) {
      code
      message
      store {
        products(offset: $offset, first: $first) {
          title
          imgSrc
          variants {
            _id
            variantTitle
            imgSrc
            stock
          }
        }
      }
    }
  }
`