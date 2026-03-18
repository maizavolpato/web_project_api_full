const { Router } = require("express");
const {
  getCards,
  createCard,
  deleteCardbyId,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");
const auth = require("../../middlewares/auth");
const { validateCardBody, validateCardId } = require("../middlewares/validation");
const { celebrate } = require("celebrate");

const cardsRouter = Router();

cardsRouter.get("/", auth, getCards);

cardsRouter.post("/", auth, celebrate({
  body: validateCardBody
}), createCard);

cardsRouter.delete("/:id", auth, celebrate({
  params: validateCardId
}), deleteCardbyId);

cardsRouter.put("/:cardId/likes", auth, celebrate({
  params: validateCardId
}), likeCard);

cardsRouter.delete("/:cardId/likes", auth, celebrate({
  params: validateCardId
}), dislikeCard);

module.exports = { cardsRouter };
