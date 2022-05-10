import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Button from '../../component/Button';
import Buttons from '../../component/Buttons';
import {COLORS, FONTS, SIZES, strings} from '../../constants';

const IntroPage = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Dating App Here...</Text>
        <Text style={styles.overview}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
          ever.
        </Text>
        <View style={styles.buttons}>
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
    flex: 0.4,
     position:"absolute",
     width:'100%',
     bottom:0
  },
  heading: {
    ...FONTS.h3,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    marginTop:'20@vs',
  },
  overview: {
    ...FONTS.h4,
    textAlign: 'center',
    color: 'black',
    margin:15,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop:'20@vs',
    marginBottom:'35@s'
  },
});

export default IntroPage;
