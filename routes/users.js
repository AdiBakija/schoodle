"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (dataHelpers) => {

  router.get("/", (req, res) => {
    res.status(201).send();
  });

  router.post('/new',(req,res)=>{
    res.status(201).send(); //send a response back, changes are done in app.js using ajax
});
  router.post('/new/event',(req,res)=>{
    res.status(201).send(); //send a response back, changes are done in app.js using ajax
});
 router.post('/new/date',(req,res)=>{
  console.log('in user.js, get post reqest from /new/date');
  res.status(201).send(); //send a response back, changes are done in app.js using ajax
});
 // /api/user/new/creator
router.post('/new/creator',(req,res)=>{
  //  var event_title = req.body.event_title_user_input;
  // var event_desc = req.body.event_info_user_input_desc;
  // var event_loc = req.body.event_info_user_input_loc;
  // var event_date_array = req.body.event_dates_user_input;
  // var event_creator_name = req.body.event_creator_name;
  // var event_creator_email = req.body.event_creator_email;
  let shorturl = generateRandomShortUrl();

  //use helper function to store into database




  //res.app.locals.shorturl = shorturl;

  // res.redirect(201,'/api/users/' + shorturl);
  //send shorturl with a response

  res.json(shorturl).status(201).send();

 })

// /api/users/:shorturl
router.get('/new/:shorturl', (req,res)=>{

  //pull data from database using shorturl

  res.render('shorturl');
})

function generateRandomShortUrl(){
  return Math.random().toString(36).replace('0.','').slice(0,8);
}

  return router;
}
