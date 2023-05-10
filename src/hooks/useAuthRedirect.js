import {useNavigate} from 'react-router-dom';
import useAlert from './useAlert';
import useAuthState from './useAuth';
import {useCallback} from 'react';
import {LOGIN} from 'constants/path';
import {useEffect} from 'react';

const useAuthRedirect = () => {
  const authState = useAuthState();
  const showAlert = useAlert();
  const navigate = useNavigate();

  const redirectIfNotAuthenticated = useCallback(() => {
    if (!authState.authenticated) {
      showAlert(
        'warning',
        '인증이 필요한 서비스입니다. 로그인 후 이용해주세요.',
        2000,
      );
      navigate(LOGIN);
    }
  }, [authState.authenticated, navigate, showAlert]);

  useEffect(() => {
    redirectIfNotAuthenticated();
  }, [redirectIfNotAuthenticated]);
};

export default useAuthRedirect;
