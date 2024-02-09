const path = require('path');

module.exports.renderHomePage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/owners/homepage.html'));
};

module.exports.renderRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/owners/register.html'));
};

module.exports.renderLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/owners/login.html'));
};