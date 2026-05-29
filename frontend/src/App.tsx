import HomePage from './HomePage'
import LoginPage from './LoginPage'
import { useCookies } from 'react-cookie' // No need to import the Provider here anymore

function App() {
  const [cookies, setCookie] = useCookies(['user'])

  function handleLogin({name, character}) {
    setCookie('user', { name, character }, { path: '/' })
  }

  return (
    <div>
      {cookies.user ? <HomePage user={cookies.user} /> : <LoginPage onLogin={handleLogin} />}
    </div>
  )
}

export default App