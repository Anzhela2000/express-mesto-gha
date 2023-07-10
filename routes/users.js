const router = require('express').Router();
const celebrates = require('../middlewares/celebrate');

const {
  getUsers, getUser, patchUser, patchUserAvatar,
} = require('../controllers/users');

router.get('/', celebrates.userSchema, getUsers);
router.get('/:userId', celebrates.userSchema, getUser);
router.patch('/me', celebrates.userSchema, patchUser);
router.get('/me', celebrates.userSchema, patchUser);
router.patch('/me/avatar', celebrates.userSchema, patchUserAvatar);

module.exports = router;
