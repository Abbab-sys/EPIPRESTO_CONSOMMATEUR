import {gql} from "@apollo/client";

export const GET_ORDER_BY_ID = gql`query GetOrderById($idOrder: ID!) {
    getOrderById(idOrder: $idOrder) {
      order {
        orderNumber
        subTotal
        taxs
        deliveryFee
        logs {
          status
        }
        productsVariantsOrdered {
          relatedProductVariant {
            price
            imgSrc
            relatedProduct {
              relatedStore {
                name
                _id
              }
              title
            }
            _id
            variantTitle
          }
          quantity
        }
        _id
      }
    }
  }
`;

export type getOrderByIdData = {
    getOrderById: {
        order: {
            _id: string;
            orderNumber: string;
            subTotal: number;
            taxs: number;
            deliveryFee: number;
            logs: {
                status: string;
            }[];
            productsVariantsOrdered: {
                relatedProductVariant: {
                    _id: string;
                    price: number;
                    imgSrc: string;
                    variantTitle: string;
                    relatedProduct: {
                        title: string;
                        relatedStore: {
                            name: string;
                        }
                    }
                };
                quantity: number;
            }[];
        }
    }
}
