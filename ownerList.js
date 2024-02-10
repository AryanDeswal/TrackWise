const owners = [];

module.exports.registerOwner = (owner) => {
    owners.push(owner);
}

module.exports.checkOwner = (email) => {
    const owner = owners.find(u => u.email === email);
    return owner;
}
