import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext({
  
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    return (
      <AuthContext.Provider
        value={{
          user,  
          setUser,
          login: async (mail, pass) => {
            try {
              await auth().signInWithEmailAndPassword(mail, pass);
            } catch (e) {
              console.log(e);
            }
          },
          register: async (mail, pass) => {
            try {
              await auth().createUserWithEmailAndPassword(mail, pass);
            } catch (e) {
              console.log(e);
            }
          },
          logout: async () => {
            try {
              await auth().signOut();
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