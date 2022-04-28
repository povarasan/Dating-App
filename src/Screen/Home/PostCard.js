import React, {useContext, useEffect, useState} from 'react';
import {View, FlatList, Image, Text,Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {ScaledSheet} from 'react-native-size-matters';

import ProgressiveImage from './ProgressiveImage';

import {AuthContext} from '../../Router/AuthProvider';

import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';

import firestore from '@react-native-firebase/firestore';
import { COLORS } from '../../constants';

const PostCard = ({item, onDelete, onPress}) => {
  const {user, logout} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  likeIcon = item.liked ? 'heart' : 'heart-outline';
  likeIconColor = item.liked ? '#2e64e5' : '#333';

  if (item.likes == 1) {
    likeText = '1 Like';
  } else if (item.likes > 1) {
    likeText = item.likes + ' Likes';
  } else {
    likeText = 'Like';
  }

  if (item.comments == 1) {
    commentText = '1 Comment';
  } else if (item.comments > 1) {
    commentText = item.comments + ' Comments';
  } else {
    commentText = 'Comment';
  }

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(item.userId)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log('User Data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.Card} key={item.id}>
      <View   style={styles.UserInfo} >
        <Image  style={styles.userImg} 
          source={{
            uri: userData
              ? userData.userImg ||
                'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
              : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
          }}
        />
        <View  style={styles.UserInfoText}>
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.UserName}>
              {userData ? userData.fname || 'Test' : 'Test'}{' '}
              {userData ? userData.lname || 'User' : 'User'}
            </Text>
          </TouchableOpacity>
          <Text  style={styles.PostTime} >{moment(item.postTime.toDate()).fromNow()}</Text>
          </View>

          <View key={item.id}>
          {user.uid == item.userId ? (
          <TouchableOpacity style={styles.Icon} onPress={() => onDelete(item.id)}>
            <Ionicons name="ellipsis-horizontal" size={25} color="black"/>
          </TouchableOpacity>
        ) : null}
          </View>
</View>
    


      <Text  style={styles.PostText}>{item.post}</Text>

      {/* {item.postImg != null ? <PostImg source={{uri: item.postImg}} /> : <Divider />} */}
      {item.postImg != null ? (
        <ProgressiveImage
          defaultImageSource={require('../../../assets/couple.png')}
          source={{uri: item.postImg}}
          style={{width: '100%', height: 250}}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.Divider} />
      )}

   
      <View style={styles.InteractionWrapper}>
      <TouchableOpacity style={styles.Interaction} active={item.liked}>
          <Ionicons name={likeIcon} size={25} color={likeIconColor} />
          <Text style={styles.InteractionText} active={item.liked}>{likeText}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.Interaction}>
          <Ionicons name="md-chatbubble-outline" size={25} />
          <Text style={styles.InteractionText}>{commentText}</Text>
      </TouchableOpacity>
      
      </View>
      
    </View>
  );
};

export default PostCard;


const styles = ScaledSheet.create({

  Container:{
  flex: 1,
  alignSelf: 'center',
  backgroundColor:"#fff",

  },

  Card:{
    backgroundColor:"#f8f8f8",
   margin:10,
    marginBottom:20,
    borderRadius:10
  },
  UserInfo:{
    flexDirection:"row",
    padding:10
  },
  userImg:{
    width:50,
    height:50,
    borderRadius:50
  },
  UserInfoText:{
    flexDirection:"column",
    justifyContent:"center",
    marginLeft:10

  },
  UserName :{
    fontSize:15,
    fontWeight:'bold',
    color:COLORS.textColor
  },
  PostTime:{
    fontSize:12,
    color:"#666"
  },
  PostText:{
    fontSize:14,
    paddingLeft:15,
    paddingRight:20,
    marginBottom:15
  },
  postImg:{
    width:200,
    height:300,
  },
  Divider:{
    borderBottomColor:" #dddddd",
    borderBottomWidth:1,
    alignSelf:"center",
    marginTop:10
  },
  InteractionWrapper:{
    flexDirection:"row",
  
  },
  Icon:{
    flexDirection:"row",
    justifyContent:"center",
    borderRadius:5,
    padding:10,
    marginLeft:150,
  },
  Interaction:{
    padding:10,
    flexDirection:"row",
  },
  InteractionText:{
    marginTop:3,
    marginLeft:5
  }
})



// import React, {useContext, useEffect, useState} from 'react';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// import {ScaledSheet} from 'react-native-size-matters';

// import ProgressiveImage from './ProgressiveImage';

// import {AuthContext} from '../../Router/AuthProvider';

// import moment from 'moment';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import firestore from '@react-native-firebase/firestore';

