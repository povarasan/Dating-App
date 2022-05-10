import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/AntDesign';
import {ScaledSheet} from 'react-native-size-matters';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomePage from '../Screen/Home/HomePage';
import Post from '../Screen/Post/Post';
import {COLORS, FONTS, SIZES} from '../constants';
import DrawerStack from './DrawerStack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/Entypo';
import CommonHeader from '../component/CommonHeader';
import Chat from '../Screen/Chat/Chat';
import Iconss from 'react-native-vector-icons/Entypo';
import Message from '../Screen/Chat/Message';
import Login from '../Screen/Login/Login';
import IntroSlider from '../Screen/IntroSlider/IntroSlider';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const HomeStack = createNativeStackNavigator();
const PostStack = createNativeStackNavigator();
const ChatStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

export const RootStack = ({}) => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarStyle: styles.TabStyleBar,
        tabBarLabelStyle: styles.TabLabelStyle,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name={'HomeScreen'}
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarActiveTintColor: COLORS.secondaryColor,
          tabBarIcon: ({color}) => (
            <Iconss
              name="home"
              size={35}
              color={color}
              style={{height: 50, width: 50, marginTop: 30}}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'PostStackScreen'}
        component={PostStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarActiveTintColor: COLORS.secondaryColor,
          tabBarIcon: ({color}) => (
            <Icon
              name="pluscircleo"
              size={35}
              color={color}
              style={{height: 50, width: 50, marginTop: 30}}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'ChatStackScreen'}
        component={ChatStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarActiveTintColor: COLORS.secondaryColor,
          tabBarIcon: ({color}) => (
            <Icons
              name="chat"
              size={40}
              color={color}
              style={{height: 50, width: 50, marginTop: 30}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const DrawerScreens = ({navigation}) => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerStack {...props} />}
      initialRouteName="DrawerScreens">
      <Drawer.Screen
        name="DrawerScreens"
        component={MainScreens}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

const HomeScreen = ({navigation}) => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={'Home'}
        component={HomePage}
        options={{
          headerShown: false,
          // header: () => (
          //   <CommonHeader
          //     type={1}
          //     onClick={() => navigation.openDrawer()}

          //   />
          // ),
        }}
      />
    </HomeStack.Navigator>
  );
};

const PostStackScreen = ({navigation}) => {
  return (
    <PostStack.Navigator>
      <PostStack.Screen
        name={'Post'}
        component={Post}
        options={{
          headerShown: false,
        }}
      />
    </PostStack.Navigator>
  );
};

const ChatStackScreen = ({navigation}) => {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name={'Chat'}
        component={Chat}
        options={{
          headerShown: false,
        }}
      />
    </ChatStack.Navigator>
  );
};

const MainScreens = ({navigation}) => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name={'MainScreens'}
        component={RootStack}
        options={{
          headerShown: false,
        }}
      />

      <MainStack.Screen
        name={'Message'}
        component={Message}
        options={{
          headerShown: false,
        }}
      />

      <MainStack.Screen
        name={'HomePage'}
        component={HomePage}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name={'Post'}
        component={Post}
        options={{
          headerShown: false,
        }}
      />
    </MainStack.Navigator>
  );
};

const styles = ScaledSheet.create({
  TabLabelStyle: {
    fontSize: '11@s',
  },
  TabStyleBar: {
    position: 'absolute',
    height: SIZES.height / 12,
  },
});
export default DrawerScreens;
