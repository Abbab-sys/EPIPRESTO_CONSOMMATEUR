import React, { useContext } from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split} from "@apollo/client";
import {getMainDefinition} from "@apollo/client/utilities";
import {createClient} from "graphql-ws";
import {Navigation} from "./navigation/Navigation";
import {ClientAuthenticationContext, ClientAuthenticationProvider} from "./context/ClientAuthenticationContext";
import {Provider as PaperProvider} from 'react-native-paper';
import StoreList from './pages/stores/StoreList';
import {theme} from "./theme/Theme";
import '../i18n'
import {CartProvider} from './context/CartContext';
import { ChatContext, ChatProvider } from './context/ChatContext';
import { useChatManager } from './hooks/ChatManagerHook';

const App: () => JSX.Element = () => {

  const wsLink = new GraphQLWsLink(
    createClient({
      url: 'wss://10.0.2.2:4000/graphql',
    }),
  );

  const httpLink = new HttpLink({
    uri: 'http://10.0.2.2:4000/graphql',
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
          <ChatProvider>
            <NavigationContainer>
              <Navigation/>
            </NavigationContainer>
          </ChatProvider>
          </PaperProvider>
        </ApolloProvider>
      </ClientAuthenticationProvider>
    </CartProvider>

  );
};

export default App;
