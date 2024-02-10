const express = require('express');
const router = express.Router();
const owners = require('../controllers/owners.js');

const requireAuth = (req, res, next) => {
    if (req.session && req.session.ownerId) {
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};

router.route('/register')
    .get(owners.renderRegisterPage)
    .post(owners.register);

router.route('/login')
    .get(owners.renderLoginPage)
    .post(owners.login);

router.route('/logout')
    .get(owners.logout);

router.route('/:ownername')
    .get(requireAuth, owners.renderHomePage);

router.route('/:ownername/monitor')
    .get(requireAuth, owners.renderLocations)

module.exports = router;