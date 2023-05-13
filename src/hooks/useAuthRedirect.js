import {useNavigate} from 'react-router-dom';
import useAlert from './useAlert';
import {useCallback} from 'react';
import {LOGIN} from 'constants/path';
import {useEffect} from 'react';
import {useRecoilValue} from 'recoil';
import {AuthState} from 'stores/AuthState';

const useAuthRedirect = () => {
  const auth = useRecoilValue(AuthState);
  const showAlert = useAlert();
  const navigate = useNavigate();

  const redirectIfNotAuthenticated = useCallback(() => {
    if (!auth.authenticated) {
      showAlert(
        'warning',
        '인증이 필요한 서비스입니다. 로그인 후 이용해주세요.',
        2000,
      );
      navigate(LOGIN, {replace: true});
    }
  }, [auth.authenticated]);

  useEffect(() => {
    redirectIfNotAuthenticated();
  }, [redirectIfNotAuthenticated]);
};

export default useAuthRedirect;
