const NotFoundError = require("../errors/NotFoundError");
const ServerError = require('../errors/ServerError')
const cards = require("../models/cards");

async function getCards(req, res, next) {
  try {
    const cardsData = await cards.find({}).populate("owner");
    return res.status(200).json(cardsData);
  } catch (err) {
    const { name } = err;
    if (name === "ValidationError") {
      return next(new ValidationError("Invalid data"));
    }
    if (name === "NotFound") {
      return next(new NotFoundError("Cards not found"));
    }
    return next(new ServerError("Internal Server Error"));
  }
}

async function createCard(req, res, next) {
  const { name, link } = req.body;

  try {
    const cardCreated = await cards.create({
      name,
      link,
      owner: req.user._id,
    });
    return res.status(201).json(cardCreated);
  } catch (err) {
    console.log("Error:", err);
    return next(new ServerError("Internal Server Error"));
  }
}

async function deleteCardbyId(req, res, next) {
  try {
    const { id } = req.params;
    const card = await cards.findById(id)
    if (!card) {
      return res.status(404).json({ message: 'Cartão não encontrado' })
    }
    if (card.owner.toString() !== req.user._id) {
      return res.status(403).json({ message: 'Acesso negado'})
    }
    await card.deleteOne()
  
    return res.status(204).send();

  } catch (err) {
    return next(new ServerError("Internal Server Error"));
  }
}

async function likeCard(req, res, next) {
  try {
    const card = await cards.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).orFail(() => {
      throw new NotFoundError("Card not found");
  })
    return res.status(200).json(card);
  } catch (err) {
    console.log("Error:", err);
    return next(new ServerError("Internal Server Error"));
  }
}

async function dislikeCard(req, res, next) {
  try {
    const card = await cards
      .findByIdAndUpdate(
        req.params.cardId,
        { $pull: { likes: req.user._id } },
        { new: true },
      )
      .orFail(() => {
        throw new NotFoundError("Card not found");
      });

    return res.status(200).json(card);
  } catch (err) {
    console.log("Error:", err);
    return next(new ServerError("Internal Server Error"));
  }
}

module.exports = {
  getCards,
  createCard,
  deleteCardbyId,
  likeCard,
  dislikeCard,
};
