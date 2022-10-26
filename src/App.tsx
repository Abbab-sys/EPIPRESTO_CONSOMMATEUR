import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split} from "@apollo/client";
import {getMainDefinition} from "@apollo/client/utilities";
import {createClient} from "graphql-ws";
import {Navigation} from "./navigation/Navigation";
import {ClientAuthenticationContext} from "./context/ClientAuthenticationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Provider as PaperProvider} from 'react-native-paper';

const App: () => JSX.Element = () => {

  const wsLink = new GraphQLWsLink(
    createClient({
      url: 'wss://epipresto.pagekite.me/graphql',
    }),
  );

  const httpLink = new HttpLink({
    uri: 'https://epipresto.pagekite.me/',
  });

  const splitLink = split(
    ({query}) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );


  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });

  const [clientId, setClientId] = React.useState<string>('');
  AsyncStorage.getItem('@clientId').then((value) => {
      if (value) setClientId(value);
    }
  );
  return (

    <ClientAuthenticationContext.Provider value={{clientId, setClientId}}>
      <ApolloProvider client={client}>
        <PaperProvider>
          <NavigationContainer>
            <Navigation/>
          </NavigationContainer>
        </PaperProvider>
      </ApolloProvider>
    </ClientAuthenticationContext.Provider>

  );
};

export default App;
