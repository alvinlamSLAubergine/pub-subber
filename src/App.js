import './App.css';

const dev_url = 'https://api-dev-prisma.gateway.agridence.com/auth/v1/accounts:signInWithPassword?key=AIzaSyAqMUnu1EuehGa-RyLv83XFclGRXskvqKA';
const dev_tenant = 'prisma-dev-tenant-3b9pb';

function login() {
  fetch(dev_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'hoangtuan.tran+memberaudit@agridence.com',
      password: 'DevTu@n-123',
      returnSecureToken: true,
      tenantId: dev_tenant,
    }),
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}

function App() {
  return (
    <div className="App">
      <input
        placeholder="Type here..."
      />
      <button onClick={login}>
        Submit
      </button>
    </div>
  );
}

export default App;
