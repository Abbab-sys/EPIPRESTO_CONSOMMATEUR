import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Store from "../stores/Store";
import Search from "../search/Search";
import {STACK_KEY} from "./StacksKeys";
import {BottomNavigationContext} from "../../context/BottomNavigationContext";
import ProductPage from "../product/ProductPage";
import {NavigationContainer} from "@react-navigation/native";

export type SearchPageStackParamList = {
  Store: undefined;
  ProductPage: undefined;
  Search: undefined;
};

const Stack = createNativeStackNavigator<SearchPageStackParamList>();

export type SearchPageStackProps = {
  switchToTab: (screen: STACK_KEY, params?: any) => void;
}
export const SearchPageStack = (props: SearchPageStackProps) => {

  console.log("SearchPageStack props", props);
  return (
    <BottomNavigationContext.Provider value={{switchToTab: props.switchToTab}}>
      <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={"Search"}>
        <>
          <Stack.Screen name="Search" component={Search}/>
          <Stack.Screen name="ProductPage" component={ProductPage}/>
          <Stack.Screen name="Store" component={Store}/>
        </>

      </Stack.Navigator>
      </NavigationContainer>
    </BottomNavigationContext.Provider>
  )
}
