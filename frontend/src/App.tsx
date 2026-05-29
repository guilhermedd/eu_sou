import React from "react"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useCookies } from 'react-cookie' 
import { INSERT_USER } from "./routes"

import HomePage from './HomePage'
import LoginPage from './LoginPage'
import ChangeNamePage from './ChangeNamePage'

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [error, setError] = React.useState('')

  async function handleLogin({ name }) {
    handleLogout()
    setError('') 
    try {
      const res = await fetch(`${INSERT_USER}?name=${encodeURIComponent(name)}`, {
        method: 'POST',
        headers: { 'accept': 'application/json' }
      })
      const data = await res.json()

      console.log(data)
      if (data.error || !data.user_id) {
        setError(data.error)
        return
      }

      setCookie('user', { name, id: data.user_id }, { path: '/' })
    } catch (e) {
      setError('Erro ao conectar com o servidor')
    }
  }

  function handleLogout() {
    removeCookie('user', { path: '/' })
  }

  function endGame() {
    removeCookie('user', { path: '/' })
  }

  return (
    <BrowserRouter>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Routes>
        <Route path="/" element={
          !cookies.user ? 
            <LoginPage onLogin={handleLogin} /> :
            <ChangeNamePage user={cookies.user} removeCookie={handleLogout} />
        } />
        <Route path="/login" element={
          <LoginPage onLogin={handleLogin} />
        } />
        <Route path="/home" element={
          !cookies.user ? 
            <LoginPage onLogin={handleLogin} /> :
            <HomePage user={cookies.user} endGame={endGame} />
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App