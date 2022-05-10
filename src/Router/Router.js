import {StyleSheet, Text, View,Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import React, {useContext, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider';
import Loading from '../component/Loading';
import SplashScreen from 'react-native-splash-screen';
import LoginStack from './LoginStack';
import DrawerScreens from './RootStack';
import CodePush from 'react-native-code-push';

const Router = () => {
  const {user, setUser} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
    setLoading(false);
  };

  useEffect(() => {
    SplashScreen.hide();

    syncImmediate();
    console.log(user,'iii')
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
    
  }, []);

  const syncImmediate = () => {
    CodePush.sync(
      {installMode: CodePush.InstallMode.ON_NEXT_RESTART, updateDialog: true},
      codePushStatusDidChange,
    );
  };
  // Code Push Checking for Update
  const codePushStatusDidChange = syncStatus => {
    switch (syncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log('CHECKING_FOR_UPDATE');
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log('DOWNLOADING_PACKAGE');
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        console.log('AWAITING_USER_ACTION');
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        console.log('INSTALLING_UPDATE');
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        console.log('UP_TO_DATE');
        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        console.log('UPDATE_IGNORED');
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        console.log('UPDATE_INSTALLED');
        Alert.alert(
          '',
          'Update successfully installed, please restart now',
          [{text: 'Restart', onPress: () => Restart()}],
          {cancelable: false},
        );
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        console.log('UNKNOWN_ERROR');
        break;
    }
  };
  // Restart after code push
  const Restart = () => {
    CodePush.restartApp();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {user ? <DrawerScreens /> : <LoginStack />}
    </NavigationContainer>
  );
};

export default Router;

const styles = StyleSheet.create({});
