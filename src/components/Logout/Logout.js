/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useResetRecoilState} from 'recoil';
import {AuthState} from 'stores/AuthState';

const Logout = () => {
  const navigate = useNavigate();
  const resetAuth = useResetRecoilState(AuthState);

  const logout = () => {
    resetAuth();
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
