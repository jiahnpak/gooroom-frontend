/* eslint-disable react-hooks/exhaustive-deps */
import {API_LOGOUT} from 'constants/apiUrls';
import useAlert from 'hooks/useAlert';
import useInterceptedAxios from 'hooks/useInterceptedAxios';
import {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useResetRecoilState} from 'recoil';
import {AuthState} from 'stores/AuthState';

const Logout = () => {
  const navigate = useNavigate();
  const resetAuth = useResetRecoilState(AuthState);
  const jwtAxios = useInterceptedAxios();
  const showAlert = useAlert();

  const logout = async () => {
    try {
      resetAuth();
      await jwtAxios.get(API_LOGOUT);
    } catch (err) {
      showAlert(
        'danger',
        '서버와 연결이 불안정합니다. 잠시 후 다시 시도해주세요.',
        2000,
      );
    } finally {
      return navigate('/');
    }
  };

  useEffect(() => {
    logout();
  }, []);

  return (
    <>
      <Link to="/" />
    </>
  );
};

export default Logout;
