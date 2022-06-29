import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {COLORS, FONTS, strings} from '../../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import PostCard from './PostCard';
import {AuthContext} from '../../Router/AuthProvider';


const Feed = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  // const [isMoreLoading, setIsMoreLoading] = useState(false);
  // const [lastDoc, setLastDoc] = useState(null);
  // const [res, setRes] = useState([]);

  // const [postsPerLoad,setPostsPerLoad]=useState(10);
  // const [start,setStart]=useState(Object);
  // const list = [];

  const fetchPosts = async () => {
    try {
      const list = [];
      await firestore()
        .collection('posts')
        .orderBy('postTime', 'desc')
        //  .limit(5)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            // setLastDoc(querySnapshot.docs[querySnapshot.docs.length-1]);

            const {userId, post, postImg, postTime, likes, comments, user} =
              doc.data();
            list.push({
              id: doc.id,
              userId,
              user,
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
      // if (isMoreLoading) {
      //   setIsMoreLoading(false);
      // }
      console.log('Posts: ', posts);
    } catch (e) {
      console.log(e);
    }
  };

  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchPosts();
    });
    return unsubscribe;
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
                console.log('Error while deleting the image.', e);
              });
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
      .catch(e => console.log('Error deleting post.', e));
  };

  const ListHeader = () => {
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={{height: 350, alignItems: 'center', top: 300, flex: 1}}>
          <ActivityIndicator animating={loading} size="large" color="#0087ED" />
        </View>
      ) : (
        <View>
          <View>
            <FlatList
              // style={{marginBottom: 60}}
              style={styles.FlatList}
              data={posts}
              renderItem={({item}) => (
                <PostCard item={item} onDelete={handleDelete} />
              )}
              keyExtractor={item => item.id}
              ListHeaderComponent={ListHeader}
              ListFooterComponent={ListHeader}
              showsVerticalScrollIndicator={false}
              // onEndReached={getMore}
              // onEndReachedThreshold={0.5}
              scrollEventThrottle={1}
              // refreshControl={
              //   <RefreshControl refreshing={loading} onRefresh={onRefresh} />
              // }
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
export default Feed;

const styles = ScaledSheet.create({
  container: {
    backgroundColor: COLORS.primaryColor,
    flex: 1,
  },
  header_view: {
    flexDirection: 'row',
    paddingLeft: 5,
    backgroundColor: COLORS.primaryColor,
    height: '50@vs',
  },
  head: {
    fontSize: 22,
    color: COLORS.textColor,
    fontWeight: 'bold',
    alignSelf: 'center',
    top: 5,
    paddingLeft: 115,
  },
  icons: {
    paddingLeft: 20,
    top: 22,
  },
  FlatList: {
    marginBottom: 60,
  },
});
