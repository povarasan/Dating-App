//--- Font Family , Color codes
import {PixelRatio, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const pixelRatio = PixelRatio.get(); //Ratio for getting density of mobile devices

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
//Responsive Layout Calculations
const adjust = size => {
  if (pixelRatio >= 2 && pixelRatio < 3) {
    // iphone 5s and older Androids
    if (deviceWidth < 360) {
      return size * 0.95;
    }
    // iphone 5
    if (deviceHeight < 667) {
      return size;
      // iphone 6-6s
    }
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.15;
    }
    // older phablets
    return size * 1.25;
  }
  if (pixelRatio >= 3 && pixelRatio < 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (deviceWidth <= 360) {
      return size;
    }
    // Catch other weird android width sizings
    if (deviceHeight < 667) {
      return size * 1.15;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.2;
    }
    // catch larger devices
    // ie iphone 6s plus / 7 plus / mi note 等等
    return size * 1.27;
  }
  if (pixelRatio >= 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (deviceWidth <= 360) {
      return size;
      // Catch other smaller android height sizings
    }
    if (deviceHeight < 667) {
      return size * 1.2;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.25;
    }
    // catch larger phablet devices
    return size * 1.4;
  }
  return size;
};

const Palette = {
  white: '#ffffff',
  white1: '#FBFBFB',
  black: '#000',
  black0: '#1B1B1B',
  green: '#6ECDB9',
  gray: '#A4A6B3',
  gray1: '#C4C4C4',
  gray2:'#555555',
  blue:"#0087ED",
  orange: '#FF940D',
  lightGray: 'rgba(0, 0, 0, 0.22)',
  lightGray1: '#B0B0B0',
  red: '#E00000',
  darkGray: '#E5E5E5',
  darkBlue: '#8C84D7',
  Neutral: '#665B6D',
};

export const COLORS = {
  primaryColor: Palette.white,
  secondaryColor: Palette.blue,
  background: Palette.white1,
  buttonPrimary: Palette.blue,
  buttonSecondary: Palette.white,
  buttonTertiary: Palette.orange,
  textColor: Palette.black,
  textColor1: Palette.gray,
  textColor2: Palette.lightGray1,
  textColor3: Palette.darkBlue,
  textColor4: Palette.Neutral,
  textColor5:Palette.gray2,
  modalBackground: Palette.lightGray,
  error: Palette.red,
  border: Palette.gray1,
  errorRed: Palette.red,
  pdf: Palette.darkGray,
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 40,
  padding: 10,
  padding2: 12,

  //Vector Icons size
  icon: 20,
  secondIcon: 15,

  // font sizes
  h1: 28,
  h2: 20,
  h3: 18,
  h4: 14,
  h5: 10,
  h6: 12,
  body1: 28,
  body2: 18,
  body3: 14,
  body4: 12,
  body5: 10,
  body6: 8,
  // app dimensions
  width,
  height,
};
const Fonts = {
  Bold: 'Poppins-Bold',
  Regular: 'Poppins-Regular',
  Medium: 'Poppins-Medium',
  SemiBold: 'Poppins-SemiBold',
};

export const FONTS = {
  h1: {
    fontFamily: Fonts.Bold,
    fontSize: adjust(SIZES.h1),
    lineHeight: 36,
  },
  h2: {
    fontFamily: Fonts.Regular,
    fontSize: adjust(SIZES.h2),
    lineHeight: 30,
  },
  h3: {
    fontFamily: Fonts.Medium,
    fontSize: adjust(SIZES.h3),
    lineHeight: adjust(28),
  },
  h4: {
    fontFamily: Fonts.Medium,
    fontSize: adjust(SIZES.h4),
    lineHeight: 22,
  },
  h5: {
    fontFamily: Fonts.SemiBold,
    fontSize: adjust(SIZES.h5),
    lineHeight: 22,
  },
  h6: {
    fontFamily: Fonts.Bold,
    fontSize: adjust(SIZES.h6),
    lineHeight: adjust(23),
  },

  body1: {
    fontFamily: Fonts.Medium,
    fontSize: adjust(SIZES.body1),
    lineHeight: 36,
  },
  body2: {
    fontFamily: Fonts.Medium,
    fontSize: adjust(SIZES.body2),
    lineHeight: 30,
  },
  body3: {
    fontFamily: Fonts.Medium,
    fontSize: adjust(SIZES.body3),
    lineHeight: 28,
  },
  body4: {
    fontFamily: Fonts.Regular,
    fontSize: adjust(SIZES.body4),
    lineHeight: 22,
  },
  body5: {
    fontFamily: Fonts.Medium,
    fontSize: adjust(SIZES.body5),
    lineHeight: 22,
  },
  body6: {
    fontFamily: Fonts.Regular,
    fontSize: adjust(SIZES.body6),
    lineHeight: 22,
  },
};
const appTheme = {COLORS, SIZES, FONTS, Fonts};

export default appTheme;
