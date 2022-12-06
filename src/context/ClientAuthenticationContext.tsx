import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

/*
 * Name: Client Authentication Context
 * Description: This context is used to store the client id of the user 
 * Author: Adam Naoui-Busson
 */

type ClientAuth = {
  clientId: string;
  setClientId: (clientId: string) => void;
}
const defaultContext: ClientAuth = {
  clientId: '',
  setClientId: (clientId) => {
  },
};
export const ClientAuthenticationContext = React.createContext<ClientAuth>(defaultContext);

export const ClientAuthenticationProvider = ({children}: { children: React.ReactNode }) => {
  const [clientId, setClientId] = React.useState<string>('');
  AsyncStorage.getItem('@clientId').then((value) => {
      if (value) setClientId(value);
    }
  );
  return (
    <ClientAuthenticationContext.Provider value={{clientId, setClientId}}>
      {children}
    </ClientAuthenticationContext.Provider>
  );
}
