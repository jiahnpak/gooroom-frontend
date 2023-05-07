import {useContext} from 'react';
import {AuthStateContext, AuthDispatchContext} from 'contexts/AuthContext';

/**
 * @returns AuthContext에서 관리하는 상태를 반환한다.
 */
export const useAuthState = () => {
  return useContext(AuthStateContext);
};

/**
 * @returns AuthContext에서 관리하는 dispatch를 반환한다.
 */
export const useAuthDispatch = () => {
  return useContext(AuthDispatchContext);
};

export default useAuthState;
