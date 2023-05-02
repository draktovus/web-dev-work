const express = require("express");
const model = require("../models/workouts");
const userModel = require('../models/users')
const router = express.Router();

router
  .get("/", (req, res, next) => {
    model
      .getAll(+req.query.page, +req.query.pageSize)
      .then((list) => {
        const data = {
          data: list.items,
          total: list.total,
          isSuccess: true,
        };
        res.send(data);
      })
      .catch(next);
  })

  .get("/search/:q", (req, res, next) => {
    const term = req.params.q;
    model
      .search(term)
      .then((list) => {
        const data = {
          data: list.items,
          total: list.total,
          isSuccess: true,
        };

        res.send(data);
      })
      .catch(next);
  })

  .get("/:id", (req, res, next) => {
    const id = req.params.id;
    model
      .getById(id)
      //.getById(id, +req.query.page, +req.query.pageSize)
      .then((list) => {
        const data = {
          data: list.items,
          total: list.total,
          isSuccess: true,
        };
        res.send(data);
      })
      .catch(next);
  })

  .post("/", (req, res, next) => {
    const workout = req.body;
    //see if userID belongs to a valid user, if it is, add the workout.
    userModel.getById(workout.userID).then(user=>{
      model
      .add(workout)
      .then((item) => {
        const data = {
          data: item,
          total: 1,
          isSuccess: true,
        };
        res.send(data);
      })
      .catch(next);
    }).catch(next)
  })

  .patch("/:id", (req, res, next) => {
    const workout = req.body;
    model
      .update(workout)
      .then((result) => {
        const data = {
          data: result,
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
      .deleteItem(req.body._id)
      .then((result) => {
        const data = {
          data: result,
          total: 1,
          isSuccess: true,
        };
        res.send(data);
      })
      .catch(next);
  });

module.exports = router;
