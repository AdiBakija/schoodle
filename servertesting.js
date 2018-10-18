"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

const dataHelpers = require("./util/data-helpers")(knex);

//dataHelpers.getEventId('1234567',(err, result) => {
//  if (err) {
//    console.log(err)
//  }
//  console.log("Returned", result)
//})

//dataHelpers.getDates('1',(err, result) => {
//  if (err) {
//    console.log(err)
//  }
//  console.log("Returned", result)
//})

//var usersFromId = dataHelpers.getUsersFromEventId('1',(err, result) => {
//  if (err) {
//    console.log(err)
//  }
//  return result
//})
//dataHelpers.getUserAvailabilityFromEventId('3',(err, result) => {
//  if (err) {
//    console.log(err)
//  }
//  console.log("Iterable Array", result)
//})

var eventObj = {
  event_creator_name: 'Mark',
  event_creator_email: '123@funny.com',
  url: 'scoobydoo',
  event_title_user_input: "Spaghetti Party" ,
  event_info_user_input_desc: "Good pasta here",
  event_info_user_input_loc: "123 Fake Street",
  event_dates_user_input: [{startDateTime: '2020/04/20 16:20', endDateTime: '2020/04/20 16:40'}, {startDateTime: '2020/04/20 4:20', endDateTime: '2020/04/20 4:45'}]
  }



dataHelpers.addEmail(eventObj, function (err, result) {
  if (err) {
    console.log(err)
  }
  dataHelpers.addEvent(eventObj, result, function (err, result2) {
    if (err) {
      console.log(err)
    }
    dataHelpers.addDates(eventObj, result2, function(err, result3) {
      console.log(result3)
    })
  })

})







// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));



// Home page
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
