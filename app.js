const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const auth = require('./middlewares/auth');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const errors = require('./middlewares/errors');

const NOT_FOUND_ERROR_CODE = 404;

const {
  register, login,
} = require('./controllers/users');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use('/', bodyParser.json());

app.post('/signup', register);
app.post('/signin', login);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use('*', (req, res) => {
  res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Такой страницы нет' });
});

app.use(errors);

app.listen(3000, () => {
  console.log('сервер запущен');
});
