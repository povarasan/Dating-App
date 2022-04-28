import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, Image } from "react-native";
import {
  COLORS,
  FONTS,
  SIZES,
  adjust,
  PlaceHolders,
  Images,
} from "../constants/index";
import CommonButton from "../components/buttons/CommonButton";
import { ScaledSheet } from "react-native-size-matters";
import NetInfo from "@react-native-community/netinfo";

const OfflineNotify = (props) => {
  const [isOffline, setOfflineStatus] = useState(false);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !state.isConnected;
      console.log("offline", offline);
      setOfflineStatus(offline);
    });
    return () => removeNetInfoSubscription();
  }, []);

  const onPress = () => {};

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      {!isOffline ? (
        props.children
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View style={styles.container}>
            <Image
              style={styles.whoops}
              resizeMode={"contain"}
              source={Images.notifyoffline}
            />
            <Text style={styles.text1}> Whoops!</Text>
            <Text style={styles.text2}>There seems to be problem with </Text>
            <Text style={styles.text3}> Your network connection</Text>
          </View>
          <View style={styles.buttonView}>
            <CommonButton
              buttonStyle={styles.ButtonStyle}
              isLoading={false}
              text={"Retry"}
              textStyle={styles.buttonTextStyle}
              onPress={() => {
                onPress;
              }}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
const styles = ScaledSheet.create({
  container: {
    alignItems: "center",
  },
  whoops: {
    height: "85@vs",
    width: "85@s",
    alignSelf: "center",
  },
  ButtonStyle: {
    // marginBottom: "150@vs",
    height: "45@vs",
    width: "140@s",
    borderRadius: "8@msr",
    backgroundColor: COLORS.primaryColor,
    marginTop: "40@msr",
  },
  buttonTextStyle: {
    ...FONTS.h3,
    fontSize: adjust(14),
    color: COLORS.whiteColor,
  },
  text1: {
    fontWeight: "500",
    fontSize: adjust(24),
    marginTop: "10@msr",
    color: COLORS.darkGrey,
  },
  text2: {
    fontWeight: "400",
    // ...FONTS.body3,
    fontSize: adjust(13),
    marginTop: "10@vs",
    // color:COLORS.blackColor,
    // ...FONTS.body5,
    color: COLORS.blackColor,
  },
  text3: {
    //...FONTS.body5,
    fontWeight: "400",
    //...FONTS.body3,
    fontSize: adjust(13),
    //...FONTS.t0,
    color: COLORS.blackColor,
  },
  buttonView: {
    flex: 0.1,
    // marginTop: "15@msr",
    // marginBottom: "30@msr",
  },
});
export default OfflineNotify;
