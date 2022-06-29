import React,{useState,useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Pressable
} from 'react-native';
import Icons from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../../Router/AuthProvider';


const Next = ({item ,route, navigation}) => {
  const {user, logout} = useContext(AuthContext);
  const [userData, setUserData] = useState([]);
  const [liked, setLiked] = useState(false);
  const {name, img} = route.params;
  console.log(userData, 'kk');

  return (
    <SafeAreaView>
      <View >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.icon}>
          <Icons name="arrowleft" size={25} color="black" style={styles.icon} />
        </TouchableOpacity>
       <View style={styles.contain}>
       <Text style={styles.text}>
            { name.charAt(0).toUpperCase()}
          </Text>
          <Text style={styles.name}>{name}</Text>
       </View>
          
        </View>
        <Image source={{uri: img}} style={styles.image} />
        <View style={styles.button}>
       

        <Pressable
         style={styles.cancel}
          onPress={() => setLiked(isLiked => !isLiked)}>
          <Icons
            name={liked ? 'closecircle' : 'closecircle'}
            size={50}
            color={ 'black'}
          />
    
        </Pressable>

        <Pressable>
        <Icon name="heart-circle" size={62} color="red" style={styles.like} />
        </Pressable>
        </View>
    </SafeAreaView>
  );
};

export default Next;

const styles = StyleSheet.create({
  image: {
    height: '68%',
    width: '80%',
    borderRadius: 20,
    alignSelf: 'center',
  },
  name: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop:7
  },
  icon: {
    paddingLeft: 10,
    paddingTop: 10,
  },
  text:{
    backgroundColor:"#0087ED",
    paddingVertical: 6,
    paddingHorizontal:17,
    borderRadius: 50,
    color:"white",
    fontSize:25,
    fontWeight:"bold"
  },
  contain:{
    flexDirection:"row",
    marginLeft: 45,
    marginBottom: 10,
    marginTop: 20,
  },
  button:{
    flexDirection:"row",
    justifyContent:"space-evenly",
    marginTop:30
  },
  like:{
   bottom:8,position:"relative"
  }

});
