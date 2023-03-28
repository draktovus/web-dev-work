const express = require('express');
const model = require('../models/users');
const router = express.Router();

router
.get('/', (req, res) => {
    const list = model.getUsers();
    res.send(list)
})

.get('/search/:q', (req, res) => {
    const term = req.params.q;
    console.log(term)
    const list = model.searchUser(term);
    res.send(list)
})

.get('/:id', (req,res) => {
    const id = +req.params.id
    const user = model.getUserById(id);
    res.send(user)
})

.post('/', (req,res) => {
    const user = req.body;

    console.log(req.query)
    console.log(req.headers)
    console.log(req.body)

    model.addUser(user);
    res.send(user);
})

.patch('/:id', (req,res) => {
    const user = req.body;
    model.updateUser(user);
    res.send(user)
})

.delete('/:id', (req,res) => {
    const id = +req.params.id
    model.deleteUser(id);
    res.send(id.toString());
})

module.exports = router