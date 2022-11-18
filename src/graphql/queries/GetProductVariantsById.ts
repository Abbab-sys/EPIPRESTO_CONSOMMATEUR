import {gql} from "@apollo/client";


export const GET_PRODUCT_VARIANTS_BY_ID = gql`
    query Query($idProduct: ID!) {
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
            variants {
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
`

