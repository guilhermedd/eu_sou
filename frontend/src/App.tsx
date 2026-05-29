import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useCookies } from 'react-cookie' // No need to import the Provider here anymore

import HomePage from './HomePage'
import LoginPage from './LoginPage'
import ChangeNamePage from './ChangeNamePage'

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  function handleLogin({name, character}) {
    setCookie('user', { name, character }, { path: '/' })
  }

  function handleLogout() {
    removeCookie('user', { path: '/' })
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
            !cookies.user ? <LoginPage onLogin={handleLogin} /> :
            <ChangeNamePage user={cookies.user} removeCookie={handleLogout} />
          } 
        />
        <Route path="/login" element={
            <LoginPage onLogin={handleLogin} />
          } 
        />
        <Route path="/home" element={
            <HomePage user={cookies.user} />
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App