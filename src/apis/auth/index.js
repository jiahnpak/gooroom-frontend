import customAxios from 'utils/customAxios';
import {API_LOGIN_EMAIL, API_SIGNUP_EMAIL} from 'constants/apiUrls';

export const postLogin = async body => {
  const response = await customAxios.post(API_LOGIN_EMAIL, body);
  return response;
};

export const postSignup = async body => {
  const response = await customAxios.post(API_SIGNUP_EMAIL, body);
  return response;
};
