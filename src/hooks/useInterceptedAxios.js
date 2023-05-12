import {useEffect} from 'react';
import customAxios from 'utils/customAxios';
import useAuthState, {useAuthDispatch} from './useAuth';
import {getRefreshToken} from 'utils/RefreshToken';
import useAlert from './useAlert';
import {useNavigate} from 'react-router-dom';
import {LOGIN} from 'constants/path';
import errorCode from 'constants/errorCode';

const useInterceptedAxios = () => {
  const authState = useAuthState();
  const authDispatch = useAuthDispatch();

  const showAlert = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    const requestIntercept = customAxios.interceptors.request.use(
      config => {
        // 모든 Request Header에 accessToken을 넣어주는 역할
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${authState.accessToken}`;
        }
        return config;
      },
      error => Promise.reject(error),
    );
    const responseIntercept = customAxios.interceptors.response.use(
      response => {
        // useInterceptedAxios를 통한 요청에 대한 서버의 응답 데이터에 accessToken이 있다면 재발급된 것이므로 갱신
        const data = JSON.parse(response?.data || '{}');

        const accessToken = data['Authorization'];
        if (accessToken) {
          authDispatch({type: 'SET_TOKEN', token: accessToken});
        }
        return response;
      },
      error => {
        const prevRequest = error?.config;
        if (
          error?.response?.data?.errorCode === errorCode.INVALIDATE_TOKEN &&
          !prevRequest?.sent
        ) {
          // 토큰이 만료되었을 때 refreshToken을 헤더에 넣어서 제전송
          prevRequest.sent = true;
          const refreshToken = getRefreshToken();

          // refresh token도 만료된 경우 로그인 페이지로 이동
          if (!refreshToken) {
            showAlert(
              'light',
              '토큰 허용 시간이 만료되었습니다. 개인정보보호를 위해 다시 로그인해주세요.',
              3000,
            );
            return navigate(LOGIN);
          }

          prevRequest.headers[
            'Authorization-refresh'
          ] = `Bearer ${refreshToken}`;
          return customAxios(prevRequest);
        }
      },
    );

    return () => {
      customAxios.interceptors.request.eject(requestIntercept);
      customAxios.interceptors.response.eject(responseIntercept);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState, authDispatch]);
};

export default useInterceptedAxios;
