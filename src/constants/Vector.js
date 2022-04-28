/* eslint-disable react-native/no-inline-styles */
// Vector Icons
import React from "react";
import { COLORS, SIZES } from "./theme";
import MenuIcon from "react-native-vector-icons/Ionicons";
import NotificationIcon from "react-native-vector-icons/MaterialCommunityIcons";
import CartIcon from "react-native-vector-icons/MaterialCommunityIcons";
import BackIcon from "react-native-vector-icons/AntDesign";
import BackArrowIcon from "react-native-vector-icons/AntDesign";
import HeaderBackArrowIcon from "react-native-vector-icons/AntDesign";
import DrawerRightIcon from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import CancelIcon from "react-native-vector-icons/Feather";
import CloseIcon from "react-native-vector-icons/Ionicons";
import EyeIcon from "react-native-vector-icons/Ionicons";
import EyeOffIcon from "react-native-vector-icons/Ionicons";

export const MenuImage = (
  <MenuIcon name={"ios-menu-sharp"} color={COLORS.textColor} size={35}  />
);

const NotificationImage = (
  <NotificationIcon name={"bell"} color={COLORS.whiteColor} size={22} />
);

const CartImage = (
  <CartIcon name={"cart"} color={COLORS.whiteColor} size={22} />
);

const Back = (
  <BackIcon name={"left"} color={COLORS.darkGrey} size={SIZES.icon} />
);

const BackArrow = (
  <BackArrowIcon name={"arrowleft"} color={COLORS.primaryColor} size={25} />
);

const HeaderBackArrow = (
  <HeaderBackArrowIcon name={"arrowleft"} color={COLORS.whiteColor} size={25} />
);

const DrawerRight = (
  <DrawerRightIcon name={"right"} color={COLORS.darkGrey} size={20} />
);

const cancel = <Feather name={"x-circle"} color={COLORS.darkGrey} size={20} />;

const CancelX = <CancelIcon name={"x"} color={COLORS.darkGrey} size={20} />;

const close = <CloseIcon name={"close"} color={COLORS.blackColor} size={17} />;

const Eye = <EyeIcon name={"eye"} color={COLORS.darkGrey} size={25} />;

const EyeOff = <EyeOffIcon name={"eye-off"} color={COLORS.darkGrey} size={25} />;

export default {
  Back,
  MenuImage,
  NotificationImage,
  CartImage,
  BackArrow,
  DrawerRight,
  HeaderBackArrow,
  cancel,
  CancelX,
  close,
  Eye,
  EyeOff,
};
