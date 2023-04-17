const data = require('../data/users.json');

function getUsers(){
    return data.users;
}

function getUserById(id){
    return data.users.find(user => user.id === id);
}

function getUserByName(name){
    return data.users.find(user => user.name === name);
}

function addUser(user){
    user.id = data.users.length + 1;
    data.users.push(product);
}

function updateUser(user){
    const index = data.users.findIndex(u => u.id === user.id);
    data.users[index] = user;
}

function deleteUser(user){
    const index = data.users.findIndex(u => u.id === user.id);
    data.users.splice(index, 1);
}

//search function for product in json
function searchUser(searchTerm){
    const users = data.users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return users;
}

module.exports = {
    getUsers,
    getUserById,
    getUserByName,
    addUser,
    updateUser,
    deleteUser,
    searchUser,
}