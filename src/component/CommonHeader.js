import React from 'react';
import {View, SafeAreaView, Text, TouchableOpacity} from 'react-native';
import {Vector, COLORS, FONTS, adjust} from '../constants';
import {ScaledSheet} from 'react-native-size-matters';

const CommonHeader = ({onClick, type}) => {
  return (
    <SafeAreaView style={Styles.container}>
      {type == 1 ? 
        <View style={Styles.firstFlex}>
          <TouchableOpacity style={Styles.menu} onPress={onClick} >
            {Vector.MenuImage}
          </TouchableOpacity>
          <Text style={Styles.header}>Feed </Text>
        </View>
       : type == 2 ? 
        <View style={Styles.firstFlex}>
          <TouchableOpacity style={Styles.menu} onPress={onClick} >
            {Vector.HeaderBackArrow}
          </TouchableOpacity>
          <Text style={Styles.header}>Post</Text>
        </View>
       : type == 3 ? 
        <View style={Styles.firstFlex}>
          <TouchableOpacity style={Styles.menu} onPress={onClick} >
            {Vector.HeaderBackArrow}
          </TouchableOpacity>
          <Text style={Styles.header}>Chat</Text>
        </View>
       : null}
    </SafeAreaView>
  );
};

const Styles = ScaledSheet.create({
  container: {
    backgroundColor: COLORS.primaryColor,
    height: '55@vs',
  },
  firstFlex: {
    flexDirection: 'row',
    flex: 1,
  },
  menu: {
    flex: 0.37,
    paddingLeft: '20@s',
    marginTop: '10@vs',
    top: 5,
    color: 'black',
  },

  header: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 0.63,
    color: '#000',
    top: 10,
    paddingLeft: 28,
    alignItems:"center",
    justifyContent:"center"
  },
});

export default CommonHeader;
