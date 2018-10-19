"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });

  router.post('/new',(req,res)=>{
    console.log('in user.js, get post reqest from /new');
    res.status(201).send(); //send a response back, changes are done in app.js using ajax

});
  router.post('/new/event',(req,res)=>{
    console.log('in user.js, get post reqest from /new/event');
    res.status(201).send(); //send a response back, changes are done in app.js using ajax
});
 router.post('/new/date',(req,res)=>{
  console.log('in user.js, get post reqest from /new/date');
  res.status(201).send(); //send a response back, changes are done in app.js using ajax
});
 router.post('/new/creator',(req,res)=>{
  console.log('in user.js, get post reqest from /new/creator');
  console.log(req.body);
  res.status(201).send();
  //use helper function to store into database
 })

  return router;
}
