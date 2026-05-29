function HomePage({ user }) {
    return (
        <div>
            <h1>Bem-vindo, {user.name}!</h1>
            <p>Hoje vamos jogar <b>eu sou</b>.</p>
            <p>Você vai ser <u>{user.character}</u></p>
        </div>
    )
}

export default HomePage;