const User = require('../models/user');

const ERROR_CODE = 400;

const NOT_FOUND_ERROR_CODE = 404;

const GENERAL_ERROR_CODE = 500;

const createUser = (req, res) => {

  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при создании пользователя. ' });
      }
      else {
        return res.status(GENERAL_ERROR_CODE).send({ message: 'Произошла ошибка' });
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
        return res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при создании пользователя. ' });
      }
      else {
        return res.status(GENERAL_ERROR_CODE).send({ message: 'Произошла ошибка' });
      }
    })
}

const getUser = (req, res) => {

  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Пользователь по указанному _id не найден.' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные.' });
      }
      else {
        return res.status(GENERAL_ERROR_CODE).send({ message: 'Произошла ошибка' });
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
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Пользователь с указанным _id не найден. ' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      }
      else {
        return res.status(GENERAL_ERROR_CODE).send({ message: 'Произошла ошибка' });
      }
    })
}

const patchUserAvatar = (req, res) => {

  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Пользователь с указанным _id не найден. ' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
      }
      else {
        return res.status(GENERAL_ERROR_CODE).send({ message: 'Произошла ошибка' });
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