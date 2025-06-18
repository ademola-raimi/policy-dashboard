import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import Btn from '../components/Btn';

axios.defaults.withCredentials = true;

const LoginPage: React.FC = () => {
  const { state, dispatch } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (state.isAuthenticated) {
      navigate('/recommendations', { replace: true });
    }
  }, [state.isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }
    try {
      await axios.post('http://localhost:3001/login', { username, password }, { withCredentials: true });
      dispatch({ type: 'LOGIN', payload: { token: '', username } });
      navigate('/recommendations');
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm flex flex-col items-center mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Login</h2>
        {error && <div className="mb-4 text-red-500 w-full text-center">{error}</div>}
        <input
          className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-900"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Btn className="w-full" type="submit">Login</Btn>
      </form>
    </div>
  );
};

export default LoginPage;