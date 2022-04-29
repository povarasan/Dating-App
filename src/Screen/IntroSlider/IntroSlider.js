import React from 'react';
import {View, Text, Image} from 'react-native';
import Buttons from '../../component/Buttons';
import {ScaledSheet} from 'react-native-size-matters';
import AppIntroSlider from 'react-native-app-intro-slider';
import {COLORS, FONTS, strings} from '../../constants';

const IntroSlider = ({navigation}) => {
  const RenderItem = ({item}) => {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
           <Image
          style={styles.introImageStyle}
          source={item.image}
          resizeMode="contain" /> 
          <Text style={styles.introHead}>{item.heading}</Text>
          <Text style={styles.introTextStyle}>{item.text}</Text>
        </View>
      </View>
    );
  };

  const RenderDoneButton = () => {
    return (
      <View style={styles.button}>
        <Buttons
          text={strings.buttons.loginButton}
          onClick={() => navigation.navigate('IntroPage')}
        />
      </View>
    );
  };

  const RenderNextButton = () => {
    return (
      <View style={styles.button}>
        <Buttons text={strings.buttons.skip} 
        />
      </View>
    );
  };
  return (
    <AppIntroSlider
      data={slides}
      renderItem={RenderItem}
      // renderNextButton={RenderNextButton}
      renderDoneButton={RenderDoneButton}
      showSkipButton={false}
      showNextButton={false}
      dotStyle={{backgroundColor: 'white', marginBottom: 250}}
      activeDotStyle={{backgroundColor: 'white', marginBottom: 250}}
    />
  );
};

export default IntroSlider;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondaryColor,
  },
  content: {
    backgroundColor: COLORS.primaryColor,
    alignSelf: 'center',
    borderRadius: 20,
    margin:20
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
   
  },
  introImageStyle: {
    width: '200@s',
    height: '200@vs',
    alignSelf: 'center',
    marginTop: 20,

  },
  introHead: {
    color: COLORS.textColor,
    ...FONTS.h2,
    fontWeight: 'bold',
    marginTop: '25@vs',
    textAlign: 'center',
  },
  introTextStyle: {
    ...FONTS.h4,
    color: 'gray',
    paddingVertical: '20@vs',
    textAlign: 'center',
    margin:15
  },
  introTitleStyle: {
    fontSize: 28,
    color: 'black',
    paddingTop: '50@vs',
    marginLeft: '15@s',
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    width: '150@s',
    height: '40@vs',
    borderRadius: '5@msr',
    backgroundColor: '#0095C6',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '30@vs',
    right: '90@s',
    position: 'absolute',
  }
});

const slides = [
  {
    key: 's1',
    text: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno Lorem Ipsum es',
    image: require('../../../assets/challenge.png'),
    heading: 'Challenge Friends',
  },
  {
    key: 's2',
    text: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno Lorem Ipsum es',
    image: require('../../../assets/earn.png'),
    backgroundColor: 'Earn Credits',
    heading: 'Earn Credits',
  },
  {
    key: 's3',
    text: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno Lorem Ipsum es',
    image: require('../../../assets/redeem.png'),
    backgroundColor: 'white',
    heading: 'Redeem Prizes',
  },
];
