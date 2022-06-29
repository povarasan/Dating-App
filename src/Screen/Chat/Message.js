import React, {useState, useEffect, useContext} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {GiftedChat, Bubble, InputToolbar, Send} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../Router/AuthProvider';
import Icons from 'react-native-vector-icons/AntDesign';
import {ScaledSheet} from 'react-native-size-matters';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, FONTS, strings} from '../../constants';

const ChatScreen = ({route, navigation}) => {
  const [messages, setMessages] = useState([]);
  
  const {user, logout} = useContext(AuthContext);
  const {uid} = route.params;
  const {name} = route.params;

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

  console.log(navigation, '5555');
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Chat')}
          style={styles.icon}>
          <Icons
            name="arrowleft"
            size={25}
            color="black"
            style={styles.icon}

            // onPress={()=>navigation.navigate('Chat')}
          />
        </TouchableOpacity>
        <Text style={styles.name}>{name}</Text>
      </View>
      <GiftedChat
        style={styles.chat}
        messages={messages}
        onSend={text => onSend(text)}
        alwaysShowSend
        user={{
          _id: user.uid,
        }}
        renderSend={props => {
          return (
            <Send {...props}>
              <View>
                <MaterialCommunityIcons
                  name="send-circle"
                  style={{marginBottom: 5, marginRight: 15}}
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
                left: {
                  backgroundColor: 'white',
                  right:30
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
};

export default ChatScreen;

const styles = ScaledSheet.create({
  header: {
    backgroundColor: 'white',
    height: 50,
    // flexDirection: 'row',
  },
  name: {
    color: 'black',
    fontSize: '20@vs',
    fontWeight: 'bold',
    textAlign: 'center',
    bottom:17
  },

  icon: {
    top: 5,
    marginLeft: 15,
    width: 50,
  },
  container: {
    flex: 1,
  },
  chat: {
    height: '80%',
  },
});
