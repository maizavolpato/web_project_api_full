import { useState, useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function NewCard() {
  const { handleAddPlaceSubmit } = useContext(CurrentUserContext);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const handleTitleChange = (evt) => {
    setTitle(evt.target.value);
  };

  const handleImageChange = (evt) => {
    setImage(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    handleAddPlaceSubmit({
      name: title,
      link: image,
    });
  };
  return (
    <form
      id="form"
      className="popup__elements-edit"
      noValidate
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <input
          type="text"
          className="popup__input popup__elements-input"
          id="title"
          name="title"
          placeholder="Título"
          minLength="2"
          maxLength="30"
          required
          value={title}
          onChange={handleTitleChange}
        />
        <span id="title-error" className="popup__input-error-message">
          Error
        </span>
        <input
          type="url"
          className="popup__input popup__elements-input"
          id="image"
          name="image"
          placeholder="Link de Imagem"
          required
          value={image}
          onChange={handleImageChange}
        />
        <span id="image-error" className="popup__input-error-message">
          Error
        </span>
        <button className="popup__button-submit" type="submit">
          Salvar
        </button>
      </fieldset>
    </form>
  );
}
