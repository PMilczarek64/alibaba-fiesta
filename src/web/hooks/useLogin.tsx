import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { callServer } from '../../api/clients/callServer';

export type useLoginResult = {
  handleLogin: (username: string, password: string) => Promise<void>;
  loginStatus: string | null;
  isLoggedIn: boolean;
};

export const useLogin = (setCurrentUserId: (userId: number) => void, fetchFiles: () => Promise<void>, setFiles: Dispatch<SetStateAction<string[]>>): useLoginResult => {
  const [loginStatus, setLoginStatus] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // debugger;
    const checkSession = async () => {
      try {
        const res = await callServer({ mode: 'CHECK_USER_SESSION', method: 'GET' });
        const userId = res.data?.userId;
        if (userId !== undefined && userId !== null && res.success) {
          setIsLoggedIn(true);
          setCurrentUserId(res.data.userId);
          fetchFiles();
        } else {
          setIsLoggedIn(false);
          setCurrentUserId(0);
          setFiles([]);
        }
      } catch (err) {
        console.error('Session check failed', err);
      }
    };
    checkSession();
  }, [setCurrentUserId, fetchFiles, setFiles]);

  const handleLogin = async (username: string, password: string) => {
    if (isLoggedIn) {
      //LOGOUT
      await callServer({ mode: 'LOGOUT_USER', method: 'GET' });
      setIsLoggedIn(false);
      setCurrentUserId(0);
      setLoginStatus('✅ Logged out.');
      setFiles([]);
      return;
    }
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
      setLoginStatus(loginRes.success ? '✅ Logged in.' : '❌ Login failed.' + (loginRes.status === 401 ? ' Incorrect credentials.' : ''));
      setIsLoggedIn(loginRes.success);
      fetchFiles();
      setCurrentUserId(loginRes.success ? loginRes.data.userId : 0);
    } catch (err) {
      console.error(err);
      setLoginStatus('❌ Unexpected error');
    }
  };

  return { handleLogin, loginStatus, isLoggedIn };
};
