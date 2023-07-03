const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
app.use((req, res, next) => {
  req.user = {
    _id: '649c05580a9fca7c4e40a9d1'
  };
  next();
});
app.use('/', bodyParser.json());
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use('*', function (req, res) {
  res.status(404).send({ message: 'Такой страницы нет' });
});

app.listen(3000, () => {
  console.log("сервер запущен");
})