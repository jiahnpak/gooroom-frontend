import {getLoginRefresh} from 'apis/auth';
import {matchPath, useLocation, useNavigate} from 'react-router-dom';
import {LOGIN, LOGIN_EMAIL, SIGNUP} from 'constants/path';
import {useResetRecoilState, useSetRecoilState} from 'recoil';
import {AuthState} from 'stores/AuthState';

const useRefresh = () => {
  const setAuth = useSetRecoilState(AuthState);
  const resetAuth = useResetRecoilState(AuthState);

  const location = useLocation();
  const navigate = useNavigate();

  // JWT가 필요하지 않은 경로들
  const authlessPaths = ['/', LOGIN, LOGIN_EMAIL, SIGNUP];

  // 주어진 경로가 authlessPaths에 포함되는지 확인한다.
  const isAuthNeeded = path => {
    const match = authlessPaths.find(authlessPath => {
      return matchPath(authlessPath, path);
    });

    return !match;
  };

  // 서버에 액세스 토큰 재발급을 요청한다.
  const refresh = async () => {
    try {
      const response = await getLoginRefresh();
      const accessToken = response?.headers['Authorization'];
      if (!accessToken) {
        throw new Error('토큰 생성에 실패했습니다.');
      }

      setAuth({authenticated: true, accessToken: accessToken});
      // 리프레시 성공시 재발급 받은 액세스 토큰 반환
      return accessToken;
    } catch (err) {
      // 리프레시 토큰이 만료되었거나 아직 로그인하지 않은 경우 로그인 페이지로 이동
      resetAuth();
      const currentPath = location.pathname;
      if (isAuthNeeded(currentPath)) {
        return navigate(LOGIN, {replace: true});
      }
      return null;
    }
  };

  return refresh;
};

export default useRefresh;
