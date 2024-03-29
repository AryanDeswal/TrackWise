if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}
const bodyParser = require('body-parser')
const express = require("express");
const ejsMate = require('ejs-mate');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 3000;

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));


const userRoutes = require("./routes/users.js");
const ownerRoutes = require("./routes/owners.js");

// user routes
app.use('/user', userRoutes);

// owner routes
app.use('/owner', ownerRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '/views/homepage.html'));
});

app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/404.html'));
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});