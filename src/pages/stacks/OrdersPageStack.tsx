import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Order from "../order/Order";
import {STACK_KEY} from "./StacksKeys";
import {BottomNavigationContext} from "../../context/BottomNavigationContext";
import Chat from "../chat/subsections/Chat";
import {NavigationContainer} from "@react-navigation/native";
import OrdersHistory from "../ordersHistory/OrdersHistory";

export type OrdersPageParamList = {
  OrdersHistory: undefined;
  Order: undefined;
  ChatPage: undefined;
};

const Stack = createNativeStackNavigator<OrdersPageParamList>();

export type OrdersPageProps = {
  switchToTab: (screen: STACK_KEY, params?: any) => void;
}
export const OrdersPageStack = (props: OrdersPageProps) => {

  console.log("OrdersPage props", props);
  return (
    <BottomNavigationContext.Provider value={{switchToTab: props.switchToTab}}>
      <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={"OrdersHistory"}>
          <>
            <Stack.Screen name="OrdersHistory" component={OrdersHistory}/>
            <Stack.Screen name="Order" component={Order}/>
            <Stack.Screen name="ChatPage" component={Chat}/>
          </>

        </Stack.Navigator>
      </NavigationContainer>
    </BottomNavigationContext.Provider>
  )
}
