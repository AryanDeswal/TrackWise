const path = require('path');

module.exports.renderHomePage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/owners/homepage.html'));
};

module.exports.register = (req, res) => {
    const { email, username, password } = req.body;
    console.log(email, username, password);
    res.redirect('/owner/ram');
}

module.exports.login = (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    res.redirect('/owner/ram');
};

module.exports.renderRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/owners/register.html'));
};

module.exports.renderLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/owners/login.html'));
};