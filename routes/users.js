const router = require('express').Router();

const {createUser, getUsers, getUser, patchUser, patchUserAvatar} = require('../controllers/users');

router.post('/', createUser );
router.get('/', getUsers);
router.get('/:userId', getUser);
router.patch('/me', patchUser);
router.patch('/me/avatar', patchUserAvatar);


module.exports = router;