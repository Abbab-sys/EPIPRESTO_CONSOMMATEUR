import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {STACK_KEY} from "./StacksKeys";
import {BottomNavigationContext} from "../../context/BottomNavigationContext";
import {NavigationContainer} from "@react-navigation/native";
import ShoppingCart from "../shoppingCart/ShoppingCart";

export type CartsPageParamList = {
  ShoppingCart: undefined;
};

const Stack = createNativeStackNavigator<CartsPageParamList>();

export type CartsPageProps = {
  switchToTab: (screen: STACK_KEY, params?: any) => void;
}
export const CartsPageStack = (props: CartsPageProps) => {

  console.log("CartsPage props", props);
  return (
    <BottomNavigationContext.Provider value={{switchToTab: props.switchToTab}}>
      <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={"ShoppingCart"}>
          <>
            <Stack.Screen name="ShoppingCart" component={ShoppingCart}/>
          </>

        </Stack.Navigator>
      </NavigationContainer>
    </BottomNavigationContext.Provider>
  )
}
