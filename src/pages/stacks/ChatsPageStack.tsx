import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Order from '../order/Order';
import {STACK_KEY} from './StacksKeys';
import {BottomNavigationContext} from '../../context/BottomNavigationContext';
import Chat from '../chat/subsections/Chat';
import {NavigationContainer} from '@react-navigation/native';
import AllChats from '../chat/AllChats';

/*
 * Name: Chats Page Stack
 * Description: This file is used to display the chats page stack.
 * Author: Adam Naoui-Busson
 */

export type ChatsPageParamList = {
  AllChats: undefined;
  ChatPage: undefined;
  Order: undefined;
};

const Stack = createNativeStackNavigator<ChatsPageParamList>();

export type ChatsPageProps = {
  switchToTab: (screen: STACK_KEY, params?: any) => void;
};
export const ChatsPageStack = (props: ChatsPageProps) => {
  return (
    <BottomNavigationContext.Provider value={{switchToTab: props.switchToTab}}>
      <NavigationContainer independent={true}>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={'AllChats'}>
          <>
            <Stack.Screen name="AllChats" component={AllChats} />
            <Stack.Screen name="Order" component={Order} />
            <Stack.Screen name="ChatPage" component={Chat} />
          </>
        </Stack.Navigator>
      </NavigationContainer>
    </BottomNavigationContext.Provider>
  );
};
