import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.png";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Header({isLoggedIn}) {
  const location = useLocation()
  const isSigninPage = location.pathname === '/signin'
  const authLink = isSigninPage ? '/signup' : '/signin'
  const linkPage = isSigninPage ? "Registrar" : "Faça o login"
  const { currentUser } = useContext(CurrentUserContext);
  const cardPage = location.pathname === '/'
  return (
    <header className="header">
      <img src={logo} alt="Logo Around" className="header__logo" />
      {isLoggedIn && cardPage ? (
        <span className="header__email">{currentUser.data?.email}</span>
      ) : (
        <Link className="header__link" to={authLink}>{linkPage}</Link>
      )}
      
    </header>
  );
}
