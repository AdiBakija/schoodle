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

    addEmail: function(eventObj, callback) {
        knex.select('id').from('emails')
          .where('emailtext','=',eventObj.event_creator_email)
          .then((rows)=> {
              if(rows.length > 0) {
                callback(null, rows[0].id)
              } else {
                knex('emails')
                  .returning('id')
                  .insert({
                  name: eventObj.event_creator_name,
                  emailtext: eventObj.event_creator_email
                }).then(function(insertedRows) {
                  callback(null, insertedRows[0])
                })
              }
          })
    },

    addEvent: function(eventObj, emailId, callback) {
      knex('events')
        .returning('id')
        .insert({
                url: eventObj.url,
                title: eventObj.event_title_user_input,
                description: eventObj.event_info_user_input_desc,
                location: eventObj.event_info_user_input_loc,
                closed: 0,
                finaldateid: null,
                creatoremailid: emailId
        })
        .then(function(eventid) {
          callback(null, eventid[0])
        })
    },

    addDates: function(eventObj, eventId, callback) {
      let datesArray = []
      for (var date in eventObj.event_dates_user_input) {
        let dateInsert = knex('dates').insert({
            eventid: eventId,
            datetime: date.startDateTime,
            enddatetime: date.endDateTime
          })
        datesArray.push(dateInsert)
      }
      callback(null, datesArray)
    }




//   data:{event_title_user_input:event_title_user_input,
//      event_info_user_input_desc:event_info_user_input_desc,
//      event_info_user_input_loc:event_info_user_input_loc,
//      event_dates_user_input:[{startDateTime:'2020/01/01 13:00', endDateTime:end}, {startDateTime:'2020/01/01 13:00', endDateTime:end}, {startDateTime:'2020/01/01 13:00', endDateTime:end}],
//      event_creator_name:event_creator_name,
//      event_creator_email:event_creator_email}
//
  }
}



