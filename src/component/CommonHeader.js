import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import {Vector, COLORS, FONTS, adjust, } from "../constants";

import { ScaledSheet } from "react-native-size-matters";


const CommonHeader = ({
  onClick,
  type,
  title,
}) => {

  return (
    <SafeAreaView style={Styles.container}>

  
        <View style={Styles.firstFlex}>
          <TouchableOpacity style={Styles.menu} onPress={onClick}>
           {Vector.MenuImage}
          </TouchableOpacity>
          {type == 1 ? (null): (
            <Text style={Styles.headerTitle}>RoomDetails</Text>
          )}
        </View>
    
    </SafeAreaView>
  );
};

const Styles = ScaledSheet.create({
  container: {
    backgroundColor: COLORS.primaryColor,
    height:"35@vs",
  },
  linearGradient: {
    flex: 1,
    justifyContent:'center',
  },
  firstFlex: {
    alignItems: "flex-start",
    flexDirection: "row",
  },
  menu: { marginLeft: "10@vs" },
  notify: { marginRight: "15@vs", alignItems: "center" },
  imageStyle: {
    height: "30@vs",
    width: "48@s",
    resizeMode: "contain",
    marginLeft: "10@vs",
  },
  headerTitle: {
    ...FONTS.h3,
    // fontSize: adjust(12),
    color: COLORS.blackColor,
    marginLeft: "10@s",
  },
});

export default CommonHeader;
