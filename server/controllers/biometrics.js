const express = require('express');
const model = require('../models/biometrics');
const router = express.Router();

router
.get('/', (req, res,next) => {
    model.getAllBiometrics().then(list=>{
        const data = {
            data: list,
            total: list.length,
            isSuccess: true
        }
        res.send(data)
    })
    .catch(next)
})

.get('/search/:q', (req, res,next) => {
    model.searchBiometrics(req.params.q).then(list=>{
        const data = {
            data: list,
            total: list.length,
            isSuccess: false
        }
        res.send(data)
    })
    .catch(next)
})

.get('/:id', (req,res,next) => {
    const id = +req.params.id
    model.getBiometricById(id).then(entry=>{
        const data = {
            data: entry,
            total: 1,
            isSuccess: true
        }
        res.send(data)
    }).catch(next)
})

.post('/', (req,res,next) => {
    const biometric = req.body;
    model.addBiometric(biometric).then(result=>{
        const data = {
            data: result,
            total: 1,
            isSuccess: true
        }
    
        res.send(data);
    }).catch(next)
})

.patch('/:id', (req,res,next) => {
    const biometric = req.body;
    model.updateBiometric(biometric).then(result=>{
        const data = {
            data: result,
            total: 1,
            isSuccess: true
        }
        res.send(data)
    })
    .catch(next)
})

.delete('/:id', (req,res,next) => {
    const id = +req.params.id
    model.deleteBiometric(id).then(result=>{
        const data = {
            data: result,
            total: 1,
            isSuccess: true
        }
        res.send(data);
    }).catch(next)
})

module.exports = router