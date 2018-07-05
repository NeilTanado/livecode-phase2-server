const express = require('express');
const router = express.Router();
const Controller = require('../controller/userController');

router.post('/createuser', Controller.createUser);
router.post('/login', Controller.signin);

module.exports = router;
