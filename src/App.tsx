import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split} from "@apollo/client";
import {getMainDefinition} from "@apollo/client/utilities";
import {createClient} from "graphql-ws";
import {Navigation} from "./navigation/Navigation";
import {ClientAuthenticationProvider} from "./context/ClientAuthenticationContext";
import {Provider as PaperProvider} from 'react-native-paper';
import {theme} from "./theme/Theme";
import '../i18n'
import {CartProvider} from './context/CartContext';

const App: () => JSX.Element = () => {

  const wsLink = new GraphQLWsLink(
    createClient({
      url: 'http://192.168.0.66:4000/',
    }),
  );

  const httpLink = new HttpLink({
    uri: 'http://192.168.0.66:4000/',
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

  return (
    <CartProvider>
      <ClientAuthenticationProvider>
        <ApolloProvider client={client}>
          <PaperProvider theme={theme}>
            <NavigationContainer>
              <Navigation/>
            </NavigationContainer>
          </PaperProvider>
        </ApolloProvider>
      </ClientAuthenticationProvider>
    </CartProvider>

  );
};

export default App;
