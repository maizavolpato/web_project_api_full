import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"


const Register = ({ handleRegister }) => {
  const navigate = useNavigate()

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('dados capturados:', data)
    handleRegister(data.email, data.password)
    .then(() => {
      navigate('/signin')
    })
    .catch((err) => {
      console.log('Erro no registro:', err)
    })
  };

  return (
    <div className="page">
   
      <section className="register">
        <p className="register__welcome">Inscrever-se</p>
        <form className="register__form" onSubmit={handleSubmit}>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="E-mail"
            value={data.email}
            onChange={handleChange}
          />
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Senha"
            value={data.password}
            onChange={handleChange}
          />
          <div className="register__button-container">
            <button type="submit" className="register__link">
              Inscrever-se
            </button>
          </div>
        </form>
        <div className="register__signin">
          <p>Já é um membro?</p>
            <Link to="signup" className="register__login-link">
              Faça o login aqui!
            </Link>
         </div>
      </section>
    </div>
  );
};

export default Register;
