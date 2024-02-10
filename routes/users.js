const express = require('express');
const router = express.Router();
const users = require('../controllers/users.js');

const requireAuth = (req, res, next) => {
    if (req.session && req.session.userId) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};

router.route('/register')
    .get(users.renderRegisterPage)
    .post(users.register);

router.route('/login')
    .get(users.renderLoginPage)
    .post(users.login);

router.route('/logout')
    .get(users.logout);

router.route('/:username')
    .get(requireAuth, users.renderHomePage);

router.route('/:username/location')
    .get(requireAuth, users.renderLocation)
    .post(requireAuth, users.acceptLocationCoordinates);

module.exports = router;