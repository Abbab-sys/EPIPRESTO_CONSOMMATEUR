import React, {createContext} from 'react';
import {STACK_KEY} from "../pages/stacks/StacksKeys";

/*
 * Name: Bottom Navigation Context
 * Description: This context is used to switch between tabs
 * Author: Adam Naoui-Busson
 */

export type BottomNavigationContextType = {
  switchToTab: (screen: STACK_KEY, params?: any) => void;
}

export const defaultContext: BottomNavigationContextType = {
  switchToTab: (screen: STACK_KEY, params?: any) => {
  },
}

export const BottomNavigationContext = createContext<BottomNavigationContextType>(defaultContext)
