import {useEffect} from 'react';
import customAxios from 'utils/customAxios';
import useAuthState, {useAuthDispatch} from './useAuth';
import {getRefreshToken} from 'utils/RefreshToken';

const useInterceptedAxios = () => {
  const authState = useAuthState();
  const authDispatch = useAuthDispatch();

  useEffect(() => {
    const requestIntercept = customAxios.interceptors.request.use(
      config => {
        // 모든 Request Header에 accessToken을 넣어주는 역할
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `${authState.accessToken}`;
        }
        return config;
      },
      error => Promise.reject(error),
    );
    const responseIntercept = customAxios.interceptors.response.use(
      response => response,
      async error => {
        // 토큰이 만료되었을 때 새로운 토큰을 발급하는 역할
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const refreshToken = getRefreshToken();
          const response = await customAxios.post(
            '/auth/refresh',
            {},
            {
              headers: {
                ...customAxios.defaults.headers,
                'Authorization-refresh': refreshToken,
              },
            },
          );
          const newaccessToken = JSON.parse(response).Authorization;
          authDispatch({type: 'SET_TOKEN', token: newaccessToken});
          prevRequest.headers['Authorization'] = `${newaccessToken}`;
          return customAxios(prevRequest);
        }
      },
    );

    return () => {
      customAxios.interceptors.request.eject(requestIntercept);
      customAxios.interceptors.response.eject(responseIntercept);
    };
  }, [authState, authDispatch]);
};

export default useInterceptedAxios;
