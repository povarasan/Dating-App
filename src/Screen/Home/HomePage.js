import React, {useState, useEffect, useContext} from 'react';
import {View, FlatList, Image, Text, Alert, ActivityIndicator,TouchableOpacity} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {COLORS, FONTS, strings} from '../../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import PostCard from './PostCard';
import {AuthContext} from '../../Router/AuthProvider';
import Icons from 'react-native-vector-icons/Entypo';


const Feed = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
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

      console.log('Posts: ', posts);
    } catch (e) {
      console.log(e);
    }
  };



  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      fetchPosts();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
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
      .catch(e => console.log('Error deleting post.', e));
  };

  const ListHeader = () => {
    return null;
  };

  return (
    
    <SafeAreaView style={styles.container}>
      {loading?
<View style={{height:350,alignItems:"center",justifyContent:'flex-end'}}>
  <ActivityIndicator
  animating={loading}
  size='large'
  color='#000'
  />
</View>:
<View>
  <View style={styles.header_view}>
  <TouchableOpacity>
    <Icons
      name="menu"
      size={30}
      color="black"
      style={styles.icons}
      onPress={() => navigation.openDrawer()}
    />
  </TouchableOpacity>
  <Text style={styles.head}>Home</Text>
</View>
      
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
      </View>
}
    </SafeAreaView>
  );
};
export default Feed;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor:COLORS.primaryColor,
  },
  header_view: {
  
    flexDirection: 'row',
    paddingLeft:5,
    backgroundColor:COLORS.primaryColor,
    height:'50@vs'
  },
  head: {
    fontSize:22,
    color: COLORS.textColor,
    fontWeight: 'bold',
    alignSelf:"center",
  top:5,
    paddingLeft:105,
    
  },
  icons: {
    paddingLeft:20,
    top:15
    },
});
