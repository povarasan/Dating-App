import {Text, View, TouchableOpacity, FlatList,ImageBackground,TextInput,Alert} from 'react-native';
import React, {useState, useContext} from 'react';
import Icons from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ScaledSheet} from 'react-native-size-matters';
import {COLORS, FONTS, strings} from '../../constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../../component/Button';
import ImagePicker from 'react-native-image-crop-picker';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../Router/AuthProvider';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';


const Post = ({navigation}) => {

const {user, logout} = useContext(AuthContext);
const [uploading, setUploading] = useState(false);
const [image, setImage] = useState(null);
const [post, setPost] = useState(null);

const takePhotoFromCamera = () => {
  ImagePicker.openCamera({
    compressImageMaxWidth: 300,
    compressImageMaxHeight: 300,
    cropping: true,
    compressImageQuality: 0.7,
  }).then(image => {
    console.log(image);
    setImage(image.path);
    this.bs.current.snapTo(1);
  });
};

const choosePhotoFromLibrary = () => {
  ImagePicker.openPicker({
    width: 300,
    height: 300,
    cropping: true,
    compressImageQuality: 0.7,
  }).then(image => {
    console.log(image);
    setImage(image.path);
    this.bs.current.snapTo(1);
  });
};

renderInner = () => (
  <View style={styles.panel}>
    <View style={{alignItems: 'center'}}>
      <Text style={styles.panelTitle}>Upload Photo</Text>
    </View>
    <TouchableOpacity
      style={styles.panelButton}
      onPress={takePhotoFromCamera}>
      <Text style={styles.panelButtonTitle}>Take Photo</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.panelButton}
      onPress={choosePhotoFromLibrary}>
      <Text style={styles.panelButtonTitle}>Choose From Library</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.panelButton}
      onPress={() => this.bs.current.snapTo(1)}>
      <Text style={styles.panelButtonTitle}>Cancel</Text>
    </TouchableOpacity>
  </View>
);

const submitPost = async () => {
  const imageUrl = await uploadImage();
  console.log('Image Url: ', imageUrl);

firestore()
.collection('posts')
.add({
  userId: user.uid,
  post: post,
  postImg: imageUrl,
  postTime: firestore.Timestamp.fromDate(new Date()),
  likes: null,
  comments: null,
})

.then(() => {
  console.log('Post Added!');
  Alert.alert(
    'Post published!',
    'Your post has been published Successfully!',
  );
  setPost(null);
})
.catch((error) => {
  console.log('Something went wrong with added post to firestore.', error);
});
}

  const  uploadImage = async () => {
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    setUploading(true);


    
    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    try {
      await task;
      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage(null);

      return url;

    } 
    catch (e) {
      console.log(e);
    }
    return null;
  };

  bs = React.createRef();
  fall = new Animated.Value(1);

  return (
    <KeyboardAwareScrollView>
    <SafeAreaView style={styles.container}>

     <BottomSheet
        ref={this.bs}
        snapPoints={[330, 0]}
        renderContent={this.renderInner}
        initialSnap={1}
        callbackNode={this.fall}
        enabledGestureInteraction={true}
      /> 
      <View style={styles.header_view}>
       <TouchableOpacity>
       <Icons
          name="chevron-thin-left"
          size={30}
          color="black"
          style={{height: 50, width: 50,fontWeight: 'bold',}}
          onPress={() => navigation.goBack ()}
        />
       </TouchableOpacity>
        <Text style={styles.head}>Create Post</Text>
      </View>

      <View style={styles.main_view}>
        <TouchableOpacity style={styles.button} onPress={() => this.bs.current.snapTo(0)} >
          <Icon name="image" size={25} color="white" style={styles.icon} />
          <Text style={styles.photo}>Photo</Text>
        </TouchableOpacity>


        <TextInput
          placeholder="What's on your mind?"
          multiline
          numberOfLines={3}
          value={post}
          onChangeText={(content) => setPost(content)}
          style={{
            marginLeft:10
          }}
        />

         <Animated.View
        style={{
          margin: 20,
          opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
        }}>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              height: 350,
              width: 300,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ImageBackground
              source={{
                uri: image,
              }}
              style={{height: 200, width: 200}}
              imageStyle={{borderRadius: 15}}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}></View>
            </ImageBackground>
          </View>
        </View>
      </Animated.View> 
      
        <View style={styles.post}>
          <Button text={strings.buttons.post} onClick={()=> submitPost()}  />
        </View>
      </View>
    </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default Post;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  header_view: {
    flex: 0.1,
    flexDirection:"row"
  },
  head: {
    ...FONTS.h1,
    color: COLORS.textColor,
    fontWeight: 'bold',
    paddingLeft:65
  },
  main_view: {
    flex: 0.9,
    backgroundColor: COLORS.primaryColor,
    margin: 30,
    borderRadius: 20,
  },
  name: {
    ...FONTS.h2,
    color: COLORS.textColor,
    fontWeight: 'bold',
    paddingLeft: 50,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: COLORS.secondaryColor,
    width: 130,
    height: 40,
    borderRadius: 50,
    marginTop: 25,
    marginLeft: 20,
  },
  photo: {
    ...FONTS.h3,
    paddingLeft: 10,
    color: COLORS.primaryColor,
  },
  icon: {
    paddingLeft: 15,
    marginTop: 5,
  },
  caption: {
    paddingLeft: 25,
    marginTop: 20,
  },
  post: {
    borderRadius: '50@msr',
    backgroundColor: '#0095C6',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '30@vs',
    right: '90@s',
    position: 'absolute',
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
  }
});




