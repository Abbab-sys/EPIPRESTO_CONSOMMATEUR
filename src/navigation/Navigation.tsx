import Login from '../pages/login-signup/login/Login';
import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '../pages/home/Home';
import {ClientAuthenticationContext} from '../context/ClientAuthenticationContext';
import SignUp from '../pages/login-signup/sign-up/SignUp';

/*
 * Name: Navigation
 * Description: This file is used to navigate between the different pages of the application.
 * Author: Adam Naoui-Busson, Zouhair Derouich, Ryma Messedaa, Khalil Zriba, Alessandro van Reusel
 */

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
  const {clientId} = useContext(ClientAuthenticationContext);

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'Home'}>
      {!clientId ? (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={Home} />
        </>
      )}
    </Stack.Navigator>
  );
};
