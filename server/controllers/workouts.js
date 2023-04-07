const express= require('express')
const model = require('../models/workouts')
const router = express.Router()

router
.get('/', (req, res) => {
    const list = model.getWorkouts();
    const data = {
        data: list,
        total: list.length,
        isSuccess: true
    }
    res.send(data)
})

.get('/search/:q', (req, res) => {
    const term = req.params.q;
    console.log(term)
    const list = model.searchWorkout(term);

    const data = {
        data: list,
        total: list.length,
        isSuccess: true
    }

    res.send(data)
})

.get('/:id', (req,res) => {
    const id = +req.params.id
    const workouts = model.getWorkoutsByUserId(id);
    const data = {
        data: workouts,
        total: workouts.length,
        isSuccess: true
    }
    res.send(data)
})

.post('/', (req,res) => {
    const workout = req.body;

    console.log(req.query)
    console.log(req.headers) 
    console.log(req.body)

    model.addWorkout(workout);
    const data = {
        data: workout,
        total: 1,
        isSuccess: true
    }
    res.send(data);
})

.patch('/:id', (req,res) => {
    const workout = req.body;
    model.updateWorkout(workout);
    const data = {
        data: workout,
        total: 1,
        isSuccess: true
    }
    res.send(data)
})

.delete('/:id', (req,res) => {
    const id = +req.params.id
    model.deleteWorkout(id);
    const data = {
        data: id,
        total: 1,
        isSuccess: true
    }
    res.send(data);
})

module.exports = router