import { useEffect, useContext } from "react";
import Popup from "./components/Popup.jsx";
import EditProfile from "./components/editProfile/EditProfile.jsx";
import NewCard from "./components/newCard/NewCard.jsx";
import Card from "./components/card/Card.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import EditAvatar from "./components/editAvatar/EditAvatar.jsx";

export default function Main({
  onOpenPopup,
  onClosePopup,
  popup,
  onCardLike,
  onDeleteCard,
  onImageClick,
  cards,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const newCardPopup = { title: "New card", children: <NewCard /> };

  const editProfilePopup = {
    title: "Editar Perfil",
    children: <EditProfile />,
  };

  const editAvatarPopup = {
    title: "Alterar Avatar",
    children: <EditAvatar />,
  };

  useEffect(() => {
    function handleEscClose(event) {
      if (event.key === "Escape") {
        onClosePopup();
      }
    }
    // Adiciona o event listener apenas se há um popup aberto
    if (popup) {
      document.addEventListener("keydown", handleEscClose);
    }
    // remove o event listener quando o componente desmonta
    // ou quando o popup muda
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [popup]);

  return (
    <>
      <section className="profile">
        <div className="profile__image-container">
          <img
            src={currentUser.avatar}
            alt="Profile Image"
            className="profile__image"
          />
          <img
            src="../src/images/Vector 2.png"
            alt="Ícone"
            className="profile__image-icon"
            onClick={() => onOpenPopup(editAvatarPopup)}
          />
        </div>
        <div className="profile__info">
          <div className="profile__name-button">
            <h2 className="profile__name">{currentUser.name}</h2>
            <button
              aria-label="Edit profile"
              className="profile__edit-button"
              type="button"
              onClick={() => {
                onOpenPopup(editProfilePopup);
              }}
            ></button>
          </div>
          <h1 className="profile__job">{currentUser.about}</h1>
        </div>
        <button
          aria-label="Add card"
          className="profile__add-image-button"
          type="button"
          onClick={() => onOpenPopup(newCardPopup)}
        ></button>
      </section>
      <ul className="cards__list">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardLike={onCardLike}
            onDeleteCard={onDeleteCard}
            onImageClick={onImageClick}
          />
        ))}
      </ul>

      {popup.isOpen && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </>
  );
}
