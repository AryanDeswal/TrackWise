const path = require('path');

module.exports.renderHomePage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/users/homepage.html'));
};

module.exports.renderRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/users/register.html'));
};

module.exports.renderLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/users/login.html'));
};

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