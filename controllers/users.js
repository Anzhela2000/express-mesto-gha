const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../middlewares/notFoundError');
const ValidationError = require('../middlewares/ValidationError');
const GeneralErrorCode = require('../middlewares/GeneralErrorCode');
const User = require('../models/user');

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.status(200).cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true }).send({ jwt: token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};

const createUser = (req, res, next) => {
  const {
    email, name, about, avatar,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create(
      {
        name, about, avatar, email, password: hash,
      },
    ))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError('Переданы некорректные данные при создании пользователя. '));
      } else {
        next(new GeneralErrorCode('Произошла ошибка'));
      }
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      next(new GeneralErrorCode('Произошла ошибка'));
    });
};

const getUser = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new ValidationError('Переданы некорректные данные.'));
      } else {
        next(new GeneralErrorCode('Произошла ошибка'));
      }
    });
};

const patchUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError('Переданы некорректные данные при обновлении профиля.'));
      } else {
        next(new GeneralErrorCode('Произошла ошибка'));
      }
    });
};

const patchUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError('Переданы некорректные данные при обновлении аватара.'));
      } else {
        next(new GeneralErrorCode('Произошла ошибка'));
      }
    });
};

const getMe = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new ValidationError('Переданы некорректные данные.'));
      } else {
        next(new GeneralErrorCode('Произошла ошибка'));
      }
    });
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  patchUser,
  patchUserAvatar,
  login,
  getMe,
};
