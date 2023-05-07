import axios from 'axios';
import {API_LOGIN_EMAIL, API_SIGNUP_EMAIL} from 'constants/apiUrls';

export const postLogin = async body => {
  const response = await axios.post(API_LOGIN_EMAIL, body);
  return response;
};

export const postSignup = async body => {
  const response = await axios.post(API_SIGNUP_EMAIL, body);
  return response;
};
