import { useState } from 'react';
import { callServer } from '../../api/clients/callServer';

export type useLoginResult = {
  handleLogin: (username: string, password: string) => Promise<void>;
  loginStatus: string | null;
  isLoggedIn: boolean;
};

export const useLogin = (setCurrentUserId: (userId: number) => void): useLoginResult => {
  const [loginStatus, setLoginStatus] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (username: string, password: string) => {
    if (!username || !password) return;

    setLoginStatus('Logging in...');

    try {
      const result = await callServer({
        mode: 'GET_USER',
        method: 'POST',
        login: username,
      });
      const userNotFound = !result.success || result.data?.length === 0;

      if (userNotFound) {
        // ✅ Ask user for confirmation
        const shouldCreate = window.confirm(
          `User "${username}" does not exist.\nDo you want to create a new account?`,
        );

        if (!shouldCreate) {
          setLoginStatus('❌ Login cancelled.');
          return;
        }

        setLoginStatus('Creating user...');

        const createRes = await callServer({
          mode: 'ADD_USER',
          method: 'POST',
          login: username,
          password,
        });

        if (!createRes.success) {
          return setLoginStatus('❌ User creation failed');
        }
      }

      const loginRes = await callServer({
        mode: 'LOGIN_USER',
        method: 'POST',
        login: username,
        password,
      });
      setLoginStatus(loginRes.success ? '✅ Logged in.' : '❌ Login failed.');
      setIsLoggedIn(loginRes.success);
      setCurrentUserId(loginRes.success ? loginRes.data.userId : 0);
    } catch (err) {
      console.error(err);
      setLoginStatus('❌ Unexpected error');
    }
  };

  return { handleLogin, loginStatus, isLoggedIn };
};
