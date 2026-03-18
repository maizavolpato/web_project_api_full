import { useState, useContext, useRef } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  return (
    <form
      id="form"
      className="popup__update-avatar"
      noValidate
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <input
          type="url"
          className="popup__input popup__avatar-input"
          id="avatar"
          name="avatar"
          placeholder="Link de Imagem"
          ref={avatarRef}
          required
        />
        <button className="popup__button-submit" type="submit">
          Salvar
        </button>
      </fieldset>
    </form>
  );
}
