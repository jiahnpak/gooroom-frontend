import {useEffect} from 'react';
import customAxios from 'utils/customAxios';
import {useRecoilState} from 'recoil';
import {AuthState} from 'stores/AuthState';
import useRefresh from './useRefresh';

const useInterceptedAxios = () => {
  const [auth, setAuth] = useRecoilState(AuthState);
  const refresh = useRefresh();

  useEffect(() => {
    const requestIntercept = customAxios.interceptors.request.use(
      config => {
        // 모든 요청 헤더에 액세스 토큰을 'Authorization'으로 전달한다.
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
        }
        // 요청에서 보내는 데이터가 FormData라면 content type을 바꾼다.
        if (config.data instanceof FormData) {
          config.headers['Content-Type'] = 'multipart/form-data';
        } else {
          config.headers['Content-Type'] = 'application/json';
        }
        return config;
      },
      error => Promise.reject(error),
    );
    const responseIntercept = customAxios.interceptors.response.use(
      response => response,
      async error => {
        const prevRequest = error?.config;
        if (error?.response?.status === 406 && !prevRequest?.sent) {
          // 토큰이 만료되었을 때 재발급받아서 곧바로 전송
          prevRequest.sent = true;

          const newAccessToken = await refresh();
          setAuth(prev => ({
            ...prev,
            accessToken: newAccessToken,
          }));

          // 이전 요청 헤더에 새 액세스 토큰을 'Authorization'로 전달한다.
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
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
  }, [auth]);

  return customAxios;
};

export default useInterceptedAxios;
