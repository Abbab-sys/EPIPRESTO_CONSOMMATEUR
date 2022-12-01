import {gql} from "@apollo/client";

export const SEARCH_PRODUCTS = gql`
    query SearchProducts($search: String!) {
        searchProducts(search: $search) {
            _id
            title
            imgSrc
            relatedStore {
                _id
                name
                isOpen
                isPaused
            }
            published
            tags
        }
    }
`;

export type SearchProductsData = {
  searchProducts: {
    _id: string;
    title: string;
    imgSrc: string;
    relatedStore: {
      _id: string;
      name: string;
      isOpen: boolean;
      isPaused: boolean;
    }
    published: boolean;
    tags: string[];
  }[];
}
