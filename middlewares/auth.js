const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    res
      .status(401)
      .send('authorization');
  }

  const token = authorization;
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload;

  next();
}

module.exports = auth;
