import {REDIRECT_URI_KAKAO, REDIRECT_URI_NAVER} from 'constants/path';

export const API_LOGIN_EMAIL = `${process.env.REACT_APP_API_URL}/login/email`;

const CLIENT_ID_KAKAO = process.env.REACT_APP_CLIENT_ID_KAKAO;
export const API_LOGIN_KAKAO = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${CLIENT_ID_KAKAO}&redirect_uri=${REDIRECT_URI_KAKAO}`;

export const API_LOGIN_NAVER = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID_NAVER}&redirect_uri=${REDIRECT_URI_NAVER}}`;

export const API_SIGNUP_EMAIL = `${process.env.REACT_APP_API_URL}/signup/email`;

export const API_USERS = `${process.env.REACT_APP_API_URL}/users`;
export const API_USERS_LIFESTYLE = `${process.env.REACT_APP_API_URL}/users/lifestyle`;

export const API_USERS_PROFILEIMAGE = `${process.env.REACT_APP_API_URL}/users/profileImage`;

export const API_MATES = `${process.env.REACT_APP_API_URL}/mates`;
