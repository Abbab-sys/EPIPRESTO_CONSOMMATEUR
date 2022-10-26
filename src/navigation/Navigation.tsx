import Login from "../pages/login/Login";
import React, {useContext} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Home} from "../pages/home/Home";
import {ClientAuthenticationContext} from "../context/ClientAuthenticationContext";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {

  const {clientId} = useContext(ClientAuthenticationContext);

  return (
    <Stack.Navigator initialRouteName={"Login"}>
      {!clientId ? (
        <>
          <Stack.Screen name="Login" component={Login}/>
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={Home}/>
        </>
      )}
    </Stack.Navigator>
  )
}
