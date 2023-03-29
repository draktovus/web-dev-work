const express= require('express')
const model = require('../models/workouts')
const router = express.Router()

router
.get('/', (req, res) => {
    const list = model.getWorkouts();
    res.send(list)
})

.get('/search/:q', (req, res) => {
    const term = req.params.q;
    console.log(term)
    const list = model.searchWorkout(term);
    res.send(list)
})

.get('/:id', (req,res) => {
    const id = +req.params.id
    const workouts = model.getWorkoutsByUserId(id);
    res.send(workouts)
})

.post('/', (req,res) => {
    const workout = req.body;

    console.log(req.query)
    console.log(req.headers)
    console.log(req.body)

    model.addWorkout(workout);
    res.send(workout);
})

.patch('/:id', (req,res) => {
    const workout = req.body;
    model.updateWorkout(workout);
    res.send(workout)
})

.delete('/:id', (req,res) => {
    const id = +req.params.id
    model.deleteWorkout(id);
    res.send(id.toString());
})

module.exports = router