const Router = require('express');
const UserController = require('../controllers/user.controller');

const router = new Router();

router.get('/', UserController.getUsers);
router.get('/:userId', UserController.getUser);
router.post('/', UserController.createUser);
router.delete('/:userId', UserController.deleteUser);
router.put('/', UserController.updateUser);

module.exports = router;
