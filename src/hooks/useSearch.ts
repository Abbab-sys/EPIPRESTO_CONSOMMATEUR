import {useContext, useEffect} from 'react';
import {Store} from '../interfaces/OrderInterface';
import {useLazyQuery} from '@apollo/client';
import {
  SEARCH_PRODUCTS,
  SearchProductsData,
} from '../graphql/queries/SearchProducts';
import {SearchContext} from '../context/SearchContext';

/*
 * Name: Use Search
 * Description: This is the hook for the search functionality.
 * Author: Alessandro van Reusel, Ryma Messedaa, Adam Naoui-Busson
 */

interface SearchProductResult {
  _id: string;
  title: string;
  published: boolean;
  imgSrc: string;
  tags: string[];
}

export interface SearchResult {
  store: Store;
  matchingProducts: SearchProductResult[];
}

export const useSearch = () => {
  const {searchText, setSearchText, setResults, results} =
    useContext(SearchContext);

  // Query for searching products
  const [searchProducts, {data, loading}] = useLazyQuery(SEARCH_PRODUCTS, {
    onError: e => console.log(e),
  });
  const unwrappedData: SearchProductsData = data || null;

  // Search for products
  const search = async (search: string) => {
    setSearchText(search);
    await searchProducts({
      variables: {
        search: search,
      },
    });
  };

  // Update results
  useEffect(() => {
    if (!unwrappedData) return;
    const storeProducts = new Map<string, SearchProductResult[]>();
    const storeNames = new Map<string, string>();
    const storePaused = new Map<string, boolean>();
    const storeOpen = new Map<string, boolean>();
    for (const product of unwrappedData.searchProducts) {
      if (!storeProducts.has(product.relatedStore._id)) {
        storeProducts.set(product.relatedStore._id, []);
        storeNames.set(product.relatedStore._id, product.relatedStore.name);
        storePaused.set(
          product.relatedStore._id,
          product.relatedStore.isPaused,
        );
        storeOpen.set(product.relatedStore._id, product.relatedStore.isOpen);
      }
      if (!storeProducts.has(product.relatedStore._id)) {
        continue;
      }

      if(!product.published) continue;
      storeProducts.get(product.relatedStore._id)?.push(
        {
        _id: product._id,
        title: product.title,
        published: product.published,
        imgSrc: product.imgSrc,
        tags: product.tags,
        }
      
      );
    }

    const newResults: SearchResult[] = [];
    for (const [storeId, products] of storeProducts) {
      newResults.push({
        store: {
          id: storeId,
          name: storeNames.get(storeId) || '',
          isOpen: storeOpen.get(storeId) || false,
          isPaused: storePaused.get(storeId) || false,
        },
        matchingProducts: products,
      });
    }
    setResults(newResults);
  }, [unwrappedData]);
  return {search, results, loading, searchText, setSearchText};
};
