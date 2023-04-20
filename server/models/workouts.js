const data = require("../data/workouts.json");
const { connect, ObjectId } = require("./mongo");

const COLLECTION_NAME = "workouts";

//Create, Read, Update, Delete

async function collection() {
  const db = await connect();
  return db.collection(COLLECTION_NAME);
}

async function getWorkouts() {
  const col = await collection();
  const items = await col.find().toArray();
  return items;
}

async function getWorkoutsByUserId(id) {
  const col = await collection();
  const items = await col.find({ userID: id }).toArray();

  return items;
}

async function addWorkout(workout) {
  const col = await collection();
  const result = await col.insertOne(workout);
  return result;
}

async function updateWorkout(workout) {
  const col = await collection();
  const result = await col.findOneAndUpdate({ _id: workout._id }, workout);

  return result;
}

async function deleteWorkout(workout) {
  const col = await collection();
  const result = await col.findOneAndDelete({ _id: workout._id });
  return result;
}

async function searchWorkout(searchTerm) {
  const col = await collection();
  const items = await col.aggregate([
    {
      $search: {
        index: "searchWorkouts",
        text: {
          query: searchTerm,
          path: {
            wildcard: "*",
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        userID: 1,
        content: 1,
        score: { $meta: "searchScore" },
      },
    },
  ]);
  return items.toArray();
}

module.exports = {
  getWorkouts,
  getWorkoutsByUserId,
  addWorkout,
  updateWorkout,
  deleteWorkout,
  searchWorkout,
};
