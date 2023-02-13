const express = require('express');
const userAuth = require('../middlewares/auth')

const router = express.Router();

const userController = require('../controllers/userController');


router.post('/register', userController.register);

router.post('/login', userController.login);


module.exports = router;