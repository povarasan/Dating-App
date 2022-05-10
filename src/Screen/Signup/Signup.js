import React, {useRef, useState, useContext} from 'react';
import {Text, View, TouchableOpacity,ActivityIndicator} from 'react-native';
import {TextInput} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {COLORS, FONTS, strings} from '../../constants';
import {ScaledSheet} from 'react-native-size-matters';
import Button from '../../component/Button';
import {Checkbox} from 'react-native-paper';
import {AuthContext} from '../../Router/AuthProvider';

const Signup = ({navigation}) => {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const [checked, setChecked] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const {register} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [error1, setError1] = useState(false);
  const [error3, setError3] = useState(false);
  const [error4, setError4] = useState(false);
  const [errorText1, setErrorText1] = useState(false);
  const [errorText3, setErrorText3] = useState(false);
  const [errorText4, setErrorText4] = useState(false);

  const input1 = useRef();
  const input3 = useRef();
  const input4 = useRef();

  const onClicks = () => {
    if (name === '') {
      setError1(true);
      setErrorText1('Username field should not be empty');
    } else if (mail === '') {
      setError3(true);
      setErrorText3('Enter email address');
    } else if (pass === '') {
      setError4(true);
      setErrorText4('Enter password');
    } else {
      setLoading(true)
      register(mail, pass, name);
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container_view}>

{loading ? (
        <>
          <View style={{height:350,alignItems:"center",justifyContent:'flex-end'}}>
            <ActivityIndicator
              animating={loading}
              size='large'
              color='#000'
            />
          </View>
        </>
      ) : (
        <>
      <Text style={styles.head}>Sign up</Text>
      <Text style={styles.caption}>
        to challenge your friends and win loot!
      </Text>
      <View style={styles.container}>
        <TextInput
          style={styles.textinput}
          mode="outlined"
          label="Username"
          placeholder="Type something"
          onChangeText={name => {
            setName(name);
            setError1(false);
            setErrorText1(false);
          }}
          value={name}
          returnKeyType="next"
          onSubmitEditing={() => {
            input3.current.focus();
          }}
          blurOnSubmit={false}
          ref={input1}
          error={error1}
          errorText={errorText1}
        />
        <Text style={styles.errorTxt}>{errorText1}</Text>
        <TextInput
          style={styles.textinput}
          mode="outlined"
          label="Email"
          placeholder="Type something"
          onChangeText={text => {
            setMail(text);
            setError3(false);
            setErrorText3(false);
          }}
          keyboardType="email-address"
          value={mail}
          returnKeyType="next"
          onSubmitEditing={() => {
            input4.current.focus();
          }}
          blurOnSubmit={false}
          ref={input3}
          error={error3}
          errorText={errorText3}
        />

        <Text style={styles.errorTxt}>{errorText3}</Text>
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
          ref={input4}
          error={error4}
          errorText={errorText4}
          onChangeText={text => {
            setPass(text);
            setError4(false);
            setErrorText4(false);
          }}
          value={pass}
        />
        <Text style={styles.errorTxt}>{errorText4}</Text>
        <View style={styles.conditions}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <Text style={styles.condition}>
            I certify that I am 13 years or older.
          </Text>
        </View>
      </View>
      <View style={styles.button}>
        <Button text={strings.buttons.signButton} onClick={() => onClicks()} />
        <TouchableOpacity>
          <Text
            style={styles.login_text}
            onPress={() => navigation.navigate('Login')}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.agree_text}>
        by clicking "Signup" button you agree to T&C
      </Text>
      </>
)}
    </KeyboardAwareScrollView>
  );
};

export default Signup;

const styles = ScaledSheet.create({
  container_view: {
    flex: 1,
  },
  head: {
    ...FONTS.h1,
    color: COLORS.textColor,
    fontWeight: 'bold',
    paddingLeft: '25@s',
    marginTop: '15@vs',
    marginBottom: '5@s',
  },
  caption: {
    ...FONTS.h4,
    marginLeft: '25@s',
  },
  container: {
    backgroundColor: COLORS.primaryColor,
    margin: '15@msr',
    borderRadius: '25@msr',
  },
  textinput: {
    margin: '5@msr',
    backgroundColor: COLORS.primaryColor,
    width:'85%',
    alignSelf:'center',
    marginTop:15
  },
  button: {
    alignSelf: 'center',
    marginTop: '10@vs',
  },
  conditions: {
    flexDirection: 'row',
    paddingLeft: '15@s',
    marginBottom: 10,
  },
  condition: {
    paddingTop: 8,
  },
  login_text: {
    alignSelf: 'center',
    marginTop: '15@vs',
    ...FONTS.h4,
    fontWeight: 'bold',
    color: COLORS.secondaryColor,
  },
  agree_text: {
    alignSelf: 'center',
    marginTop: '30@vs',
  },
  errorTxt: {
    ...FONTS.body5,
    color: 'red',
    paddingLeft: '30@msr',
  },
});
