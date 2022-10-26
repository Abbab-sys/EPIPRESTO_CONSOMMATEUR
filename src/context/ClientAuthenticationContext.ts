import React from "react";

type ClientAuth = {
  clientId: string;
  setClientId: (clientId: string) => void;
}
const defaultContext: ClientAuth = {
  clientId: '',
  setClientId: (clientId) => {
    console.log('Stub for setClientId with : ', clientId);
  },
};
export const ClientAuthenticationContext = React.createContext<ClientAuth>(defaultContext);
