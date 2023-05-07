import {Cookies} from 'react-cookie';

const cookies = new Cookies();

// Refresh Token을 Cookie에 저장하기 위한 함수이다.
export const setRefreshToken = Access_refresh => {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 7);

  return cookies.set('refresh_token', Access_refresh, {
    sameSite: 'strict',
    path: '/',
    expires: new Date(expireDate),
  });
};

// Cookie에 저장된 Refresh Token을 가져오기 위한 함수이다.
export const getRefreshToken = () => {
  return cookies.get('refresh_token');
};

// Cookie 삭제를 위한 함수이다.
export const removeCookieToken = () => {
  return cookies.remove('refresh_token', {sameSite: 'strict', path: '/'});
};
