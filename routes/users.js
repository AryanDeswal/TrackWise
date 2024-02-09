const express = require('express');
const router = express.Router();
const users = require('../controllers/users.js');

router.route('/:username')
    .get(users.renderHomePage);

router.route('/:username/register')
    .get(users.renderRegisterPage);

router.route('/:username/login')
    .get(users.renderLoginPage);

router.route('/:username/location')
    .get(users.renderLocation)
    .post(users.acceptLocationCoordinates);

module.exports = router;