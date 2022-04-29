import {Text, View, TouchableOpacity} from 'react-native';
import React, { useContext } from 'react';
import {TextInput,HelperText,} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {COLORS, FONTS, strings} from '../../constants';
import {ScaledSheet} from 'react-native-size-matters';
import Button from '../../component/Button';
import auth from '@react-native-firebase/auth';
import { AuthContext } from "../../Router/AuthProvider"
import Signup from '../Signup/Signup';

const Login = ({navigation}) => {

  const [mail, setMail] = React.useState('');
  const [pass, setPass] = React.useState('');
  
  const { login } = useContext(AuthContext);

  return (
    <KeyboardAwareScrollView style={styles.container_view}>
      <Text style={styles.head}>Welcome Back!</Text>
      <View style={styles.container}>
        <TextInput
          style={styles.textinput}
          mode="outlined"
          label="Email or Username"
          placeholder="Type something"
          onChangeText={userMail => setMail(userMail)} 
        
        />
          {/* <HelperText type="error" visible={hasErrors()}>
        Email address is invalid!
      </HelperText> */}
        <TextInput
          style={styles.textinput}
          label="Password"
          mode="outlined"
          secureTextEntry
          right={<TextInput.Icon name="eye" />}
          onChangeText={userPass=> setPass(userPass)}

        />
      </View>
      <View style={styles.button}>
        <Button text={strings.buttons.loginButton}  onClick={() => login(mail, pass)} />
        <TouchableOpacity >
          <Text style={styles.login_text} onPress={() => navigation.navigate('Signup')}>Signup</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;

const styles = ScaledSheet.create({
  container_view: {
    flex: 1,
  },
  head: {
    ...FONTS.h1,
    color: COLORS.textColor,
    fontWeight: 'bold',
    paddingLeft: '25@s',
    marginTop: '30@vs',
    marginBottom: '20@s',
  },
  container: {
    backgroundColor: COLORS.primaryColor,
    margin:'20@msr',
    borderRadius: '25@msr',
    paddingBottom:'90@s',
  },
  textinput: {
    margin:'20@msr',
    backgroundColor: COLORS.primaryColor,
  },
  button: {
    alignSelf: 'center',
    marginTop:'70@vs',
  },
  login: {
    margin: 10,
  },
  login_text: {
    alignSelf: 'center',
    marginTop:'15@vs',
    ...FONTS.h4,
    fontWeight: 'bold',
    color: COLORS.secondaryColor,
  },
});
