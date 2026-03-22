import logo from "../../images/logo.png";

export default function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Logo Around" className="header__logo" />
    </header>
  );
}
