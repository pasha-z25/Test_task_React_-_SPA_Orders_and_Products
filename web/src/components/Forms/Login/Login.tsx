'use client';

import { useAppDispatch, useAppSelector } from '@/store';
import { login } from '@/store/slices/authSlice';
import { useEffect, useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.auth);

  useEffect(() => {
    console.log('!!! useEffect', state);
  }, [state]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submitHandler = (event: any) => {
    event.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <form onSubmit={submitHandler}>
      <p>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </p>
      <br />
      <p>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </p>
      <br />
      <button>Login</button>
    </form>
  );
}
