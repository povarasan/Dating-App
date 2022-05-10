import {
  Dimensions,
  Animated,
  Platform,
  PixelRatio,
  StatusBar,
} from "react-native";

var { height, width } = Dimensions.get("window");
import Snackbar from "react-native-snackbar";
import { COLORS } from "../constants";
import messaging from "@react-native-firebase/messaging";

var result;

const { width: SCREEN_WIDTH } = Dimensions.get("window");

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
const isTrim = (text) => {
  return text.trimStart();
};
const validateEmail = (email) => {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
const allowNumOnly = (num) => {
  return num.replace(/[^0-9]/g, "");
};

const allowOnlyLetter = (letter) => {
  return letter.replace(/[`~0-9!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "");
};
const allowFloatDigitOnly = (letter) => {
  return letter.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1");
};
const numericOnly = (value) => {
  var num = /^[0-9]+$/;
  return num.test(value);
};
const passWordValidation = (pass) => {
  var regularExpression = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return regularExpression.test(pass);
};
const validURL = (str) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
};
const validatePhoneno = (data) => {
  return data.replace(/\D/g, "");
};
function isResponseValid(response) {
  if (response.status === 200 || response.status === 201) {
    if (response.data.status === 1) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
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

export function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
}

export function getStatusBarHeight(safe) {
  return Platform.select({
    ios: ifIphoneX(safe ? 44 : 30, 20),
    android: StatusBar.currentHeight,
    default: 0,
  });
}

export function getBottomSpace(data) {
  return isIphoneX() ? data : 0;
}

const snackBar = (txt, duration, color = COLORS.blackColor) => {
  Snackbar.show({
    text: txt,
    duration: Snackbar.LENGTH_LONG,
    backgroundColor: color,
    numberOfLines: 50,
  });
};

function getDateToString(date) {
  let dateStr =
    date.getFullYear() +
    "-" +
    parseInt(date.getMonth() + 1) +
    "-" +
    ("0" + date.getDate()).slice(-2);
  return dateStr;
}

// Getting FCM Token
async function getFcmToken() {
  const token = await messaging().getToken();
  if (token) {
    return token;
  } else {
    return null;
  }
}

export {
  dimen_size_height,
  dimen_size_width,
  validateEmail,
  allowNumOnly,
  isIphoneX,
  validatePhoneno,
  font_size,
  lineHeight,
  snackBar,
  allowOnlyLetter,
  isTrim,
  getDateToString,
  isResponseValid,
  numericOnly,
  passWordValidation,
  validURL,
  allowFloatDigitOnly,
  getFcmToken
};
