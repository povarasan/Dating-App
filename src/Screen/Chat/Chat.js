import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Image,
  FlatList,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {COLORS, FONTS, strings} from '../../constants';

const DATA = [
  {
    id: '1',
    userName: 'Jenny Doe',
    postTime: '4 mins ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../../../assets/couple.png'),
    liked: true,
    likes: '14',
    comments: '5',
  },
  {
    id: '2',
    userName: 'John Doe',
    postTime: '2 hours ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../../../assets/beach.png'),
    likes: '8',
    comments: '0',
  },
  {
    id: '3',
    userName: 'Ken William',
    postTime: '1 hours ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../../../assets/couples.png'),
    liked: true,
    likes: '1',
    comments: '0',
  },
  {
    id: '4',
    userName: 'Neymar',
    postTime: '4 mins ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../../../assets/couple.png'),
    liked: true,
    likes: '14',
    comments: '5',
  },
  {
    id: '5',
    userName: 'Danny',
    postTime: '2 hours ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../../../assets/beach.png'),
    likes: '8',
    comments: '0',
  },
  {
    id: '6',
    userName: 'Messi',
    postTime: '1 hours ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../../../assets/couples.png'),
    liked: true,
    likes: '1',
    comments: '0',
  },
  {
    id: '7',
    userName: 'Ronaldo',
    postTime: '2 hours ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../../../assets/beach.png'),
    likes: '8',
    comments: '0',
  }
];

const renderItem = ({item}) => (
  <View style={styles.main_view}>
    <Image
      source={item.postImg}
      style={styles.image}
      resizeMode={'contain'}></Image>
    <Text style={styles.user}>{item.userName}</Text>
  </View>
);

const Chat = ({navigation}) => {
  return (
    <View style={styles.FlatList}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Chat;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  header_view: {
    flex: 0.2,
  },
  head: {
    ...FONTS.h1,
    color: COLORS.textColor,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  user: {
    fontSize: 20,
    marginLeft: 30,
    color: COLORS.textColor,
    marginTop: 5,
  },
  image: {
    height:50,
    width: 50,
    alignSelf: 'center',
    borderRadius:50
  },
  main_view: {
    backgroundColor: COLORS.primaryColor,
    margin: 20,
    borderRadius: 20,
    flexDirection:"row"
  },
  icon: {
    flexDirection: 'row',
    marginLeft: 30,
  },
  FlatList:{

  }
});