// const PostCard = ({item, onDelete, onPress}) => {
//   const {user, logout} = useContext(AuthContext);
//   const [userData, setUserData] = useState(null);

//   likeIcon = item.liked ? 'heart' : 'heart-outline';
//   likeIconColor = item.liked ? '#2e64e5' : '#333';

//   if (item.likes == 1) {
//     likeText = '1 Like';
//   } else if (item.likes > 1) {
//     likeText = item.likes + ' Likes';
//   } else {
//     likeText = 'Like';
//   }

//   if (item.comments == 1) {
//     commentText = '1 Comment';
//   } else if (item.comments > 1) {
//     commentText = item.comments + ' Comments';
//   } else {
//     commentText = 'Comment';
//   }

//   const getUser = async () => {
//     await firestore()
//       .collection('users')
//       .doc(item.userId)
//       .get()
//       .then((documentSnapshot) => {
//         if (documentSnapshot.exists) {
//           console.log('User Data', documentSnapshot.data());
//           setUserData(documentSnapshot.data());
//         }
//       });
//   };

//   useEffect(() => {
//     getUser();
//   }, []);

//   return (
//     <View style={styles.Card} key={item.id}>
//       <View   style={styles.UserInfo} >
//         <Image  style={styles.userImg} 
//           source={{
//             uri: userData
//               ? userData.userImg ||
//                 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
//               : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
//           }}
//         />
//         <View  style={styles.UserInfoText}>
//           <TouchableOpacity onPress={onPress}>

//             <Text style={styles.UserName}>
//               {userData ? userData.fname || 'Test' : 'Test'}{' '}
//               {userData ? userData.lname || 'User' : 'User'}
//             </Text>

//           </TouchableOpacity>
//           <Text  style={styles.PostTime} >{moment(item.postTime.toDate()).fromNow()}</Text>
//           </View>
// </View>
    


//       <Text  style={styles.PostText}>{item.post}</Text>

//       {/* {item.postImg != null ? <PostImg source={{uri: item.postImg}} /> : <Divider />} */}
//       {item.postImg != null ? (
//         <ProgressiveImage
//           defaultImageSource={require('../../../assets/couple.png')}
//           source={{uri: item.postImg}}
//           style={{width: '100%', height: 250}}
//           resizeMode="cover"
//         />
//       ) : (
//         <View style={styles.Divider} />
//       )}

   
//       <View style={styles.InteractionWrapper}>
//       <TouchableOpacity style={styles.Interaction} active={item.liked}>
//           <Ionicons name={likeIcon} size={25} color={likeIconColor} />
//           <Text style={styles.InteractionText} active={item.liked}>{likeText}</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.Interaction}>
//           <Ionicons name="md-chatbubble-outline" size={25} />
//           <Text style={styles.InteractionText}>{commentText}</Text>
//       </TouchableOpacity>
//         {user.uid == item.userId ? (
//           <TouchableOpacity style={styles.Interaction} onPress={() => onDelete(item.id)}>
//             <Ionicons name="md-trash-bin" size={25} />
//           </TouchableOpacity>
//         ) : null}
//       </View>
      
//     </View>
//   );
// };

// export default PostCard;


// const styles = ScaledSheet.create({

//   Container:{
//   flex: 1,
//   alignSelf: 'center',
//   backgroundColor:"#fff",
//   padding: 20,
//   },

//   Card:{
//     backgroundColor:"#f8f8f8",
//     width:300,
//     marginBottom:20,
//     borderRadius:10
//   },
//   UserInfo:{
//     flexDirection:"row",
//     justifyContent: 'center',
//     padding:10
//   },
//   userImg:{
//     width:50,
//     height:50,
//     borderRadius:20
//   },
//   UserInfoText:{
//     flexDirection:"column",
//     justifyContent:"center",
//     marginLeft:10

//   },
//   UserName :{
//     fontSize:15,
//     fontWeight:'bold',
//   },
//   PostTime:{
//     fontSize:12,
//     color:"#666"
//   },
//   PostText:{
//     fontSize:14,
//     paddingLeft:15,
//     paddingRight:20,
//     marginBottom:15
//   },
//   postImg:{
//     width:200,
//     height:300,
//   },
//   Divider:{
//     borderBottomColor:" #dddddd",
//     borderBottomWidth:1,
//     alignSelf:"center",
//     marginTop:10
//   },
//   InteractionWrapper:{
//     flexDirection:"row",
//     justifyContent:"space-around",
//     padding:15
//   },
//   Interaction:{
//     flexDirection:"row",
//     justifyContent:"center",
//     borderRadius:5,
//     padding:10,

//   }
// })



