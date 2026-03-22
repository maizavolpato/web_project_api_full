export default function ImagePopup(props) {
  const { card, onClose } = props;

  return (
    <div className="popup" onClick={onClose}>
      <div
        className="popup__content popup__content_content_image"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Close modal"
          className="popup__close"
          type="button"
          onClick={onClose}
        />
        <img className="popup__image" src={card.link} alt={card.name} />
        <h3 className="popup__image-title">{card.name}</h3>
      </div>
    </div>
  );
}
