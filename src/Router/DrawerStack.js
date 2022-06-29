import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {COLORS, FONTS, strings} from '../constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider';
import {Button} from 'react-native-paper';
import {Fonts} from '../utils/fontfamily';
import Icons from 'react-native-vector-icons/Entypo';
const DrawerStack = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);

  const Signout = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('Signout');
      });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.secondaryColor}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileView}>
          <View style={styles.imgView}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logo}></Image>
          </View>
          <View style={{marginTop: 50}}>
            <View style={styles.segment}>
              <Icon
                name="home"
                size={30}
                color={'white'}
                style={{height: 50, width: 50,paddingTop:15}}
              />

              <TouchableOpacity
                activeOpacity={0.3}
                style={styles.flatListParentView}
                onPress={() => navigation.navigate('HomePage')}>
                <Text numberOfLines={1} style={styles.tabTitle}>
                  Home
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.segment}>
            <Icon
                name="upload"
                size={30}
                color={'white'}
                style={{height: 50, width: 50,paddingTop:15}}
              />
              <TouchableOpacity
                activeOpacity={0.3}
                style={styles.flatListParentView}
                onPress={() => navigation.navigate('Post')}>
                <Text numberOfLines={1} style={styles.tabTitle}>
                  Post
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.segment}>
            <Icons
                name="chat"
                size={30}
                color={'white'}
                style={{height: 50, width: 50,paddingTop:15}}
              />
              <TouchableOpacity
                activeOpacity={0.3}
                style={styles.flatListParentView}
                onPress={() => navigation.navigate('Chat')}>
                <Text numberOfLines={1} style={styles.tabTitle}>
                  Chat
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.segment}>
            <Icon
                name="sign-out"
                size={30}
                color={'white'}
                style={{height: 50, width: 50,paddingTop:15}}
              />
              <TouchableOpacity
                activeOpacity={0.3}
                style={styles.flatListParentView}
                onPress={() => logout()}>
                <Text numberOfLines={1} style={styles.tabTitle}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = ScaledSheet.create({
  view: {
    height: '46@vs',
    marginHorizontal: '10@s',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingLeft: 40,
    color: COLORS.primaryColor,
  },
  profileView: {
    paddingHorizontal: '15@s',
  },
  imgView: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    paddingVertical: '20@vs',
  },
  nameTitle: {
    color: COLORS.textColor,
    fontWeight: 'bold',
    marginTop: '10@vs',
  },
  flatListParentView: {
    flexDirection: 'row',
    paddingVertical: '15@vs',
    alignSelf: 'center',
   
  },
  tabTitle: {
    ...FONTS.body2,
    color: 'white',
  },
  logout: {
    padding: 10,
    marginTop: 50,
    backgroundColor: 'grey',
    borderRadius: 10,
  },
  logo: {
    alignSelf: 'center',

  },
  segment:{
    flexDirection:"row",
    alignSelf:"center",
    borderBottomWidth: 0.8,
    borderBottomColor: 'white',
    width: '90%',
    marginTop:15
  }
});
export default DrawerStack;
