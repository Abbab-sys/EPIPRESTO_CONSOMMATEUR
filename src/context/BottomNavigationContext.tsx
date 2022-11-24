import React, {createContext} from 'react';
import {STACK_KEY} from "../pages/stacks/StacksKeys";

export type BottomNavigationContextType = {
  switchToTab: (screen: STACK_KEY, params?: any) => void;
}

export const defaultContext: BottomNavigationContextType = {
  switchToTab: (screen: STACK_KEY, params?: any) => {
    console.log("defaultContext switchToTab", screen, params);
  },
}

export const BottomNavigationContext = createContext<BottomNavigationContextType>(defaultContext)
