const data = require('../data/workouts.json')

//Create, Read, Update, Delete

function getWorkouts(){
    return data.workouts;
}

function getWorkoutByUserId(id){
    return data.workouts.find((workout)=> workout.userID === id)
}

function addWorkout(workout){
    workout.UID = data.workouts.length + 1
    data.workouts.push(workout)
}

function updateWorkout(workout){
    const index = data.workouts.findIndex(w => w.userID === workout.userID);
    data.workouts[index] = workout;
}

function deleteWorkout(workout){
    const index = data.workouts.findIndex(w => w.id === user.id);
    data.workouts.splice(index, 1);
}

function searchWorkout(searchTerm){
    const workout = data.workouts.filter(workout => workout.content.toLowerCase().includes(searchTerm.toLowerCase()));
    return workout;
}

module.exports = {
    getWorkouts,
    getWorkoutByUserId,
    addWorkout,
    updateWorkout,
    deleteWorkout,
    searchWorkout
}