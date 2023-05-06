import axios from 'axios';
import {API_SIGNUP_EMAIL} from 'constants/apiUrls';

export const postSignup = async body => {
  const response = await axios.post(API_SIGNUP_EMAIL, body);
  return response;
};
