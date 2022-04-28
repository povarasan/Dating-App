import React, { useContext } from 'react';
import {TextInput} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {COLORS, FONTS, strings} from '../../constants';
import {ScaledSheet} from 'react-native-size-matters';
import Button from '../../component/Button';
import {Checkbox} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { AuthContext } from '../../Router/AuthProvider'


const Signup = ({navigation}) => {

  const [name, setName] = React.useState('');
  const [mail, setMail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [checked, setChecked] = React.useState(false);
  
  const { register } = useContext(AuthContext);
  
  const Validate = () => {
    if (name === "") {
      alert('Please fill the Username')
    }
    else if (mail === "") {
      alert('Please fill the E-Mail Id')
    }
    else if (pass === "") {
      alert('Please fill the Password')
    }
    else {
      auth()
        .createUserWithEmailAndPassword(mail, pass)
        .then(() => {
          console.log('User account created & signed in!');
          navigation.navigate('HomePage');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });
    }
  }

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
    paddingLeft: 25,
    marginTop: 30,
    marginBottom:10,
  },
  caption:{
    ...FONTS.h3,
    marginLeft:25
  },
  container: {
    backgroundColor: COLORS.primaryColor,
    margin: 20,
    borderRadius: 25,
    paddingBottom:50,
  },
  textinput: {
    margin: 20,
    backgroundColor: COLORS.primaryColor,
  },
  button: {
    alignSelf: 'center',
    marginTop: 10,
  },
  login: {
    margin: 10,
  },
  conditions:{
    flexDirection:"row",
    paddingLeft:15,
    marginTop:20
  },
  condition:{
    marginTop:7
  },
  login_text:{
    alignSelf:"center",
    marginTop:15,
    ...FONTS.h4,
    fontWeight:'bold',
    color:COLORS.secondaryColor
  },
  agree_text:{
    alignSelf:"center",
    marginTop:20
  }
});
