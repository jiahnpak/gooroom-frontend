import {Outlet} from 'react-router-dom';

const Provider = providers => {
  return providers.providers.reduce((prev, Provider) => {
    return <Provider>{prev}</Provider>;
  }, <Outlet />);
};

export default Provider;
