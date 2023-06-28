const Card = require('../models/card');

const createCard = (req, res) => {

  const { name, link } = req.body;
  const userId = req.user._id;

  Card.create({ name, link, owner: userId })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send("Переданы некорректные данные при создании карточки.");
      }
      else {
        return res.status(500).send("Произошла ошибка");
      }
    })
}

const getCards = (req, res) => {

  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send("Переданы некорректные данные при создании карточки.");
      }
      else {
        return res.status(500).send("Произошла ошибка");
      }
    })
}

const deleteCard = (req, res) => {

  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        return res.status('Карточка с указанным _id не найдена.');
      }
      else {
        res.send(card);
      }
    })
    .catch(() => {
      return res.status(500).send("Произошла ошибка");
    })
}

const putLikeCard = (req, res) => {

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(404).send(`Произошла ошибка: ${err.name} Передан несуществующий _id карточки.`);
      }
      else if (err.name === 'ValidationError') {
        return res.status(400).send(`Произошла ошибка: ${err.name} Переданы некорректные данные для постановки/снятии лайка.`);
      }
      else {
        return res.status(500).send("Произошла ошибка");
      }
    })
}

const deleteLikeCard = (req, res) => {

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      res.send({ data: card })
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(404).send(`Произошла ошибка: ${err.name} Передан несуществующий _id карточки.`);
      }
      else if (err.name === 'ValidationError') {
        return res.status(400).send("Переданы некорректные данные для постановки/снятии лайка.");
      }
      else {
        return res.status(500).send("Произошла ошибка");
      }
    })
}

module.exports = {
  createCard,
  getCards,
  deleteCard,
  putLikeCard,
  deleteLikeCard
}
