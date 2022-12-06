import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {STACK_KEY} from './StacksKeys';
import {BottomNavigationContext} from '../../context/BottomNavigationContext';
import {NavigationContainer} from '@react-navigation/native';
import ShoppingCart from '../shoppingCart/ShoppingCart';

/*
 * Name: Carts Page Stack
 * Description: This file is used to display the carts page stack.
 * Author: Adam Naoui-Busson
 */

export type CartsPageParamList = {
  ShoppingCart: undefined;
};

const Stack = createNativeStackNavigator<CartsPageParamList>();

export type CartsPageProps = {
  switchToTab: (screen: STACK_KEY, params?: any) => void;
};
export const CartsPageStack = (props: CartsPageProps) => {
  return (
    <BottomNavigationContext.Provider value={{switchToTab: props.switchToTab}}>
      <NavigationContainer independent={true}>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={'ShoppingCart'}>
          <>
            <Stack.Screen name="ShoppingCart" component={ShoppingCart} />
          </>
        </Stack.Navigator>
      </NavigationContainer>
    </BottomNavigationContext.Provider>
  );
};
