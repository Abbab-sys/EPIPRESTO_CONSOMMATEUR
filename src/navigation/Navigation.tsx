import Login from "../pages/login-signup/login/Login";
import React, {useContext} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Home} from "../pages/home/Home";
import {ClientAuthenticationContext} from "../context/ClientAuthenticationContext";
import SignUp from "../pages/login-logout/sign-up/SignUp";
// import StoreList from "../pages/stores/StoreList";
import ShoppingCart from "../pages/shoppingCart/ShoppingCart";
import Order from "../pages/order/Order";
import AllChats from "../pages/chat/AllChats";
import Chat from "../pages/chat/subsections/Chat";
import OrdersHistory from "../pages/ordersHistory/OrdersHistory";
import Settings from "../pages/settings/Settings";
import Dashboard from "../pages/dashboard/Dashboard";
import Account from "../pages/account/Account";

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
  StoreList: undefined;
  ShoppingCart: undefined;
  Orders: undefined;
  Order: undefined;
  AllChats: undefined;
  ChatPage: undefined;
  Dashboard: undefined;
  Settings: undefined;
  Account: undefined;
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
          <Stack.Screen name="Dashboard" component={Dashboard}/>
          <Stack.Screen name="ShoppingCart" component={ShoppingCart}/>
          <Stack.Screen name="Orders" component={OrdersHistory}/>
          <Stack.Screen name="Order" component={Order}/>
          <Stack.Screen name="AllChats" component={AllChats}/>
          <Stack.Screen name="ChatPage" component={Chat}/>
          <Stack.Screen name="Settings" component={Settings}/>
          <Stack.Screen name="Account" component={Account}/>
        </>
      )}
    </Stack.Navigator>
  )
}
