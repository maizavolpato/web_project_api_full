import { useEffect, useState, useContext } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import Header from "./header/Header";
import Main from "./main/Main";
import Footer from "./footer/Footer";
import Register from "./main/components/register/Register";
import Login from "./main/components/login/Login";
import ProtectedRoute from "./main/components/protectedroute/ProtectedRoute"
import ImagePopup from "./main/components/imagePopup/ImagePopup";
import { api } from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { register, login, checkToken, getUserInfo } from '../components/auth'
import InfoTooltip from './main/components/infotooltip/InfoTooltip'

function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState({
    isOpen: false,
    title: "",
    children: null,
  });  
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [infoTooltip, setInfoTooltip] = useState({
    isOpen: false,
    isSuccess: false,
    message: ''
  })
  const [email, setEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if(!token) {
      return;
    }
    checkToken(token)
    .then(() => {
      return api.getUserInfo(token)
      
    })
    .then((userData) => {
      setCurrentUser(userData);
      setEmail(userData.email);
      setIsloggedIn(true);
    })
    .catch((err) => {
      console.log(err);
      localStorage.removeItem('jwt')
    })
  }, [])

  const handleRegister = (email, password) => {
    return register(email, password)
    .then((data) => {
      setInfoTooltip({
        isOpen: true,
        isSuccess: true,
        message: 'Vitória! Você se registrou com sucesso.'
         })
      return data
    
    })
    .catch((err) => {
      setInfoTooltip({
        isOpen: true,
        isSuccess: false,
        message: 'Ops, algo saiu errado! Por favor, tente novamente.'
      })
      console.log('Erro no registro:', err)
      throw err
    })
  }

  const handleLogin = (userData) => {
    return login(userData.email, userData.password)
    .then((token) => {
      localStorage.setItem('jwt', token)
      return checkToken(token)
    })
    .then(() => {
      setIsloggedIn(true)
      return getUserInfo(localStorage.getItem('jwt'))
    })
    .then((userData) => {
      setCurrentUser(userData)
      return api.getUserInfo()
    }).then((userData) => {
      setCurrentUser((prev)=> {
        return { ...prev, ...userData }
      })
      setIsloggedIn(true)
      navigate('/')
    })
    .catch((err) => {
      setInfoTooltip({
        isOpen: true,
        isSuccess: false,
        message: 'Ops, algo saiu errado! Por favor, tente novamente.'
        })
      console.log('Usuário não registrado')
      throw err;
    })
  }

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
      <Header isLoggedIn={isLoggedIn}/>
        <Routes>
          <Route path="/signup" element={<Register handleRegister={handleRegister}/>} />
          <Route path="/signin" element={<Login handleLogin={handleLogin}/>} />
          <Route path="/" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
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
            </ProtectedRoute>
          } /> 
        </Routes>
        <InfoTooltip
        isOpen={infoTooltip.isOpen}
        onClose={() =>
          setInfoTooltip(prev => ({
            ...prev,
            isOpen: false
          }))
        }
        isSuccess={infoTooltip.isSuccess}
        message={infoTooltip.message}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
