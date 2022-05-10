import React, {useState, useEffect} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from "../Screen/Home/HomePage"
import Login from '../Screen/Login/Login';
import Signup from '../Screen/Signup/Signup';
import IntroSlider from "../Screen/IntroSlider/IntroSlider"
import IntroPage  from "../Screen/IntroPage/IntroPage"
import Post from '../Screen/Home/HomePage';
import Chat from '../Screen/Chat/Chat';
import Message from '../Screen/Chat/Message'


const Stack = createNativeStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator initialRouteName='IntroSlider'>
     
      <Stack.Screen
        name="IntroPage"
        component={IntroPage}
        options={{
            headerShown: false,
          }}
        //options={{header: () => null}}
      />
       <Stack.Screen
        name="IntroSlider"
        component={IntroSlider}
        options={{
            headerShown: false,
          }}
        //options={{header: () => null}}
      />
     <Stack.Screen
        name="Login"
        component={Login}
        options={{
            headerShown: false,
          }}
        //options={{header: () => null}}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
            headerShown: false,
          }}
        //options={{header: () => null}}
      />
    </Stack.Navigator>
  );
};
export default LoginStack;