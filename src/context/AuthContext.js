import {clearLocalStorage, setLocalStorage, getLocalStorage} from '../utils';
import React, {createContext, useCallback, useReducer} from 'react';

// * initial Value
const initialValue = {
  state: {
    isLoggedIn: false,
  },
  // setIsLoggedIn: () => {},
  // login: async () => {},
  // logout: () => {},
};

// * Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_IS_LOGGED_IN':
      return {...state, isLoggedIn: action.isLoggedIn};

    default:
      return state;
  }
};

export const AuthContext = createContext(initialValue);
export const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialValue.state);

  const setIsLoggedIn = useCallback(async isLoggedIn => {
    dispatch({type: 'SET_IS_LOGGED_IN', isLoggedIn});
  }, []);

  const login = async () => {
    await setLocalStorage('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await clearLocalStorage();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{state, setIsLoggedIn, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
