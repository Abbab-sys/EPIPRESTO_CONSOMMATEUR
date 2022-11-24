import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Stores from "../stores/Stores";
import Store from "../stores/Store";
import {STACK_KEY} from "./StacksKeys";
import {BottomNavigationContext} from "../../context/BottomNavigationContext";
import {NavigationContainer} from "@react-navigation/native";

export type DashboardStackParamList = {
  Stores: undefined;
  Store: undefined;

};

const Stack = createNativeStackNavigator<DashboardStackParamList>();

export type DashboardStackProps = {
  switchToTab: (screen: STACK_KEY, params?: any) => void;
}
export const StoresPageStack = (props: DashboardStackProps) => {

  console.log("DashboardStack props", props);
  return (
    <BottomNavigationContext.Provider value={{switchToTab: props.switchToTab}}>
      <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={"Stores"}>
          <>
            <Stack.Screen name="Stores" component={Stores}/>
            <Stack.Screen name="Store" component={Store}/>
          </>
        </Stack.Navigator>
      </NavigationContainer>
    </BottomNavigationContext.Provider>
  )
}
