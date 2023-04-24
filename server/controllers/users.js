const express = require("express");
const model = require("../models/users");
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
    const id = +req.params.id;
    model
      .getById(id)
      .then((list) => {
        const data = {
          data: list,
          total: 1,
          isSuccess: true,
        };
        res.send(data);
      })
      .catch(next);
  })

  .post("/login", (req, res, next) => {
    const user = req.body;
    model.getByName(user.name).then(
      (userServer)=>{
        if (userServer !== undefined) {
          if (userServer.password === user.password) {
            const data = {
              data: userServer,
              total: 1,
              isSuccess: true,
            };
            res.send(data);
            return;
          }
          next(new Error("Username or password didnt match."));
        } else {
          next(new Error("Bad login"));
        }
      }
    )
    .catch(next)
  })

  .post("/", (req, res, next) => {
    const user = req.body;
    model
      .add(user)
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
    const user = req.body;
    model
      .update(user)
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
  })

  .post('/seed', (req,res,next)=>{
    model.seed().then(inserted=>{
      model.getAll().then(list=>{
        const data = {
          data: list.items,
          total: inserted,
          isSuccess: true,
        }
        res.send(data);
      })
    })
    .catch(next)
  })
module.exports = router;
