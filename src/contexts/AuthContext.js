import {createContext, useReducer} from 'react';

export const AuthStateContext = createContext({});
export const AuthDispatchContext = createContext({});

const initialState = {
  authenticated: false,
  Access: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return {authenticated: true, Access: action.token};
    case 'DELETE_TOKEN':
      return {authenticated: false, Access: null};
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const AuthProvider = ({children}) => {
  // AccessToken을 저장 및 관리
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
