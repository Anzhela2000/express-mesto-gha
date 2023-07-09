const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const auth = require('./middlewares/auth');

const NOT_FOUND_ERROR_CODE = 404;

const app = express();

const {
  createUser, login,
} = require('./controllers/users');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.use('/', bodyParser.json());
app.post('/signup', createUser);
app.post('/signin', login);

//app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use('*', (req, res) => {
  res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Такой страницы нет' });
});

app.listen(3000, () => {
  console.log('сервер запущен');
});
