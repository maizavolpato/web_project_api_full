import { useEffect, useState, useContext } from "react";
import Header from "./header/Header";
import Main from "./main/Main";
import Footer from "./footer/Footer";
import ImagePopup from "./main/components/imagePopup/ImagePopup";
import { api } from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState({ isOpen: false, name: "" });
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleUpdateUser = (userData) => {
    (async () => {
      api
        .updateUserInfo(userData)
        .then((updateUser) => {
          setCurrentUser(updateUser);
          handleClosePopup();
        })
        .catch((err) => console.log(err));
    })();
  };

  const handleUpdateAvatar = (data) => {
    (async () => {
      api
        .updateProfilePhoto(data.avatar)
        .then((updateAvatar) => {
          setCurrentUser(updateAvatar);
          handleClosePopup();
        })
        .catch((err) => console.log(err));
    })();
  };

  useEffect(() => {
    api
      .getInitialCards()
      .then((cardData) => {
        setCards(cardData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  async function handleCardDelete(cardId) {
    try {
      await api.deleteCard(cardId);

      setCards((currentCards) =>
        currentCards.filter((card) => card._id !== cardId)
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function handleCardLike(card) {
    const isLiked = card.isLiked;

    try {
      let newCard;
      if (isLiked) {
        console.log(card);
        newCard = await api.likeCardOff(card._id);
      } else {
        newCard = await api.likeCardOn(card._id);
      }

      setCards((state) =>
        state.map((currentCard) =>
          currentCard._id === card._id ? newCard : currentCard
        )
      );
    } catch (err) {
      console.log(err);
    }
  }

  const handleAddPlaceSubmit = (newCardData) => {
    (async () => {
      api
        .updateCardInfo(newCardData)
        .then((newCard) => {
          setCards([newCard, ...cards]);
          handleClosePopup();
        })
        .catch((err) => console.log(err));
    })();
  };

  function handleImageClick(card) {
    const imagePopup = {
      title: null, // ImagePopup não tem título
      children: <ImagePopup card={card} onClose={handleClosePopup} />,
    };
    handleOpenPopup(imagePopup);
  }

  const handleOpenPopup = (popupData) => {
    setPopup({ isOpen: true, ...popupData });
  };

  const handleClosePopup = () => {
    setPopup({ isOpen: false, title: "", children: null });
  };

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleAddPlaceSubmit,
      }}
    >
      <div className="page">
        <Header />
        <Main
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          popup={popup}
          cards={cards}
          onCardLike={handleCardLike}
          onDeleteCard={handleCardDelete}
          onImageClick={handleImageClick}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
