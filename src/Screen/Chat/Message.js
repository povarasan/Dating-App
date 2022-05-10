import React, {useState, useEffect, useContext} from 'react';
import {View, Text,TouchableOpacity } from 'react-native';
import {GiftedChat, Bubble, InputToolbar,Send} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../Router/AuthProvider';
import Icons from 'react-native-vector-icons/AntDesign';
import {ScaledSheet} from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, FONTS, strings} from '../../constants';

export default function ChatScreen({route,navigation}) {
  const [messages, setMessages] = useState([]);
  const {user, logout} = useContext(AuthContext);
  const {uid} = route.params;
  const {name} =route.params;

  const getAllMessages = async () => {
    const docid = uid > user.uid ? user.uid + '-' + uid : uid + '-' + user.uid;
    const querySanp = await firestore()
      .collection('chatrooms')
      .doc(docid)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .get();
    const allmsg = querySanp.docs.map(docSanp => {
      return {
        ...docSanp.data(),
        createdAt: docSanp.data().createdAt.toDate(),
      };
    });
    setMessages(allmsg);
  };
  useEffect(() => {
    // getAllMessages()

    const docid = uid > user.uid ? user.uid + '-' + uid : uid + '-' + user.uid;
    const messageRef = firestore()
      .collection('chatrooms')
      .doc(docid)
      .collection('messages')
      .orderBy('createdAt', 'desc');

    const unSubscribe = messageRef.onSnapshot(querySnap => {
      const allmsg = querySnap.docs.map(docSanp => {
        const data = docSanp.data();
        if (data.createdAt) {
          return {
            ...docSanp.data(),
            createdAt: docSanp.data().createdAt.toDate(),
          };
        } else {
          return {
            ...docSanp.data(),
            createdAt: new Date(),
          };
        }
      });
      setMessages(allmsg);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  

  const onSend = messageArray => {
    const msg = messageArray[0];
    const mymsg = {
      ...msg,
      sentBy: user.uid,
      sentTo: uid,
      createdAt: new Date(),
    };
    setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg));
    const docid = uid > user.uid ? user.uid + '-' + uid : uid + '-' + user.uid;

    firestore()
      .collection('chatrooms')
      .doc(docid)
      .collection('messages')
      .add({...mymsg, createdAt: firestore.FieldValue.serverTimestamp()});
  };


  return (
    <View style={styles.container}>
     <View style={styles.header}>
     <TouchableOpacity>
          <Icons
            name="arrowleft"
            size={30}
            color="black"
            style={styles.icon}
            onPress={() => navigation.goBack()}
          />
          </TouchableOpacity>
      <Text style={styles.name}>{name}</Text>
     </View>
      <GiftedChat
      style={styles.chat}
        messages={messages}
        onSend={(text) => onSend(text)}
        alwaysShowSend
        user={{
          _id: user.uid,
        }}
       
        renderSend = {props => {
          return (
            <Send {...props}>
              <View>
                <MaterialCommunityIcons
                  name="send-circle"
                  style={{marginBottom: 5,marginRight:15}}
                  size={35}
                  color="#2e64e5"
                />
              </View>
            </Send>
          );
        }}
        
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: '#2e64e5',
                },
              }}
            />
          );
        }}
        renderInputToolbar={props => {
          return (
            <InputToolbar
              {...props}
              // containerStyle={{borderTopWidth: 1.5, borderTopColor: 'green'}}
              textInputStyle={{color: 'black'}}
            />
          );
        }}
      />
    </View>
  );
}


const styles = ScaledSheet.create({
  header:{
    backgroundColor:'white',
    height:50
  },
  name:{
    color:'black',
    fontSize:'20@vs',
    fontWeight:'bold',
    textAlign:'center',
     bottom:18
  },
  icon:{ 
  paddingLeft:18,
  top:10
  },
  container:{
    flex:1,
   
  },
  chat:{
   height:"80%"
  }

});