import {useContext} from 'react';
import {createContext, useReducer} from 'react';

export const AlertStateContext = createContext({});
export const AlertDispatchContext = createContext({});

const initialState = {
  show: false,
  variant: 'light',
  message: '',
};

const alertReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return {
        show: true,
        variant: action.variant,
        message: action.message,
      };
    case 'HIDE':
      return {
        ...state,
        show: false,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const AlertProvider = ({children}) => {
  // 알림 창의 종류, 메시지, 그리고 열려있는지 여부의 상태를 관리
  const [state, dispatch] = useReducer(alertReducer, initialState);

  return (
    <AlertStateContext.Provider value={state}>
      <AlertDispatchContext.Provider value={dispatch}>
        {children}
      </AlertDispatchContext.Provider>
    </AlertStateContext.Provider>
  );
};

export const useAlertState = () => {
  return useContext(AlertStateContext);
};

export const useAlertDispatch = () => {
  return useContext(AlertDispatchContext);
};
