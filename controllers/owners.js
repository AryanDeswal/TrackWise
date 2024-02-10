const path = require('path');
const bcrypt = require('bcrypt');
const owners = require('../ownerList.js')

module.exports.renderHomePage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/owners/homepage.html'));
};

module.exports.register = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        owners.registerOwner({ name, email, password: hashedPassword });
        res.status(201).redirect('/owner/login');;
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    owner = owners.checkOwner(email);
    if (owner && await bcrypt.compare(password, owner.password)) {
        req.session.ownerId = owner.email;
        res.redirect('/owner/ram');
    } else {
        res.status(401).send('Invalid username or password');
    }
};

module.exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.status(500).send('Error logging out');
        } else {
            res.redirect('/');
        }
    });
}

module.exports.renderRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/owners/register.html'));
};

module.exports.renderLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/owners/login.html'));
};

module.exports.renderLocations = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/owners/monitor.html'));
};