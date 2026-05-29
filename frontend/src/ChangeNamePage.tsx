import { Route, useNavigate } from "react-router-dom";

function ChangeNamePage({ user, removeCookie }) {
    const navigate = useNavigate();

    function handleYes() {
        navigate("/home");
    }
    
    function handleNo() {
        removeCookie()
    }

    return (
        <div>
            <h1>Olá, {user.name}!</h1>
            <p>Você gostaria de continuar com esse nome?</p>
            <button type="button" className="btn btn-primary" onClick={handleYes}>
                Sim
            </button>
            <button type="button" className="btn btn-danger" onClick={handleNo}>
                Não
            </button>
        </div>
    )
}

export default ChangeNamePage;