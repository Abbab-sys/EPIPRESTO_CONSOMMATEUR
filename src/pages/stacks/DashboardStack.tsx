import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../dashboard/Dashboard';
import Order from '../order/Order';
import Stores from '../stores/Stores';
import Settings from '../settings/Settings';
import Account from '../account/Account';
import Store from '../stores/Store';
import Search from '../search/Search';
import {STACK_KEY} from './StacksKeys';
import {BottomNavigationContext} from '../../context/BottomNavigationContext';
import Chat from '../chat/subsections/Chat';
import {NavigationContainer} from '@react-navigation/native';

/*
 * Name: Dashboard Stack
 * Description: This file is used to display the dashboard stack.
 * Author: Adam Naoui-Busson
 */

export type DashboardStackParamList = {
  Store: undefined;
  Order: undefined;
  Dashboard: undefined;
  Settings: undefined;
  Account: undefined;
  Search: undefined;
  ChatPage: undefined;
  Stores: undefined;
};

const Stack = createNativeStackNavigator<DashboardStackParamList>();

export type DashboardStackProps = {
  switchToTab: (screen: STACK_KEY, params?: any) => void;
};
export const DashboardStack = (props: DashboardStackProps) => {
  return (
    <BottomNavigationContext.Provider value={{switchToTab: props.switchToTab}}>
      <NavigationContainer independent={true}>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={'Dashboard'}>
          <>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Order" component={Order} />
            <Stack.Screen name="Store" component={Store} />
            <Stack.Screen name="Stores" component={Stores} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Account" component={Account} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="ChatPage" component={Chat} />
          </>
        </Stack.Navigator>
      </NavigationContainer>
    </BottomNavigationContext.Provider>
  );
};
