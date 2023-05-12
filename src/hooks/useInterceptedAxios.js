import {useEffect} from 'react';
import customAxios from 'utils/customAxios';
import useAuthState, {useAuthDispatch} from './useAuth';
import {getRefreshToken} from 'utils/RefreshToken';
import useAlert from './useAlert';
import {useNavigate} from 'react-router-dom';
import {LOGIN} from 'constants/path';
import CODE from 'constants/errorCode';

const useInterceptedAxios = () => {
  const authState = useAuthState();
  const authDispatch = useAuthDispatch();

  const showAlert = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    const requestIntercept = customAxios.interceptors.request.use(
      config => {
        // 모든 요청 헤더에 액세스 토큰을 'Authorization'으로 전달한다.
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${authState.accessToken}`;
        }
        return config;
      },
      error => Promise.reject(error),
    );
    const responseIntercept = customAxios.interceptors.response.use(
      response => {
        // useInterceptedAxios를 통한 요청에 대한 서버의 응답 헤더에
        // 'authorization'으로 액세스 토큰이 전달된다면 재발급된 것이므로 갱신한다.
        const accessToken = response?.headers['authorization'];
        if (accessToken) {
          authDispatch({type: 'SET_TOKEN', token: accessToken});
        }
        return response;
      },
      error => {
        const prevRequest = error?.config;
        if (
          error?.response?.data?.errorCode === CODE.INVALIDATE_TOKEN &&
          !prevRequest?.sent
        ) {
          // 토큰이 만료되었을 때 리프레시 토큰을 헤더에 넣어서 제전송
          prevRequest.sent = true;
          const refreshToken = getRefreshToken();

          // 리프레시 토큰도 만료된 경우 로그인 페이지로 이동
          if (!refreshToken) {
            showAlert(
              'light',
              '토큰 허용 시간이 만료되었습니다. 개인정보보호를 위해 다시 로그인해주세요.',
              3000,
            );
            return navigate(LOGIN);
          }

          // 이전 요청 헤더에 리프레시 토큰을 'Authorization-refresh'로 전달한다.
          prevRequest.headers[
            'Authorization-refresh'
          ] = `Bearer ${refreshToken}`;
          return customAxios(prevRequest);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      customAxios.interceptors.request.eject(requestIntercept);
      customAxios.interceptors.response.eject(responseIntercept);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState, authDispatch]);

  return customAxios;
};

export default useInterceptedAxios;
