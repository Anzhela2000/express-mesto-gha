const User = require('../models/user');

const createUser = (req, res) => {

  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Карточка не найдена'});
      }
      else {
        return res.status(500).send(`message:Произошла ошибка ${err}`);
      }
    })
}

const getUsers = (req, res) => {

  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send("Переданы некорректные данные при создании пользователя.");
      }
      else {
        return res.status(500).send(`message:Произошла ошибка ${err}`);
      }
    })
}

const getUser = (req, res) => {

  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(404).send("Пользователь по указанному _id не найден.");
      }
      else {
        return res.status(500).send(`message:Произошла ошибка ${err}`);
      }
    })
}

const patchUser = (req, res) => {

  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Карточка не найдена'});
      }
      else {
        return res.status(500).send(`message:Произошла ошибка ${err}`);
      }
    })
}

const patchUserAvatar = (req, res) => {

  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar },{ new: true })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Карточка не найдена'});
      }
      else {
        return res.status(500).send(`message:Произошла ошибка ${err}`);
      }
    })
}

module.exports = {
  createUser,
  getUsers,
  getUser,
  patchUser,
  patchUserAvatar
}