"use strict";


const express   = require('express');
const router    = express.Router();
const dbAccess  = require('../util/dbaccess')

module.exports = (dataHelpers, dbAccess) => {

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
  res.status(201).send(); //send a response back, changes are done in app.js using ajax
});
 // /api/user/new/creator
router.post('/new/creator',(req,res)=>{

  let shorturl = generateRandomShortUrl();

  //use helper function to store into database
  let eventObj=req.body;
  eventObj.url = shorturl

    dataHelpers.addEmail(eventObj, function (err, result) {
      if (err) {
        console.log(err)
      }
      dataHelpers.addEvent(eventObj, result, function (err, result2) {
        if (err) {
          console.log(err)
        }
        dataHelpers.addDates(eventObj, result2, function(err, result3) {
        })
      })

    })



  //res.app.locals.shorturl = shorturl;

  // res.redirect(201,'/api/users/' + shorturl);
  //send shorturl with a response


  res.json(shorturl).status(201).send();

 })

// /api/users/:shorturl
router.get('/new/:shorturl', (req,res)=>{
  let templateVar = {url: req.params.shorturl}
  res.render('shorturl', templateVar);
})

router.put('/loadEvent', (req,res)=> {
  console.log("REQUEST.BODY", req.body)

  dbAccess.urlToTableRender(req.body.short, (err,event)=> {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.send(event);
    }
  })
})

router.post('/loadEvent', (req,res)=> {
  console.log("avArray", req.body.avArray)

  dataHelpers.addUsers(req.body.avArray, function(err, result4) {
    if (err) {
      console.log(err)
    }
    res.status(201).send(result4)
  })

})

router.post('/removeuser', (req,res) => {
  dataHelpers.removeUser(req.body.deletuserid, function(err,result101) {
    if (err){
      console.log(err)
    }
    res.status(201).send()
  })



})


router.post('/addemail', (req,res)=> {
  console.log('GOT TO THE SERVER ----------------------')

  dataHelpers.addEmailUser(req.body.emailObj, function(err, result100){
    console.log(result100)
  })
  res.status(201).send()
})


function generateRandomShortUrl(){
  return Math.random().toString(36).replace('0.','').slice(0,8);
}

  return router;
}
