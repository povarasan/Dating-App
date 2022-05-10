import React, { createContext, useState } from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import firestore from '@react-native-firebase/firestore';
export const AuthContext = createContext({
  
});

export const AuthProvider = ({navigation, children }) => {
    const [user, setUser] = useState(null);
    return (
      <AuthContext.Provider
        value={{
          user,  
          setUser,
          login: async (mail, pass) => {
            try {
              await auth().signInWithEmailAndPassword( mail, pass).then(()=>{
                             
              })
              .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                   
                    Alert.alert('Shopping', 'Email address is already in use!')
                }
                if (error.code === 'auth/invalid-email') {
                 
                    Alert.alert('Shopping', 'Email address is invalid!')
                } else {
                    
                  Snackbar.show({
                    text: 'No User Found',
                    duration:3000,
                    action: {
                      text: 'OK',
                      textColor: 'green',
                      onPress: () => {},
                    },
                  });
                }
            });
            }
            
            catch (e) {
              console.log(e);
              
            }
          },
          register: async (mail, pass, name) => {
            try {
              await auth().createUserWithEmailAndPassword( mail, pass ,name )
              .then((user) => {
                //Once the user creation has happened successfully, we can add the currentUser into firestore
                //with the appropriate details.
                firestore().collection('users').doc(auth().currentUser.uid)
                .set({
                    DisplayName:name,
                    email:mail,
                    pass:pass,
                    createdAt: firestore.Timestamp.fromDate(new Date()),
                    uid:user.user.uid,
                    status:"online"
                })
                
                //ensure we catch any errors at this stage to advise us if something does go wrong
                .catch(error => {
                    console.log('Something went wrong with added user to firestore: ', error);
                })
              })
            
            } catch (e) {
              console.log(e);
            }
          },
          logout: async () => {
            try {
              await auth().signOut()
              // .then(()=>{
                
              // })
             
            } catch (e) {
              console.error(e);
            }
          }
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };


  