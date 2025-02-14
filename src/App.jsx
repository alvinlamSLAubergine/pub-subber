import { useState } from 'react';
import './App.css';
import { GroupEntityForm } from './GroupEntityForm';
import { LoginForm } from './LoginForm';

function App() {
  const [token, setToken] = useState('');

  return (
    <div className="App">
      <LoginForm updateToken={(token) => setToken(token)}/>
      <GroupEntityForm token={token}/>
    </div>
  );
}

export default App;
