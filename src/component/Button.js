import React from 'react';
import {TouchableOpacity, Text,StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES} from "../constants"
const Button = ({text, onClick, buttonColor,type=1}) => {
  return (
    <TouchableOpacity
      onPress={() => onClick()}
      style={styles.primaryButton}
      >
      <Text
        style={styles.primaryText}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primaryButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRadius: SIZES.radius / 1,
    paddingHorizontal: SIZES.padding2,
    width: SIZES.width /3,
    backgroundColor:COLORS.buttonPrimary
  },

  primaryText: {
    ...FONTS.h3,
    color: COLORS.primaryColor
  }
});
export default Button;
