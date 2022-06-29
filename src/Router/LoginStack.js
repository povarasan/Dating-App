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
import Next from '../Screen/Home/Next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const LoginStack = ({navigation}) => {
const [first,setFirst] = useState(null)

let route ;

useEffect(()=>{
  AsyncStorage.getItem('alreadyLaunched').then(value => {
    if (value == null) {
      AsyncStorage.setItem('alreadyLaunched', 'true');
      setFirst(true);
    } else {
      setFirst(false);
    }
  });
}, []);

if (first === null) {
  return null;
} else if (first == true) {
  route = 'IntroSlider'
 
}else
{
  route = "IntroPage";
}


  return (
    <Stack.Navigator initialRouteName={route}>
       <Stack.Screen
        name="IntroSlider"
        component={IntroSlider}
        options={{
            headerShown: false,
          }}
        //options={{header: () => null}}
      />
       <Stack.Screen
      name="IntroPage"
        component={IntroPage}
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
      <Stack.Screen
        name="Message"
        component={Message}
        options={{
            headerShown: false,
          }}
        //options={{header: () => null}}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
            headerShown: false,
          }}
        //options={{header: () => null}}
      />
        
        <Stack.Screen
        name="Next"
        component={Next}
        options={{
            headerShown: false,
          }}
        //options={{header: () => null}}
      />
        
    </Stack.Navigator>
    
  );
};
export default LoginStack;