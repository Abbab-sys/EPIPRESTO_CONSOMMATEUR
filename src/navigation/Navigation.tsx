import Login from "../pages/login-signup/login/Login";
import React, {useContext} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Home} from "../pages/home/Home";
import {ClientAuthenticationContext} from "../context/ClientAuthenticationContext";
import SignUp from "../pages/login-signup/sign-up/SignUp";

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {

  const {clientId} = useContext(ClientAuthenticationContext);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={"Home"}>
      {!clientId ? (
        <>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="SignUp" component={SignUp}/>
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={Home}/>
          {/*<Stack.Screen name="Dashboard" component={Dashboard}/>*/}
          {/*<Stack.Screen name="ShoppingCart" component={ShoppingCart}/>*/}
          {/*<Stack.Screen name="Orders" component={OrdersHistory}/>*/}
          {/*<Stack.Screen name="Order" component={Order}/>*/}
          {/*<Stack.Screen name="AllChats" component={AllChats}/>*/}
          {/*<Stack.Screen name="ChatPage" component={Chat}/>*/}
          {/*<Stack.Screen name="Stores" component={Stores}/>*/}
          {/*<Stack.Screen name="Store" component={Store}/>*/}
          {/*<Stack.Screen name="ProductPage" component={ProductPage}/>*/}
          {/*<Stack.Screen name="Settings" component={Settings}/>*/}
          {/*<Stack.Screen name="Account" component={Account}/>*/}
          {/*<Stack.Screen name="Search" component={Search}/>*/}
        </>
      )}
    </Stack.Navigator>
  )
}
