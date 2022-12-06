import React, {createContext} from 'react';

/*
 * Name: Search Context
 * Description: This context is used to store the search text and the results of the search
 * Author: Adam Naoui-Busson
 */

export type SearchContextType = {
  searchText: string;
  setSearchText: (search: string) => void;
  search: (search: string) => void;
  loading: boolean;
  results: any[];
  setResults: (results: any[]) => void;
};
const defaultContext: SearchContextType = {
  searchText: '',
  setSearchText: (search: string) => {},
  search: (search: string) => {},
  loading: false,
  results: [],
  setResults: (results: any[]) => {},
};

export const SearchContext = createContext<SearchContextType>(defaultContext);

export const SearchProvider = ({children}: {children: React.ReactNode}) => {
  const [searchText, setSearchText] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [results, setResults] = React.useState<any[]>([]);
  // Search function that will be called by the search bar component to search for a specific text
  const search = (search: string) => {
    setLoading(true);
    setSearchText(search);
  };

  return (
    <SearchContext.Provider
      value={{searchText, setSearchText, search, results, loading, setResults}}>
      {children}
    </SearchContext.Provider>
  );
};
