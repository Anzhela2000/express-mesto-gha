const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const NOT_FOUND_ERROR_CODE = 404;

const app = express();

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.use((req, res, next) => {
  req.user = {
    _id: '649c05580a9fca7c4e40a9d1',
  };
  next();
});
app.use('/', bodyParser.json());
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use('*', (req, res) => {
  res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Такой страницы нет' });
});

app.listen(3000, () => {
  console.log('сервер запущен');
});
