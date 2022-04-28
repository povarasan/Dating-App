import React from 'react';
import {TouchableOpacity, Text,StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES} from "../constants"
const Buttons = ({text, onClick, buttonColor,type=1}) => {
  return (
    <TouchableOpacity
    style={styles.secondaryButton}
      onPress={() => onClick()}
     >
      <Text  style={styles.secondaryText}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  secondaryButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRadius:SIZES.radius / 1,
    borderWidth:1,
    width: SIZES.width /3,
    backgroundColor:COLORS.buttonSecondary,
    borderColor:COLORS.secondaryColor,
  },

  secondaryText: {
    ...FONTS.h3,
    color: COLORS.secondaryColor
  },
});
export default Buttons;
