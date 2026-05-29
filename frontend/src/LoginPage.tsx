import React from "react"

function LoginPage({ onLogin }) {
    const [name, setName] = React.useState('')
    const [character, setCharacter] = React.useState('')

    return (
        <div>
            <h1>Login Page</h1>
            <form>
                <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                <br />
                <input type="text" placeholder="Character" value={character} onChange={e => setCharacter(e.target.value)} />
                <br />
                <button type="button" onClick={() => onLogin({ name, character })}>Login</button>
            </form>
        </div>
    )
}

export default LoginPage;