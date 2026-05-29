import React from "react"
import { GET_ALL_USERS } from "./routes"

function HomePage({ user, endGame }) {
    const [users, setUsers] = React.useState([])

    React.useEffect(() => {
        fetch(GET_ALL_USERS)
            .then(res => res.json())
            .then(data => setUsers(data.users))
    }, [])

    const otherUsers = users.filter(u => u !== user.name)

    return (
        <div>
            <h1>Bem-vindo(a), <u>{user.name}</u>!</h1>
            <h3>Hoje vamos jogar <b>eu sou</b>.</h3>
            <h4>O jogo vai começar em breve...</h4>

            <h5>Atualmente, há {otherUsers.length} outros jogador(es):</h5>
            <ul>
                {otherUsers.map(u => (
                    <li key={u}>{u}</li>
                ))}
            </ul>

            <br/>
            {user.name === 'diel' && (
                <button type="button" className="btn btn-success">
                    Começar o jogo
                </button>
            )}
            {user.name === 'diel' && (
                <button type="button" className="btn btn-danger" onClick={endGame}>
                    Finalizar o jogo
                </button>
            )}
        </div>
    )
}

export default HomePage;