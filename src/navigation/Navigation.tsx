import Login from "../pages/login-signup/login/Login";
import React, {useContext} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Home} from "../pages/home/Home";
import {ClientAuthenticationContext} from "../context/ClientAuthenticationContext";
import ShoppingCart from "../pages/shoppingCart/ShoppingCart";
import SignUp from "../pages/login-signup/sign-up/SignUp";

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
  StoreList: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {

  const {clientId} = useContext(ClientAuthenticationContext);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={"Login"}>
      {!clientId ? (
        <>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="SignUp" component={SignUp}/>
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="StoreList" component={ShoppingCart}/>
        </>
      )}
    </Stack.Navigator>
  )
}
