const path = require('path');
const bcrypt = require('bcrypt');
const users = require('../userList.js')

module.exports.renderHomePage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/users/homepage.html'));
};

module.exports.renderRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/users/register.html'));
};

module.exports.register = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        users.registerUser({ name, email, password: hashedPassword });
        res.status(201).redirect('/user/login');;
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

module.exports.renderLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/users/login.html'));
};

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    user = users.checkUser(email);
    if (user && await bcrypt.compare(password, user.password)) {
        req.session.userId = user.email;
        res.redirect('/user/pawan');
    } else {
        res.status(401).send('Invalid username or password');
    }
}

module.exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.status(500).send('Error logging out');
        } else {
            res.redirect('/');
        }
    });
}

module.exports.renderLocation = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/users/location.html'));
};

module.exports.acceptLocationCoordinates = (req, res) => {
    const username = req.params.username;
    const { latitude, longitude, accuracy } = req.body;

    if (latitude === undefined || longitude === undefined || accuracy === undefined) {
        return res.status(400).json({ error: 'Latitude, longitude, and accuracy are required.' });
    }

    console.log(`Received location data for user ${username}:`);
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}, Accuracy: ${accuracy}`);

    res.json({ message: 'Location data received successfull.' });
};