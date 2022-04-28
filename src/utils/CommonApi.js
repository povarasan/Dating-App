import {Headers} from '../constants';
import httpClient from './httpClient';

export const onApiCall = async ({method, url, data, isFileUpload = false}) => {
  const constructHeaders = () => {
    if (isFileUpload) {
      return {
        common: {'Content-Type': 'multipart/form-data'},
      };
    } else {
      return {
        common: {'Content-Type': 'application/json'},
      };
    }
  };
  console.log(`===> Request: ${method} ${url}`);
  try {
    const response = await httpClient.request({
      url,
      method,
      data,
      headers: constructHeaders(),
    });
    return {
      data: response?.data,
      status: response?.status,
    };
  } catch (error) {
    console.log('Err catch', error);
    if (error.response) {
      return {
        data: error.response.data.message,
        status: error.response.status,
      };
    } else if (error.request) {
      return {
        data: Headers.apiError,
      };
    } else {
      return {
        data: Headers.apiError,
      };
    }
  }
};
