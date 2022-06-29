import {
    Dimensions,
    Animated,
    Platform,
    PixelRatio,
    Easing,
    Alert,
    Linking
  } from "react-native";
  import Snackbar from "react-native-snackbar";
  import Colors from "../themes/colors";
  import messaging from "@react-native-firebase/messaging";
  const uuidv4 = require("uuid/v4");
  import Moment from "moment";
  var { height, width } = Dimensions.get("window");
  var result;
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
  // based on iphone 5s's scale
  const scale = SCREEN_WIDTH / 320;
  const font_size = (size) => {
    const newSize = size * scale;
    if (Platform.OS === "ios") {
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
  };
  const lineHeight = (fontSize) => {
    const multiplier = fontSize > 20 ? 1.5 : 1;
    return parseInt(fontSize + fontSize * multiplier, 10);
  };
  const dimen_size_height = (size) => {
    return (height / 100) * size;
  };
  const dimen_size_width = (size) => {
    return (width / 100) * size;
  };
  const validateEmail = (email) => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  const allownumonly = (num) => {
    return num.replace(/[^0-9]/g, "");
  };
  const restrict_sc = (text) => {
    
   return text.replace(/[`~0-9!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
  }
  const snackBar = (txt, duration, color = Colors.red_color) => {
    Snackbar.show({
      text: txt,
      duration: duration,
      backgroundColor: color,
    });
  };
  const validatePhoneno = (data) => {
    return data.replace(/\D/g, "");
  };
  function fetchApiCall(url, params) {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((response) => response.json())
      .then((responseData) => {
        result = JSON.stringify(responseData);
        return result;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const getFcmToken = async () => {
    const token = await messaging().getToken();
    if (token) {
      return token;
    }
  };
  function isIphoneX() {
    const dimen = Dimensions.get("window");
    return (
      Platform.OS === "ios" &&
      !Platform.isPad &&
      !Platform.isTVOS &&
      (dimen.height === 780 ||
        dimen.width === 780 ||
        dimen.height === 812 ||
        dimen.width === 812 ||
        dimen.height === 844 ||
        dimen.width === 844 ||
        dimen.height === 896 ||
        dimen.width === 896 ||
        dimen.height === 926 ||
        dimen.width === 926)
    );
  }
  function getBottomSpace(data) {
    return isIphoneX() ? data : 0;
  }
  function getGreetingTime(m) {
    var g = null; //return g
    if (!m || !m.isValid()) {
      return;
    } //if we can't find a valid or filled moment, we return.
    var split_afternoon = 12; //24hr time to split the afternoon
    var split_evening = 17; //24hr time to split the evening
    var currentHour = parseFloat(m.format("HH"));
    if (currentHour >= split_afternoon && currentHour <= split_evening) {
      g = "Good Afternoon";
    } else if (currentHour >= split_evening) {
      g = "Good Evening";
    } else {
      g = "Good Morning";
    }
    return g;
  }
  const stringValPatternValidation = val => {
    return /\s/g.test(val);
  };
  const rotate_image = (isFocused) => {
    let spinValue = new Animated.Value(0);
    // First set up animation
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 100,
      easing: Easing.linear, // Easing is an additional import from react-native
      useNativeDriver: true, // To make use of native driver for performance
    }).start();
    // Next, interpolate beginning and end values (in this case 0 and 1)
    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: isFocused ? ["90deg", "45deg"] : ["45deg", "90deg"],
    });
    return spin;
  };
  const parseMessage = (str) => {
    let match = str.match(/\b\d{4}\b/);
    return match && match[0];
  };
  const getuuid = () => {
    return uuidv4();
  };
  const isEmpty=(obj)=> {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
  const addhtml_content = (fontFileName, fileFormat, description) => {
    const fontfamily = Platform.select({
      ios: `${fontFileName}.${fileFormat}`,
      android: `file:///android_asset/fonts/${fontFileName}.${fileFormat}`,
    });
    return `<html><meta name="viewport" content="initial-scale=1, maximum-scale=0.5"> <head> 
    <style  type="text/css"> img { display: block; max-width: 100%; height: auto; }  @font-face {     font-family: ${fontFileName};     src: url(${fontfamily}) } body {   margin: 25px;    font-size: 35px;   font-family:  ${fontFileName}; } </style> </head>${description} </html>`;
  };
  const showPermmisonalert = (title,description) => {
    Alert.alert(
      title,
      description,
      [
        {text: 'ok', onPress: () => console.log('Do nothing')},
        {text: 'go to settings', onPress: () => Linking.openSettings(), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
  }
  const showAlert = (title,description,onReport) => {
    Alert.alert(
      title,
      description,
      [
        {text: 'cancel', onPress: () => console.log('Do nothing')},
        {text: 'Report', onPress: {onReport}, style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
  }
  const getMonthList = () => {
    var month_list = Moment.months();
    var result = [];
    month_list.forEach((item, index) => {
      var output = parseInt(index, 10) + 1;
      output += "";
      result.push({
        name: item,
        month: output.length < 2 ? "0" + output : output,
      });
    });
    return result;
  };
  const getYearList = () => {
    var year_list = new Date().getFullYear();
    var min = year_list - 100;
    var years = [];
    for (var i = year_list; i >= min; i--) {
      years.push({
        name: i - 18,
      });
    }
    return years;
  };
  function getDays  () {
    var date = new Date(2021, 4, 1);
    var days = [];
    while (date.getMonth() === 4) {
      days.push({
        name: String(date.getDate()).padStart(2, '0'),
      });
     date.setDate(date.getDate() + 1);
    }
    return days;
  };
  export {
    dimen_size_height,
    dimen_size_width,
    validateEmail,
    allownumonly,
    snackBar,
    fetchApiCall,
    isIphoneX,
    validatePhoneno,
    font_size,
    getGreetingTime,
    rotate_image,
    lineHeight,
    parseMessage,
    getFcmToken,
    getuuid,
    addhtml_content,
    getMonthList,
    getYearList,
    getDays,
    restrict_sc,
    showPermmisonalert,
    getBottomSpace,
    showAlert,
    isEmpty,
    stringValPatternValidation
  };