import axios from 'axios';
import {BASE_URL} from './constant';
import {store} from '../navigation/Router';
const httpClient = axios.create({
  baseURL: BASE_URL,
  timeout: 360000,
});
// Add a request interceptor
httpClient.interceptors.request.use(
  function (config) {
    const {userData} = store.getState().loginReducer;
    console.log('UserData1', userData?.token);
    if (userData) {
      config.headers.Authorization = `Token ${userData?.token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// Add a response interceptor
httpClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      console.log(error.response.status);
      if (error.response.status === 401) {
        store.dispatch({type: 'LOGIN', payload: '5'});
      }
    } else if (error.request) {
    } else {
      console.error('Error', error.message);
    }
    return Promise.reject(error);
  },
);

export default httpClient;
