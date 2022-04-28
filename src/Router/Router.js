import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { AuthContext } from './AuthProvider';
import Loading from '../component/Loading';
import SplashScreen from 'react-native-splash-screen';
import LoginStack from './LoginStack';
import DrawerScreens from './RootStack'

 const Router = () => {
  
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);
  
  // Handle user state changes
  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
    setLoading(false);
  }

  useEffect(() => {
    SplashScreen.hide()

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);


  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {user ? <DrawerScreens/>:<LoginStack/>  } 
      
    </NavigationContainer>
  );
};

export default Router;

const styles = StyleSheet.create({})