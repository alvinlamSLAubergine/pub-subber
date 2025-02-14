import { useState } from 'react';
import './App.css';
import { LoginForm } from './LoginForm';

function App() {
  const [token, setToken] = useState('');

  return (
    <div className="App">
      <LoginForm updateToken={(token) => setToken(token)}/>
    </div>
  );
}

export default App;
