import {View, FlatList, Image, Text, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ScaledSheet} from 'react-native-size-matters';
import {COLORS, FONTS, strings} from '../../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import PostCard from './PostCard';

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
];

const renderItem = ({item}) => (
  <View style={styles.main_view}>
    <Text style={styles.user}>{{uri: userName}}</Text>
    <Image
      source={{uri: postImg}}
      style={styles.image}
      resizeMode={'contain'}></Image>
    <View style={styles.icon}>
      <Icon
        name="heart-o"
        size={30}
        color="black"
        style={{height: 50, width: 50}}
      />
      <Icon
        name="comment-o"
        size={30}
        color="black"
        style={{height: 50, width: 50}}
      />
    </View>
  </View>
);
const Feed = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);

  const fetchPosts = async () => {
    try {
      const list = [];
      await firestore()
        .collection('posts')
        .orderBy('postTime', 'desc')
        .get()
        .then(querySnapshot => {
          // console.log('Total Posts: ', querySnapshot.size);

          querySnapshot.forEach(doc => {
            const {userId, post, postImg, postTime, likes, comments} =
              doc.data();
            list.push({
              id: doc.id,
              userId,
              userName: 'Test Name',
              userImg:
                'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
              postTime: postTime,
              post,
              postImg,
              liked: false,
              likes,
              comments,
            });
          });
        });
      setPosts(list);

      if (loading) {
        setLoading(false);
      }

      console.log('Posts: ', posts);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    fetchPosts();
    setDeleted(false);
  }, [deleted]);

  const handleDelete = postId => {
    Alert.alert(
      'Delete post',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed!'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => deletePost(postId),
        },
      ],
      {cancelable: false},
    );
  };

  const deletePost = postId => {
    console.log('Current Post Id: ', postId);

    firestore()
      .collection('posts')
      .doc(postId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          const {postImg} = documentSnapshot.data();

          if (postImg != null) {
            const storageRef = storage().refFromURL(postImg);
            const imageRef = storage().ref(storageRef.fullPath);

            imageRef
              .delete()
              .then(() => {
                console.log(`${postImg} has been deleted successfully.`);
                deleteFirestoreData(postId);
              })
              .catch(e => {
                console.log('Error while deleting the image. ', e);
              });
            // If the post image is not available
          } else {
            deleteFirestoreData(postId);
          }
        }
      });
  };

  const deleteFirestoreData = postId => {
    firestore()
      .collection('posts')
      .doc(postId)
      .delete()
      .then(() => {
        Alert.alert(
          'Post deleted!',
          'Your post has been deleted successfully!',
        );
        setDeleted(true);
      })
      .catch(e => console.log('Error deleting posst.', e));
  };

  const ListHeader = () => {
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          data={posts}
          renderItem={({item}) => (
            <PostCard item={item} onDelete={handleDelete} />
          )}
          keyExtractor={item => item.id}
          ListHeaderComponent={ListHeader}
          ListFooterComponent={ListHeader}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Feed;

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
    height: 200,
    width: 400,
    marginBottom: 50,
    alignSelf: 'center',
  },
  main_view: {
    backgroundColor: COLORS.primaryColor,
    margin: 20,
    borderRadius: 20,
  },
  icon: {
    flexDirection: 'row',
    marginLeft: 30,
  },
});
