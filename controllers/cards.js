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
        return res.status(400).send({ message: 'Карточка не найдена'});
      }
      else {
        return res.status(500).send(`message:Произошла ошибка ${err}"`);
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
        return res.status(400).send({ message: 'Карточка не найдена'});
      }
      else {
       return res.status(500).send(`message:Произошла ошибка ${err}"`);
      }
    })
}

const deleteCard = (req, res) => {

  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        res
      .status(404)
      .send({ message: 'Невалидные данные' });
    return;
      }
      else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Карточка не найдена'});
      }
      else {
       return res.status(500).send({ message: '500'});
      }
    })
}

const putLikeCard = (req, res) => {

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
  .then((card) => {
    if (!card) {
      return res.status(404).send({ message: 'Не найдено id'});
    }
    return res.send(card);
  })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Не верный id'});
      }
      else {
       return res.status(500).send({ message: 'Произошла ошибка'});
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
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError'){
        return res.status(404).send({ message: 'Удаление лайка у карточки с несуществующим в БД id'});
      }
      else {
       return res.status(500).send({ message: 'Произошла ошибка'});
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
