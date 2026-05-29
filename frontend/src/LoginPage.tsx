import React from "react"

function LoginPage({ onLogin }) {
    const [name, setName] = React.useState('')

    function isNameValid() {
        return name.length > 1
    }

    return (
        <div>
            <h1>Tche, bem vindo(a) ao jogo <u><b>"eu sou"</b></u></h1>
            <h2>Digite seu nome</h2>
            <form>
                <input type="text" placeholder="Cupinxa" value={name} onChange={e => setName(e.target.value)} />
                <br/>
                <button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={() => onLogin({ name })}
                    disabled={!isNameValid()}
                >
                    Começar o jogo
                </button>
            </form>
        </div>
    )
}

export default LoginPage;