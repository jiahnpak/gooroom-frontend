import {Outlet} from 'react-router-dom';
import Header from './Header';
import Alert from 'components/common/Alert';
import {useAlertState} from 'contexts/AlertContext';

const Layout = () => {
  const alertState = useAlertState();

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
