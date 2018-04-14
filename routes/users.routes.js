const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users.controller');

router.post('/', usersController.create);
router.get('/', usersController.list);
router.put('/:id', /* secureMiddleware.isAuthenticated */ usersController.edit);
router.delete('/:id', /*secureMiddleware.isAuthenticated,*/ usersController.delete);

module.exports = router;