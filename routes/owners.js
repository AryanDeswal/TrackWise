const express = require('express');
const router = express.Router();
const users = require('../controllers/owners.js');


router.route('/register')
.get(users.renderRegisterPage);

router.route('/login')
.get(users.renderLoginPage);

router.route('/:ownername')
    .get(users.renderHomePage);

module.exports = router;