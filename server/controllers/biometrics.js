const express = require("express");
const model = require("../models/biometrics");
const router = express.Router();

router
  .get("/", (req, res, next) => {
    model
      .getAll()
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
    model
      .search(req.params.q)
      .then((list) => {
        const data = {
          data: list.items,
          total: list.total,
          isSuccess: false,
        };
        res.send(data);
      })
      .catch(next);
  })

  .get("/:id", (req, res, next) => {
    const id = +req.params.id;
    model
      .getById(id)
      .then((entry) => {
        const data = {
          data: entry,
          total: 1,
          isSuccess: true,
        };
        res.send(data);
      })
      .catch(next);
  })

  .post("/", (req, res, next) => {
    const biometric = req.body;
    model
      .add(biometric)
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

  .patch("/:id", (req, res, next) => {
    const biometric = req.body;
    model
      .update(biometric)
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
      .deleteItem(req.body)
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
