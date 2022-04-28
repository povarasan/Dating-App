// import React from "react";
// import { Text, View, Alert, Dimensions, Image,TouchableOpacity } from "react-native";
// import Modal from "react-native-modal";
// import { ScaledSheet } from "react-native-size-matters";
// import {TextInput} from 'react-native-paper';
// import {
//   FONTS,
//   COLORS,
//   adjust,
// } from "../constants/theme"

// import { Vector } from "../constants/";

// // var { width } = Dimensions.get("window");

// export const CommonPopup = ({
//   isVisible,
//   title,
//   subtitle,
//   onPressNo,
//   onPressYes,
//   successButtonText,
//   negativeButtonText,
//   type,
//   onClose,
//   image,
// }) => {
//   //const [type, setType] = useState(0);
//   return (
//     <Modal
//       animationIn={"slideInUp"}
//       isVisible={isVisible}
//       style={styles.container}
//     >
//       {type === 0 ? (
//         <View style={styles.containerStyle}>
//           <Text style={styles.order}>{title}</Text>
//           <Text style={styles.order_2}>{subtitle}</Text>
//           {/* <View style={styles.buttonContainer}>
//             <CommonButton
//               buttonStyle={styles.ButtonStyle_No}
//               isLoading={false}
//               text={negativeButtonText}
//               textStyle={styles.buttonTextStyle_No}
//               onPress={onPressNo}
//             />
//             <CommonButton
//               buttonStyle={styles.ButtonStyle_yes}
//               isLoading={false}
//               text={successButtonText}
//               textStyle={styles.buttonTextStyle_yes}
//               onPress={onPressYes}
//             />
//           </View> */}
//         </View>
//       ) : type === 1 ? (
//         <View style={styles.containerStyle_1}>
//           <Text style={styles.order}>{title}</Text>
//           {/* <TouchableOpacity style={{position:'absolute',top: 10,right: 10}} onPress={onClose}>
//           {Vector.CancelX}
//           </TouchableOpacity> */}
//           <View style={{flexDirection:'row',marginVertical: 10}}>
//           <Image source={image} resizeMode={'cover'} style={{height: 150,width: 100,marginStart: 5}}/>
//           <View>
//           <Text style={styles.order_2}>{subtitle}</Text>
//           <View style={[styles.buttonContainer,{alignSelf:'flex-start'}]} >
//             {/* <CommonButton
//               buttonStyle={styles.ButtonStyle_yes}
//               isLoading={false}
//               text={"Direction"}
//               textStyle={styles.buttonTextStyle_yes}
//               onPress={() => Alert.alert("Octo", "Submitted")}
//             /> */}
//           </View>
//           </View>
//           </View>
          
//           {/* <TextInput
//             style={styles.input2}
//             // onChangeText={onChangeText2}
//             // // label="Description"
//             // // placeHolder="Description"
//             mode={"outlined"}
//             // value={text2}
//             placeholderTextColor={"#B0B0B0"}
//             activeOutlineColor={"#8B84D7"}
//             outlineColor={"#8B84D7"}
//             // returnKeyType="next"
//             multiline={true}
//           /> */}

//         </View>
//       ) : null}
//     </Modal>
//   );
// };
// const styles = ScaledSheet.create({
//   containerStyle: {
//     // height: "130@vs",
//     width: width - 30,
//     //width: "330@vs",
//     backgroundColor: "white",
//     borderRadius: "4@msr",
//     justifyContent: "center",
//     alignSelf: "center",
//     paddingVertical: "12@msr",
//   },
//   containerStyle_1: {
//     // height: "250@vs",
//     width: width - 30,
//     // width: "330@vs",
//     backgroundColor: "white",
//     borderRadius: "4@msr",
//     justifyContent: "center",
//     alignSelf: "center",
//     // paddingHorizontal: "12@msr",
//     paddingVertical: "12@msr",
//   },
//   container: {
//     height: "600@vs",
//   },
//   order: {
//     ...FONTS.h4,
//     //marginTop: "10@msr",
//     paddingHorizontal: "10@msr",
//     paddingVertical: "5@vs",
//     color: COLORS.blackColor,
//   },
//   order_2: {
//     ...FONTS.body4,
//     paddingHorizontal: "10@msr",
//     paddingVertical: "5@vs",
//     color: COLORS.blackColor,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     // flex: 1,
//     marginVertical: "5@vs",
//     // justifyContent: "space-between",
//     // marginTop: "20@vs",
//   },
//   //buttons
//   //no
//   buttonTextStyle_No: {
//     ...FONTS.P0,
//     fontSize: adjust(12),
//     color: COLORS.whiteColor,
//   },
//   ButtonStyle_No: {
//     //height:SIZES.height * 0.06,
//    height: "40@vs",
//    width: "135@s",
//     borderRadius: adjust(5),
//     backgroundColor: COLORS.secondaryColor,
//   },
//   //no
//   //yes
//   buttonTextStyle_yes: {
//     ...FONTS.P0,
//     fontSize: adjust(12),
//     color: COLORS.whiteColor,
//   },
//   ButtonStyle_yes: {
//     height: "40@vs",
//     width: "135@s",
//     borderRadius: adjust(5),
//     backgroundColor: COLORS.primaryColor,
//   },
//   //yes
//   //Buttons
//   //Modal 2
//   input2: {
//     height: "100@vs",
//     width: "305@s",
//     color: COLORS.blackColor,
//     backgroundColor: "#FBFBFB",
//     borderColor: "#FFFFFF",
//     borderWidth: 0.5,
//     borderRadius: "5@msr",
//     fontSize: adjust(16),
//     textAlign: "left",
//     marginTop: "10@msr",
//     alignSelf: "center",
//   },
// });
