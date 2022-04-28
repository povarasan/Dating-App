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


import {AuthContext} from './AuthProvider';
import { Button } from 'react-native-paper';

const FlatListData = [
  {
    id: 1,
    title: 'Feed',
  },
  {
    id: 2,
    title: 'Post',
  },
];

const DrawerStack = props => {
  const [logoutAction, setLogoutAction] = useState(false);
  const clickAction = async item => {
    props.navigation.closeDrawer();
  };

   const {user, logout} = useContext(AuthContext);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileView}>
          <View style={styles.imgView}>
            {/* <Image style={styles.imgStyle} source={Images.profile} resizeMode={'cover'}/> */}
            <View>
              <Text
                numberOfLines={1}
                style={[styles.nameTitle, {...FONTS.h3}]}>
                {'Dating App'}
              </Text>

            </View>
          </View>
          <View>
            {FlatListData.map((item, index) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.3}
                  style={styles.flatListParentView}
                  onPress={() => clickAction(item)}>
                  <View style={{flex: 0.8, justifyContent: 'center'}}>
                    <Text numberOfLines={1} style={styles.tabTitle}>
                      {item.title}
                    </Text>
                  </View>
                  
                </TouchableOpacity>
              );
            })}
          </View>
          <Button  style={styles.logout}onPress={() => logout()} >
            Logout</Button>
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
    ...FONTS.h1,
    marginStart: '56@s',
    color: COLORS.textColor,
  },
  profileView: {
    paddingHorizontal: '15@s',
  },
  imgView: {
    borderBottomWidth: 0.6,
    borderBottomColor: COLORS.secondaryColor,
    paddingVertical: '20@vs',
    flexDirection: 'row',
  },
  nameTitle: {
    color: COLORS.textColor,
    fontWeight:"bold",
    marginTop: '10@vs',
  },
  flatListParentView: {
    flexDirection: 'row',
    paddingVertical: '15@vs',
    borderBottomWidth: 0.6,
    borderBottomColor: COLORS.textColor,
  },
  tabTitle: {
    ...FONTS.body2,
    color: COLORS.whiteColor,
  },
  logout:{
    color:"black"
  }
});
export default DrawerStack;
