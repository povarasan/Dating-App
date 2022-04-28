/* eslint-disable no-unused-vars */
import AsyncStorage from "@react-native-async-storage/async-storage";

const setUserInformation = async (USER_KEY, value) => {
  await AsyncStorage.setItem(USER_KEY, value);
};

const getUserInformation = async (USER_KEY) => {
  return await AsyncStorage.getItem(USER_KEY);
};

const clearInfo = async (USER_KEY) => {
  return await AsyncStorage.clear();
}
export { setUserInformation, getUserInformation,clearInfo };
