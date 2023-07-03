const User = require('../models/user');

const createUser = (req, res) => {

  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя. ' });
      }
      else {
        return res.status(500).send({ message: 'Произошла ошибка' });
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
        return res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя. ' });
      }
      else {
        return res.status(500).send({ message: 'Произошла ошибка' });
      }
    })
}

const getUser = (req, res) => {

  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь по указанному _id не найден.' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Переданы некорректные данные.' });
      }
      else {
        return res.status(500).send({ message: 'Произошла ошибка' });
      }
    })
}

const patchUser = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(userId,
    { name, about },
    { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь с указанным _id не найден. ' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      }
      else {
        return res.status(500).send({ message: 'Произошла ошибка' });
      }
    })
}

const patchUserAvatar = (req, res) => {

  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь с указанным _id не найден. ' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
      }
      else {
        return res.status(500).send({ message: 'Произошла ошибка' });
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