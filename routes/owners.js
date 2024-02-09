const express = require('express');
const router = express.Router();
const owners = require('../controllers/owners.js');


router.route('/register')
    .get(owners.renderRegisterPage)
    .post(owners.register);

router.route('/login')
    .get(owners.renderLoginPage)
    .post(owners.login);

router.route('/:ownername')
    .get(owners.renderHomePage);

module.exports = router;