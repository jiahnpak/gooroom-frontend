import {useAuthDispatch} from 'hooks/useAuth';
import {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {removeCookieToken} from 'utils/RefreshToken';

const Logout = () => {
  const authDispatch = useAuthDispatch();
  const navigate = useNavigate();

  const logout = () => {
    removeCookieToken();
    authDispatch({type: 'DELETE_TOKEN'});
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
