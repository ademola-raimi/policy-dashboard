import React, { useReducer, useEffect, useState, type ReactNode } from 'react';
import axios from 'axios';
import type { AuthAction, AuthState } from '../types';
import AuthContext from '../context/AuthContext';
import Spinner from '../components/Spinner';

export const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN':
      return {
        isAuthenticated: true,
        token: action.payload.token,
        user: { username: action.payload.username },
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
}

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [loading, setLoading] = useState(true);

  // On mount, check if user is authenticated via /auth/me
  useEffect(() => {
    axios
      .get('http://localhost:3001/auth/me', { withCredentials: true })
      .then(res => {
        dispatch({ type: 'LOGIN', payload: { token: '', username: res.data.username } });
      })
      .catch(() => {
        dispatch({ type: 'LOGOUT' });
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
