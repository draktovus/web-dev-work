const express = require("express");
const model = require("../models/workouts");
const router = express.Router();

router
  .get("/", (req, res, next) => {
    model
      .getWorkouts()
      .then((list) => {
        const data = {
          data: list,
          total: list.length,
          isSuccess: true,
        };
        res.send(data);
      })
      .catch(next);
  })

  .get("/search/:q", (req, res, next) => {
    const term = req.params.q;
    console.log(term);
    model
      .searchWorkout(term)
      .then((list) => {
        const data = {
          data: list,
          total: list.length,
          isSuccess: true,
        };

        res.send(data);
      })
      .catch(next);
  })

  .get("/:id", (req, res, next) => {
    const id = +req.params.id;
    model
      .getWorkoutsByUserId(id)
      .then((list) => {
        const data = {
          data: list,
          total: list.length,
          isSuccess: true,
        };
        res.send(data);
      })
      .catch(next);
  })

  .post("/", (req, res, next) => {
    const workout = req.body;
    model
      .addWorkout(workout)
      .then((item) => {
        const data = {
          data: item,
          total: 1,
          isSuccess: true,
        };
        res.send(data);
      })
      .catch(next);
  })

  .patch("/:id", (req, res, next) => {
    const workout = req.body;
    model
      .updateWorkout(workout)
      .then((result) => {
        const data = {
          data: workout,
          total: 1,
          isSuccess: true,
        };
        res.send(data);
      })
      .catch(next);
  })

  .delete("/:id", (req, res, next) => {
    const id = +req.params.id;
    model
      .deleteWorkout(id)
      .then((result) => {
        const data = {
          data: id,
          total: 1,
          isSuccess: true,
        };
        res.send(data);
      })
      .catch(next);
  });

module.exports = router;
