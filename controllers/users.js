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
        return res.status(500).send({ message: 'Карточка не найдена'});
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
        return res.status(400).send({ message: 'Карточка не найдена'});
      }
      else {
        return res.status(500).send({ message: 'Карточка не найдена'});
      }
    })
}

const getUser = (req, res) => {

  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (user) return res.send({ user });
      return res.status(404).send({ message: 'Не найдено'});
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Не найдено'});
      }
      else {
        return res.status(500).send({ message: 'Некорректно'});
      }
    })
}

const patchUser = (req, res) => {

  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about },{ new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Не найдено id'});
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Карточка не найдена'});
      }
      else {
        return res.status(500).send({ message: 'Карточка не найдена'});
      }
    })
}

const patchUserAvatar = (req, res) => {

  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar },{ new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Не найдено id'});
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Карточка не найдена'});
      }
      else {
        return res.status(500).send({ message: 'Карточка не найдена'});
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