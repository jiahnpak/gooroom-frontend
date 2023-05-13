/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useSetRecoilState} from 'recoil';
import {AuthState} from 'stores/AuthState';
import {removeCookieToken} from 'utils/RefreshToken';

const Logout = () => {
  const setAuth = useSetRecoilState(AuthState);
  const navigate = useNavigate();

  const logout = () => {
    removeCookieToken();
    setAuth({authenticated: false, accessToken: null});
    return navigate('/');
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
