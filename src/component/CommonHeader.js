import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import {Vector, COLORS, FONTS, adjust, } from "../constants";
import { ScaledSheet } from "react-native-size-matters";


const CommonHeader = ({
  onClick,
  type,
  title,
}) => {

  return (
    <SafeAreaView style={Styles.container}>  
        <View style={Styles.firstFlex}>
          <TouchableOpacity style={Styles.menu} onPress={onClick}>
           {Vector.MenuImage}
          </TouchableOpacity>
          <Text style={Styles.header}>Home</Text>
        </View>  
    </SafeAreaView>
  );
};

const Styles = ScaledSheet.create({
  container: {
    backgroundColor:COLORS.primaryColor,
    height:"55@vs",
  
  },
  firstFlex: {
    flexDirection: "row",
    flex:1,
   
  },
  menu: { 
     flex:0.37,
     paddingLeft:'20@s',
     marginTop:'4@vs',
     top:5
  },

  header: {
   fontSize:25,
   fontWeight:"bold",
   flex:0.63,
   color:'#000',
   top:10,
   paddingLeft:10

  },
});

export default CommonHeader;


// import React from "react";
// import {
//   View,
//   SafeAreaView,
//   StyleSheet,
//   Image,
//   Text,
//   TouchableOpacity,
// } from "react-native";
// import { COLORS, FONTS, adjust, Vector, Images } from '../constants';
// import { ScaledSheet } from "react-native-size-matters";


// const CommonHeader = ({
//   onClick,
//   type,
//   title,
//   notifyNavigation,
//   cartNavigation,
// }) => {
//   // const Defaultnavigation = useNavigation();
//   return (
//     <SafeAreaView style={Styles.container}>
      
//         <View style={Styles.firstFlex}>
//           <TouchableOpacity style={Styles.menu} onPress={onClick}>
//             {type == 1 ? Vector.MenuImage : Vector.HeaderBackArrow}
//           </TouchableOpacity>
//           {type == 1 ? (
//             <Text style={Styles.headerTitle}>Home</Text>
//           ) : (
//             <Text style={Styles.headerTitle}>{title}</Text>
//           )}
//         </View>
       
  
//     </SafeAreaView>
//   );
// };

// const Styles = ScaledSheet.create({
//   container: {
//     backgroundColor: COLORS.primaryColor,
//     height: "40@vs",
//   },
//   linearGradient: {
//     flex: 1,
//     flexDirection: "row",
//   },
//   firstFlex: {
//     flex: 0.5,
//     alignItems: "center",
//     flexDirection: "row",
//   },
//   secondFlex: {
//     flex: 0.5,
//     alignItems: "center",
//     justifyContent: "flex-end",
//     flexDirection: "row",
//   },
//   menu: { marginLeft: "15@vs", alignItems: "center" },
//   notify: { marginRight: "15@vs", alignItems: "center" },
//   imageStyle: {
//     height: "30@vs",
//     width: "48@s",
//     resizeMode: "contain",
//     marginLeft: "10@vs",
//   },
//   headerTitle: {
//     ...FONTS.t0,
//     fontSize: 12,
//     color: COLORS.whiteColor,
//     marginLeft: "10@s",
//   },
// });

// export default CommonHeader;

