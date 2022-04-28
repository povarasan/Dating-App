import React from 'react';
//   import styles from "./IntroPageStyle"
import {ScaledSheet} from 'react-native-size-matters';
import Button from '../../component/Button';
import Buttons from '../../component/Buttons';
import {COLORS, FONTS, SIZES, strings} from '../../constants';
import {
  Text,
  View,
  SafeAreaView,
  Image,
} from 'react-native';

const IntroPage = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Title Comes Here</Text>
        <Text style={styles.overview}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
          ever.
        </Text>
        <View style={styles.Button}>
          <Buttons text={strings.buttons.loginButton}  onClick={() => navigation.navigate('Login')} />
          <Button text={strings.buttons.signButton}    onClick={() => navigation.navigate('Signup')} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: 'white',
    flex: 0.35,
    position:"absolute",
    bottom:0
  },
  heading: {
    ...FONTS.h3,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    marginTop:20,
  },
  overview: {
    ...FONTS.h4,
    textAlign: 'center',
    color: 'black',
    margin:15,
  },
  Button: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop:20,
    marginBottom:35
  },
});

export default IntroPage;
