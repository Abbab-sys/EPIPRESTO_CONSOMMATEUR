import {gql} from "@apollo/client";

export const GET_ORDER_BY_ID = gql`query GetOrderById($idOrder: ID!) {
  getOrderById(idOrder: $idOrder) {
    order {
      _id
      orderNumber
      subTotal
      taxs
      deliveryFee
      logs {
        status
      }
      productsVariantsOrdered {
        
        relatedProductVariant {
          _id
          price
          imgSrc
          relatedProduct {
            relatedStore {
              _id
              name
            }
            title
          }
          
          variantTitle
        }
        quantity
      }
      relatedChats {
        _id
        relatedVendor {
          _id
        }
        
      }
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
                            _id: string;
                            name: string;
                        }
                    }
                };
                quantity: number;
            }[];
            relatedChats: {
                _id: string;
                relatedVendor: {
                    _id: string;
                }
            }[];
        }
    }
}
