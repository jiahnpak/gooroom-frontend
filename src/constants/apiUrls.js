import {REDIRECT_URI} from 'constants/path';

export const API_LOGIN_EMAIL = '/login/email';

const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
export const API_LOGIN_KAKAO = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

export const API_SIGNUP_EMAIL = '/signup/email';

export const API_USERS = '/users';
export const API_USERS_LIFESTYLE = '/users/lifestyle';

export const API_USERS_PROFILEIMAGE = '/users/profileImage';
