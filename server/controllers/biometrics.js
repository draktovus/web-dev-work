const express = require('express');
const model = require('../models/biometrics');
const router = express.Router();

router
.get('/', (req, res) => {
    const list = model.getAllBiometrics();
    const data = {
        data: list,
        total: list.length,
        isSuccess: true
    }
    res.send(data)
})

.get('/search/:q', (req, res) => {
    const data = {
        data: "failed to search",
        total: 1,
        isSuccess: false
    }
    res.send(data)
})

.get('/:id', (req,res) => {
    const id = +req.params.id
    const biometric = model.getBiometricById(id);
    const data = {
        data: biometric,
        total: 1,
        isSuccess: true
    }
    res.send(data)
})

.post('/', (req,res) => {
    const biometric = req.body;
    model.addBiometric(biometric);
    const data = {
        data: biometric,
        total: 1,
        isSuccess: true
    }

    res.send(data);
})

.patch('/:id', (req,res) => {
    const biometric = req.body;
    model.updateBiometric(biometric);

    const data = {
        data: biometric,
        total: 1,
        isSuccess: true
    }
    res.send(data)
})

.delete('/:id', (req,res) => {
    const id = +req.params.id
    model.deleteBiometric(id);
    const data = {
        data: id,
        total: 1,
        isSuccess: true
    }
    res.send(data);
})

module.exports = router