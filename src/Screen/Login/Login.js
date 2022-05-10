import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState, useContext, useRef} from 'react';
import {TextInput} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {COLORS, FONTS, strings} from '../../constants';
import {ScaledSheet} from 'react-native-size-matters';
import Button from '../../component/Button';
import {AuthContext} from '../../Router/AuthProvider';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Login = ({navigation}) => {
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const [text, setText] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [errorText1, setErrorText1] = useState(false);
  const [errorText2, setErrorText2] = useState(false);

  const input1 = useRef();
  const input2 = useRef();

  const onClick = () => {
    if (mail === '') {
      setError1(true);
      setErrorText1('Enter email address');
    } else if (pass === '') {
      setError2(true);
      setErrorText2('Enter password');
    } else {
      setLoading(true);
      login(mail, pass);
    }
  };

  const {login, logout} = useContext(AuthContext);

  return (
    <KeyboardAwareScrollView style={styles.container_view}>
      {loading ? (
        <>
          <View
            style={{
              height: 350,
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <ActivityIndicator animating={loading} size="large" color="#000" />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.head}>Welcome Back!</Text>
          <View style={styles.container}>
            <TextInput
              style={styles.textinput}
              mode="outlined"
              label="Email"
              placeholder="Type something"
              onChangeText={text => {
                setMail(text);
                setErrorText1(false);
              }}
              keyboardType="email-address"
              value={mail}
              returnKeyType="next"
              onSubmitEditing={() => {
                input2.current.focus();
              }}
              blurOnSubmit={false}
              ref={input1}
              error={error1}
              errorText={errorText1}
            />
            <Text style={styles.errorTxt}>{errorText1}</Text>
            <TextInput
              style={styles.textinput}
              label="Password"
              mode="outlined"
              right={
                <TextInput.Icon
                  name={passwordVisible ? 'eye' : 'eye-off'}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                />
              }
              secureTextEntry={passwordVisible}
              returnKeyType="done"
              ref={input2}
              error={error2}
              errorText={errorText2}
              onChangeText={text => {
                setPass(text);
                setError2(false);
                setErrorText2(false);
              }}
              value={pass}
            />
            <Text style={styles.errorTxt}>{errorText2}</Text>
          </View>
          <View style={styles.button}>
            <Button
              text={strings.buttons.loginButton}
              onClick={() => onClick()}
            />
            <TouchableOpacity>
              <Text
                style={styles.login_text}
                onPress={() => navigation.navigate('Signup')}>
                Signup
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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
    margin: '20@msr',
    borderRadius: '25@msr',
    paddingBottom: '50@s',
  },
  textinput: {
    margin: '5@msr',
    backgroundColor: COLORS.primaryColor,
    width: '85%',
    alignSelf: 'center',
    marginTop: 15,
  },
  button: {
    alignSelf: 'center',
    marginTop: '70@vs',
  },
  login: {
    margin: 10,
  },
  login_text: {
    alignSelf: 'center',
    marginTop: '15@vs',
    ...FONTS.h4,
    fontWeight: 'bold',
    color: COLORS.secondaryColor,
  },
  errorTxt: {
    ...FONTS.body5,
    color: 'red',
    paddingLeft: '30@msr',
  },
});
