"use strict";

module.exports = function makeDataHelpers(knex) {
  return {
    getEventId: function (url, callback){
      knex.select('id').from('events')
        .where('url', '=', url)
        .asCallback(function(err, rows) {
          if (err) {
            return console.log(err);
          }
          callback(err, rows)
        })
    },
    getDates: function (eventid, callback){
      knex.select('datetime', 'enddatetime').from('dates')
        .where('eventid', '=', eventid)
        .orderBy('id')
        .asCallback(function(err, rows) {
          if (err) {
            return console.log(err);
          }
          callback(err, rows)
        })
    },
    getUsersFromEventId: function (eventid, callback){
      knex.select('id','name').from('users')
        .where('eventid', '=', eventid)
        .orderBy('id')
        .asCallback(function(err, rows) {
          if (err) {
            return console.log(err);
          }
          callback(err, rows)
        })
    },
    getUserAvailabilityFromEventId: function (eventid, callback){
      let subquery = (knex.select('id').from('users').where('eventid', '=', eventid))
      knex.select('*').from('usersdates')
        .where('userid', 'IN', subquery)
        .orderBy('userid')
        .orderBy('id')
        .asCallback(function(err, rows) {
          if (err) {
            return console.log(err)
          }
          var rowsFirst = rows
          knex.distinct('userid', 'name').from('usersdates')
            .innerJoin('users', 'users.id', 'usersdates.userid')
            .where('userid','IN',subquery)
            .orderBy('userid')
            .asCallback(function(err, rows2) {
              let outputArray = []
              //if we would prefer an array, we could order the query better and make userObj userArray
              for (var user of rows2) {
                let userArray = []
                userArray.push(user.name)
                console.log(user)
                for (var row of rowsFirst) {
                  if (row.userid === user.userid) {
                    userArray.push(row.available)
                  }
                }
                outputArray.push(userArray)
              }
            callback(err, outputArray)
          })
        })
    },

    promisified: function (somestring) {
      var future = new Promise
    }



  }
}



