const mongoose = require('mongoose');
const Card = require('../models/card');

const ERROR_CODE = 400;

const NOT_FOUND_ERROR_CODE = 404;

const GENERAL_ERROR_CODE = 500;

const createCard = (req, res) => {
  const { name, link } = req.body;
  const userId = req.user._id;

  Card.create({ name, link, owner: userId })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при создании карточки.' });
      } else {
        res.status(GENERAL_ERROR_CODE).send({ message: 'Произошла ошибка.' });
      }
    });
};

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      res.status(GENERAL_ERROR_CODE).send({ message: 'Произошла ошибка.' });
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: 'Карточка с указанным _id не найдена.' });
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(ERROR_CODE).send({ message: 'Некорректные данные' });
      } else {
        res.status(GENERAL_ERROR_CODE).send({ message: 'Произошла ошибка.' });
      }
    });
};

const putLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Передан несуществующий _id карточки.' });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные для постановки/снятии лайка. ' });
      } else {
        res.status(GENERAL_ERROR_CODE).send({ message: 'Произошла ошибка.' });
      }
    });
};

const deleteLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Передан несуществующий _id карточки.' });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные для постановки/снятии лайка. ' });
      } else {
        res.status(GENERAL_ERROR_CODE).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  putLikeCard,
  deleteLikeCard,
};
