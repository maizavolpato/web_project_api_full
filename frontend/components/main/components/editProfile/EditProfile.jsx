import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setDescription(currentUser.about || "");
    }
  }, [currentUser]);

  const handleNameChange = (evt) => {
    setName(evt.target.value);
  };

  const handleDescriptionChange = (evt) => {
    setDescription(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleUpdateUser({ name, about: description });
  };

  return (
    <form
      id="form"
      className="popup__profile-edit"
      noValidate
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <input
          type="text"
          className="popup__input popup__profile-input"
          id="name"
          name="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          required
          minLength="2"
          maxLength="40"
        />
        <span id="name-error" className="popup__input-error-message">
          Error
        </span>

        <input
          type="text"
          className="popup__input popup__profile-input"
          id="detail"
          name="detail"
          placeholder="Detail"
          value={description}
          onChange={handleDescriptionChange}
          required
          minLength="2"
          maxLength="40"
        />
        <span id="detail-error" className="popup__input-error-message">
          Error
        </span>
        <button className="popup__button-submit" type="submit">
          Salvar
        </button>
      </fieldset>
    </form>
  );
}
