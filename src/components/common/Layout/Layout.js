import {Outlet} from 'react-router-dom';
import Header from './Header';
import Alert from 'components/common/Alert';
import {useAlertState} from 'contexts/AlertContext';
import useRefresh from 'hooks/useRefresh';
import {useEffect} from 'react';
import {AuthState} from 'stores/AuthState';
import {useResetRecoilState} from 'recoil';

const Layout = () => {
  const alertState = useAlertState();

  const refresh = useRefresh();
  const resetAuth = useResetRecoilState(AuthState);

  useEffect(() => {
    refresh();
    return () => {
      resetAuth();
    };
  }, []);

  return (
    <>
      <Header />
      <Alert show={alertState.show} variant={alertState.variant}>
        {alertState.message}
      </Alert>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
