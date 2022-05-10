import React, {useState, useEffect, useContext, useId} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../Router/AuthProvider';
import Icons from 'react-native-vector-icons/AntDesign';
import {COLORS, FONTS, strings} from '../../constants';

export default function HomeScreen({navigation}) {
  const {user, logout} = useContext(AuthContext);
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    const querySanp = await firestore()
      .collection('users')
      .where('uid', '!=', user.uid)
      .get();
    const allusers = querySanp.docs.map(docSnap => docSnap.data());
    setUsers(allusers);
  };

  useEffect(() => {
    getUsers();
     if(loading){
    setLoading(false);
  }

  },
  
  []);

  let person = user;
  console.log(person);

  const RenderCard = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Message', {
            name: item.DisplayName,
            uid: item.uid,
            status:
              typeof item.status == 'string'
                ? item.status
                : item.status.toDate().toString(),
          })
        }>
        <View style={styles.mycard}>
          <View style={styles.image}>
            <Text style={styles.mail}>{item.DisplayName.charAt(0).toUpperCase()}</Text>
          </View>

          <View style={styles.user}>
            <Text style={styles.text}>{item.DisplayName}</Text>
            <Text style={styles.mailtext}>{item.email}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {loading?
<View style={{height:350,alignItems:"center",justifyContent:'flex-end'}}>
  <ActivityIndicator
  animating={loading}
  size='large'
  color='#000'
  />
  </View>
     :
     <>
     <View style={styles.header_view}>
        <TouchableOpacity>
          <Icons
            name="arrowleft"
            size={30}
            color="black"
            style={styles.icon}
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
        <Text style={styles.head}>Chat</Text>
      </View>
      <FlatList
        data={users}
        renderItem={({item}) => {
          return <RenderCard item={item} />;
        }}
        keyExtractor={item => item.uid}
        style={styles.flatlist}
      />
      </>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    marginLeft: 15,
    color: 'black',
  },
  mycard: {
    flexDirection: 'row',
    margin: 10,
    borderBottomWidth:1,
    paddingVertical:10,
    paddingLeft:10,
    borderBottomColor:'lightgrey',
    flex:1
  },
  header_view: {
    flexDirection: 'row',
    height:50,
    backgroundColor:COLORS.primaryColor
  },
  head: {
    fontSize:22,
    color: COLORS.textColor,
    fontWeight: 'bold',
    paddingLeft: 115,
    top:10
  },
  image: {
    backgroundColor: COLORS.secondaryColor,
    flex:0.15,
    borderRadius: 50,
  },
  mail: {
    fontSize:30,
    fontWeight: 'bold',
    color: 'white',
    textAlign:"center"
  },
  icon: {
  paddingLeft:20,
  top:10
  },
  user:{
    flex:0.85
  },
  mailtext:{
    fontSize: 15,
    marginLeft: 15,
  
  },
  flatlist:{
    marginBottom:50
  }
});
