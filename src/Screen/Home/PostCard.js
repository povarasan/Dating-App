import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  Alert,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScaledSheet} from 'react-native-size-matters';
import ProgressiveImage from './ProgressiveImage';
import {AuthContext} from '../../Router/AuthProvider';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import {COLORS, FONTS} from '../../constants';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';


const PostCard = ({item, onDelete, onPress}) => {
  const {user, logout} = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const [liked, setLiked] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    getUser();
  });

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(item.userId)
      .onSnapshot(documentSnapshot => {
        // console.log('User data: ', documentSnapshot.data());
        setUserData(documentSnapshot.data());
      });
  };

  return (
    <View style={styles.Card} key={item.id}>
      <View style={styles.UserInfo}>
        <View style={styles.image}>
          <Text style={styles.text} key={item.uid}>
            {userData.DisplayName === undefined
              ? 'D'
              : userData.DisplayName.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.UserInfoText}>
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.UserName}>
              {userData ? userData.DisplayName || 'Test' : 'Test'}
            </Text>
          </TouchableOpacity>
          <Text style={styles.PostTime}>
            {moment(item.postTime.toDate()).fromNow()}
          </Text>
        </View>

        <View key={item.id} style={styles.Iconhere}>
          {user.uid == item.userId ? (
            <TouchableOpacity
              style={styles.Icon}
              onPress={() => onDelete(item.id)}>
              <Ionicons name="ellipsis-horizontal" size={25} color="black" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <Text style={styles.PostText}>{item.post}</Text>

      {item.postImg != null ? (
        <TouchableOpacity
        onPress={() =>
          navigation.navigate('Next',{
            name:userData.DisplayName,
            img:item.postImg
           
          })}
        >
          <ProgressiveImage
            defaultImageSource={require('../../../assets/couples.png')}
            source={{uri: item.postImg}}
            style={{width: '100%', height: 150}}
            resizeMode="cover"
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.Divider} />
      )}

      <View style={styles.InteractionWrapper}>
        <Pressable
          style={styles.Interaction}
          onPress={() => setLiked(isLiked => !isLiked)}>
          <Material
            name={liked ? 'heart' : 'heart-outline'}
            size={29}
            color={liked ? 'red' : 'black'}
          />
          {/* <Text style={styles.InteractionText}>Like</Text> */}
        </Pressable>

        {/* <TouchableOpacity style={styles.Interaction}>
          <Ionicons name="md-chatbubble-outline" size={25} color={'black'} />
          <Text style={styles.InteractionText}>Comment</Text>
        </TouchableOpacity>  */}
      </View>
    </View>
  );
};

export default PostCard;

const styles = ScaledSheet.create({
  Card: {
    backgroundColor: '#f5f5f5',
    margin: '20@msr',
    marginBottom: '20@s',
    borderRadius: '15@msr',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  UserInfo: {
    flexDirection: 'row',
    padding: '10@msr',
    flex: 1,
  },
  userImg: {
    width: '50@s',
    height: '50@vs',
    borderRadius: 50,
  },
  UserInfoText: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: '10@s',
    flex: 0.65,
  },
  UserName: {
    ...FONTS.h4,
    fontWeight: 'bold',
    color: COLORS.textColor,
  },
  PostTime: {
    fontSize: 12,
    color: '#666',
  },
  PostText: {
    fontSize: 14,
    paddingLeft: '15@s',
    paddingRight: '20@s',
    marginBottom: '15@s',
    color: 'black',
  },
  postImg: {
    width: '200@s',
    height: '300@vs',
  },
  Divider: {
    borderBottomColor: ' #dddddd',
    borderBottomWidth: '1@msr',
    alignSelf: 'center',
    marginTop: 10,
  },
  InteractionWrapper: {
    flexDirection: 'row',
  },
  Icon: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  Interaction: {
    padding: '10@msr',
    flexDirection: 'row',
    marginLeft: '140@msr',
  },
  InteractionText: {
    marginTop: '3@msr',
    marginLeft: '5@s',
  },
  image: {
    backgroundColor: COLORS.secondaryColor,
    paddingVertical: '4@vs',
    borderRadius: 50,
    flex: 0.18,
  },
  text: {
    fontSize: 33,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  Iconhere: {
    flex: 0.17,
  },
});
