import Login from "../pages/login-signup/login/Login";
import React, {useContext} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Home} from "../pages/home/Home";
import {ClientAuthenticationContext} from "../context/ClientAuthenticationContext";
import SignUp from "../pages/login-logout/sign-up/SignUp";
import StoreList from "../pages/stores/StoreList";
import ShoppingCart from "../pages/shoppingCart/ShoppingCart";
import Orders from "../pages/orders/Orders";
import OrderInfo from "../pages/order/Order";
import Order from "../pages/order/Order";

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
  StoreList: undefined;
  ShoppingCart: undefined;
  Orders: undefined;
  Order: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {

  const {clientId} = useContext(ClientAuthenticationContext);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={"Order"}>
      {clientId ? (
        <>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="SignUp" component={SignUp}/>
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="StoreList" component={StoreList}/>
          <Stack.Screen name="ShoppingCart" component={ShoppingCart}/>
          <Stack.Screen name="Orders" component={Orders}/>
          <Stack.Screen name="Order" component={Order}/>
        </>
      )}
    </Stack.Navigator>
  )
}
