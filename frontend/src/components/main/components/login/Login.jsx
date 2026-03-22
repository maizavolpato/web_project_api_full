import { Link } from "react-router-dom";
import { useState } from "react";

const Login = ({ handleLogin}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // handleSubmit evita o comportamento padrão do navegador e chama
  // o manipulador de login.
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(data);
  };

  return (
    <div className="page">
      <section className="login">
        <p className="login__welcome">
          Entrar
        </p>
        <form className="login__form" onSubmit={handleSubmit}>
          <input
            id="email"
            required
            name="email"
            type="text"
            placeholder="E-mail"
            value={data.email}
            onChange={handleChange}
          />
          <input 
            id="password"
            required
            name="password"
            type="password"
            placeholder="Senha"
            value={data.password}
            onChange={handleChange}
          />
          <div className="login__button-container">
            <button type="submit" className="login__link">
              Entrar
            </button>
          </div>
        </form>
        <div className="login__signup">
          <p>Ainda não é membro?</p>
            <Link to="/signin" className="login__login-link">
              Inscreva-se aqui
            </Link>
        </div>
      </section>
    </div>
  );
};

export default Login;
