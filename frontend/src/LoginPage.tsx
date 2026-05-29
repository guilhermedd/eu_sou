import React from "react"
import { useNavigate } from "react-router-dom";

function LoginPage({ onLogin }) {
    const [name, setName] = React.useState('')
    const [character, setCharacter] = React.useState('')
    const navigate = useNavigate()

    function handleLogin() {
        onLogin({ name, character })
    }

    return (
        <div>
            <h1>Login Page</h1>
            <form>
                <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                <br />
                <button type="button" onClick={handleLogin}>Login</button>
            </form>
        </div>
    )
}

export default LoginPage;