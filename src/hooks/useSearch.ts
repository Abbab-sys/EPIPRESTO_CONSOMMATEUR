import {useContext, useEffect} from "react";
import {Store} from "../interfaces/OrderInterface";
import {useLazyQuery} from "@apollo/client";
import {SEARCH_PRODUCTS, SearchProductsData} from "../graphql/queries/SearchProducts";
import {SearchContext} from "../context/SearchContext";

interface SearchProductResult {
  _id: string,
  title: string,
  published: boolean,
  imgSrc: string,
}

export interface SearchResult {
  store: Store,
  matchingProducts: SearchProductResult[]
}


export const useSearch = () => {

  const {searchText, setSearchText, setResults, results} = useContext(SearchContext)

  const [searchProducts, {data, loading}] = useLazyQuery(SEARCH_PRODUCTS, {onError: (e) => console.log(e)});
  console.log(data)
  const unwrappedData: SearchProductsData = data || null;
  const search = async (search: string) => {
    console.log("searching for " + search);
    setSearchText(search)
    await searchProducts({
      variables: {
        search: search
      }
    })
  }

  useEffect(() => {
    if (!unwrappedData) return
    console.log(unwrappedData)
    const storeProducts = new Map<string, SearchProductResult[]>()
    const storeNames = new Map<string, string>()
    for (const product of unwrappedData.searchProducts) {
      if (!storeProducts.has(product.relatedStore._id)) {
        storeProducts.set(product.relatedStore._id, [])
        storeNames.set(product.relatedStore._id, product.relatedStore.name)
      }
      if (!storeProducts.has(product.relatedStore._id)) {
        continue
      }
      storeProducts.get(product.relatedStore._id)?.push({
        _id: product._id,
        title: product.title,
        published: product.published,
        imgSrc: product.imgSrc
      })
    }

    const newResults: SearchResult[] = []
    for (const [storeId, products] of storeProducts) {
      newResults.push({
        store: {
          id: storeId,
          name: storeNames.get(storeId) || ''
        },
        matchingProducts: products
      })
    }
    setResults(newResults)
    console.log("results", results)
  }, [unwrappedData])
  return {search, results, loading, searchText, setSearchText}
}
