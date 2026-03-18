export default function Popup(props) {
  //children é o conteúdo de popup
  const { onClose, title, children } = props;

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  return (
    <section className="popup" id="popup-profile" onClick={onClose}>
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
        <button
          aria-label="Close Popup"
          id="button-close"
          className="popup__button-close"
          type="button"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        {children}
      </div>
    </section>
  );
}
