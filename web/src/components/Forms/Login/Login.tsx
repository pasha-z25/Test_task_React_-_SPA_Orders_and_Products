'use client';

import { getApiUrl } from '@/utils/helpers';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submitHandler = (event: any) => {
    event.preventDefault();

    const config = {
      method: 'POST',
      mode: 'cors' as RequestMode,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    };

    fetch(`${getApiUrl()}/auth/login`, config)
      .then((data) => data.json())
      .then((response) => console.log(response))
      .catch(console.log);
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
