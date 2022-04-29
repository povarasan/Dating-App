import React, { useContext } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {COLORS, FONTS, strings} from '../../constants';
import {ScaledSheet} from 'react-native-size-matters';
import Button from '../../component/Button';
import {Checkbox} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

import { AuthContext } from '../../Router/AuthProvider'


const Signup = ({navigation}) => {

  const [name, setName] = React.useState('');
  const [mail, setMail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [checked, setChecked] = React.useState(false);
  
  const { register } = useContext(AuthContext);

  return (
    <KeyboardAwareScrollView style={styles.container_view}>
      <Text style={styles.head}>Sign up</Text>
      <Text style={styles.caption}>to challenge your friends and win loot!</Text>
      <View style={styles.container}>
        <TextInput
          style={styles.textinput}
          mode="outlined"
          label="Username"
          placeholder="Type something"
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.textinput}
          mode="outlined"
          label="Email"
          placeholder="Type something"
          onChangeText={userMail=> setMail(userMail)}
        />
        <TextInput
          style={styles.textinput}
          label="Password"
          mode="outlined"
          secureTextEntry
          right={<TextInput.Icon name="eye" />}
          onChangeText={userPass=> setPass(userPass)}
        />
        <View style={styles.conditions}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!checked);
          }}
        />
        <Text style={styles.condition}>I certify that I am 13 years or older.</Text>
        </View>
      </View>
      <View style={styles.button}>
        <Button text={strings.buttons.signButton} onClick={() => register(mail, pass) } />
       <TouchableOpacity>
       <Text style={styles.login_text}   onPress={() => navigation.navigate('Login')}>Login</Text>
       </TouchableOpacity>
      </View>
      <Text style={styles.agree_text} >by clicking "Signup" button you agree to T&C</Text>
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
    marginTop:'30@vs',
    marginBottom:'10@s',
  },
  caption:{
    ...FONTS.h3,
    marginLeft:'25@s'
  },
  container: {
    backgroundColor: COLORS.primaryColor,
    margin:'20@msr',
    borderRadius:'25@msr',
    paddingBottom:'50@s',
  },
  textinput: {
    margin:'20@msr',
    backgroundColor: COLORS.primaryColor,
  },
  button: {
    alignSelf: 'center',
    marginTop:'10@vs',
  },
  login: {
    margin:'10@msr',
  },
  conditions:{
    flexDirection:"row",
    paddingLeft:'15@s',
    marginTop:'20@vs'
  },
  condition:{
    marginTop:'7@vs'
  },
  login_text:{
    alignSelf:"center",
    marginTop:'15@vs',
    ...FONTS.h4,
    fontWeight:'bold',
    color:COLORS.secondaryColor
  },
  agree_text:{
    alignSelf:"center",
    marginTop:'20@vs'
  }
});
