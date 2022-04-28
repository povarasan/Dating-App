import React, { Component, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { COLORS, Fonts } from "../constants";
import { ScaledSheet } from "react-native-size-matters";
import CodePush from "react-native-code-push";
import crashlytics from "@react-native-firebase/crashlytics";
import { CommonPopup } from "../components/modal/CommonPopup";
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from "react-native-exception-handler";
import RNExitApp from "react-native-exit-app";

const ErrorBoundary = (props) => {
  const [err, setErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const reporter = (error) => {
    crashlytics().log(error.toString());
    crashlytics().recordError(new Error(error.toString()), error.toString());
    setTimeout(() => {
      setErr(true);
    }, 100);
  };

  const errorHandler = (e, isFatal) => {
    if (isFatal) {
      setErrorMessage(e.name + " " + e.message);
      reporter(e);
    } else {
      console.log(e); // So that we can see it in the ADB logs in case of Android if needed
    }
  };

  setJSExceptionHandler(errorHandler);

  setNativeExceptionHandler((errorString) => {
    //You can do something like call an api to report to dev team here
    //example
    // fetch('http://<YOUR API TO REPORT TO DEV TEAM>?error='+errorString);
    //
  });

  return (
    <SafeAreaView style={Styles.container}>
      {!err ? (
        props.children
      ) : (
        <View style={{ flex: 1 }}>
          <CommonPopup
            type={0}
            title={"Oops! Unexpected error occurred"}
            subtitle={errorMessage}
            isVisible={true}
            successButtonText={"Restart app"}
            negativeButtonText={"Exit app"}
            onPressNo={() => RNExitApp.exitApp()}
            onPressYes={() => CodePush.restartApp()}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ErrorBoundary;

const Styles = ScaledSheet.create({
  ButtonStyle: {
    height: 55,
    backgroundColor: "#000",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  TextStyle: {
    fontSize: 14,
    fontFamily: Fonts.Regular,
    color: COLORS.blackColor,
  },
  container: {
    flex: 1,
  },
  ButtonStyle: {
    backgroundColor: "#000",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  TextStyle: {
    fontSize: 14,
    fontFamily: Fonts.Bold,
    color: COLORS.blackColor,
  },
});
