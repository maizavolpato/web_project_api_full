import ImagePopup from "../imagePopup/ImagePopup.jsx";

export default function Card(props) {
  const { name, link, isLiked, _id } = props.card;
  const { onImageClick, onDeleteCard, onCardLike } = props;
  const imageComponent = {
    children: <ImagePopup card={props.card} />,
  };

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button-active" : ""
  }`;

  function handleCardDelete() {
    onDeleteCard(_id);
  }

  function handleLikeClick() {
    onCardLike(props.card);
  }

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => onImageClick(props.card)}
      />
      <button
        aria-label="Delete card"
        className="card__delete-button"
        type="button"
        onClick={handleCardDelete}
      />
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Like card"
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        />
      </div>
    </li>
  );
}
