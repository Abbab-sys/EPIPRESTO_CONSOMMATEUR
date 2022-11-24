import React, {createContext} from 'react';

export type SearchContextType = {
  searchText: string;
  setSearchText: (search: string) => void;
  search: (search: string) => void;
  loading: boolean;
  results: any[];
  setResults: (results: any[]) => void;

}
const defaultContext: SearchContextType = {
  searchText: '',
  setSearchText: (search: string) => {
    console.log('Stub for setSearchText with : ', search);
  },
  search: (search: string) => {
    console.log('Stub for search with : ', search);
  },
  loading: false,
  results: [],
  setResults: (results: any[]) => {
    console.log('Stub for setResults with : ', results);
  }
}

export const SearchContext = createContext<SearchContextType>(defaultContext)

export const SearchProvider = ({children}: { children: React.ReactNode }) => {
  const [searchText, setSearchText] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [results, setResults] = React.useState<any[]>([]);
  const search = (search: string) => {
    setLoading(true);
    setSearchText(search);
  }

  return (
    <SearchContext.Provider value={{searchText, setSearchText, search, results, loading, setResults}}>
      {children}
    </SearchContext.Provider>
  );
}
