const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/session.controller');


router.get('/',  sessionController.create);

module.exports = router;