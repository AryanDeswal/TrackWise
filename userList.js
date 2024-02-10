const users = [];

module.exports.registerUser = (user) => {
    users.push(user);
}

module.exports.checkUser = (email) => {
    const user = users.find(u => u.email === email);
    return user;
}
