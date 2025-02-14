import { useCallback, useRef, useState } from 'react';

const dev_url = (firebaseApiKey) => 
  `https://api-dev-prisma.gateway.agridence.com/auth/v1/accounts:signInWithPassword?key=${firebaseApiKey}`;

const prod_url = (firebaseApiKey) =>
  `https://api-platform.gateway.prismabyrspo.org/auth/v1/accounts:signInWithPassword?key=${firebaseApiKey}`;

async function login(firebaseApiKey, firebaseTenantId, email, password) {
  return fetch(prod_url(firebaseApiKey), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
      tenantId: firebaseTenantId,
    }),
  })
    .then(response => response.json())
    .then(data => {
      if(data.idToken) {
        return data.idToken
      }
      console.error(data);
    })
    .catch(error => console.error(error));
}

export function LoginForm({ updateToken }) {
  const defaultFirebaseApiKey = localStorage.getItem('firebase_api_key') || '';
  const defaultFirebaseTenantId = localStorage.getItem('firebase_tenant_id') || '';
  const defaultEmail = localStorage.getItem('email') || '';
  const defaultPassword = localStorage.getItem('password') || '';

  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const inputRef = useRef({})

  const handleClick = useCallback(() => {
    setLoading(true);
    login(
      inputRef.current.firebaseApiKey.value,
      inputRef.current.firebaseTenantId.value,
      inputRef.current.email.value,
      inputRef.current.password.value,
    ).then(token => {
      if (token) {
        localStorage.setItem('firebase_api_key', inputRef.current.firebaseApiKey.value);
        localStorage.setItem('firebase_tenant_id', inputRef.current.firebaseTenantId.value);
        localStorage.setItem('email', inputRef.current.email.value);
        localStorage.setItem('password', inputRef.current.password.value);
  
        setToken(token);
        updateToken(token);
      }
    }).finally(() => setLoading(false));

  }, [inputRef, updateToken]);

  return (
    <>
      <form className="login-form-group">
        <input
          ref={input => inputRef.current.firebaseApiKey = input}
          placeholder="firebase_api_key"
          defaultValue={defaultFirebaseApiKey}
        />
        <input
          ref={input => inputRef.current.firebaseTenantId = input}
          placeholder="firebase_tenant_id"
          defaultValue={defaultFirebaseTenantId}
        />
        <button
          onClick={handleClick}
          type="button"
          disabled={loading}
        >
          Login
        </button>
        <input
          ref={input => inputRef.current.email = input}
          placeholder="email"
          defaultValue={defaultEmail}
        />
        <input
          ref={input => inputRef.current.password = input}
          placeholder="password"
          defaultValue={defaultPassword}
        />
      </form>
      <div className='token-text'>{token}</div>
    </>
  )
}