const express = require("express");
const model = require("../models/users");
const router = express.Router();
const { requireLogin } = require('../middleware/authorization');


router
  .get("/", requireLogin(true), (req, res, next) => {
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

  .get("/search/:q", requireLogin(true), (req, res, next) => {
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

  .get("/:id", requireLogin(true), (req, res, next) => {
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
    model.login(req.body.name, req.body.password).then(response=>{
      const data = {
        data: response,
        isSuccess: true
      }
      res.send(data)
    })
  })

  .post("/", requireLogin(true), (req, res, next) => {
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

  .patch("/:id", requireLogin(true), (req, res, next) => {
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

  .delete("/:id", requireLogin(true), (req, res, next) => {
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

  .post('/seed', requireLogin(true), (req,res,next)=>{
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

  .post('/oAuthLogin', (req, res, next) => {
    model.oAuthLogin(req.body.provider, req.body.accessToken)
    .catch(next)
})
module.exports = router;
