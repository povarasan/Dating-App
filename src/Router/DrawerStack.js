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

const DrawerStack = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);

  const Signout = () => {
    auth().signOut().then(()=>{
      console.log('Signout')
  
    })
   
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.secondaryColor}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileView}>
          <View style={styles.imgView}>
            <View>
              <Text style={styles.title}>Dating App!</Text>
            </View>
          </View>

          <View style={{marginTop: 50}}>
            <TouchableOpacity
              activeOpacity={0.3}
              style={styles.flatListParentView}
              onPress={() => navigation.navigate('HomePage')}>
              <Text numberOfLines={1} style={styles.tabTitle}>
                Home
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.3}
              style={styles.flatListParentView}
              onPress={() => navigation.navigate('Post')}>
              <Text numberOfLines={1} style={styles.tabTitle}>
                Post
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.3}
              style={styles.flatListParentView}
              onPress={() => navigation.navigate('Chat')}>
              <Text numberOfLines={1} style={styles.tabTitle}>
                Chat
              </Text>
            </TouchableOpacity>
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
    fontSize: 30,
    fontWeight: 'bold',
    paddingLeft: 35,
    color: COLORS.primaryColor,
  },
  profileView: {
    paddingHorizontal: '15@s',
  },
  imgView: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    paddingVertical: '20@vs',
    flexDirection: 'row',
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
    borderBottomWidth: 0.8,
    borderBottomColor: 'white',
    width: '90%',
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
});
export default DrawerStack;
