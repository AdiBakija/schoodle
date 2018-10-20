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
    getAllFromEventId: function (eventid, callback){
      knex.select('title', 'description', 'location','emails.name')
        .from('events')
        .innerJoin('emails','events.creatoremailid', 'emails.id')
        .where('events.id', '=', eventid)
        .asCallback(function(err, rows) {
          if (err) {
            return console.log(err);
          }
          callback(err, rows)
        })
    },
    getDates: function (eventid, callback){
      knex.select('id','datetime', 'enddatetime').from('dates')
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

    addDates: async function(eventObj, eventId, callback) {
      for (var date of eventObj.event_dates_user_input) {
        let dateInsert = await knex('dates').insert({
            eventid: eventId,
            datetime: date.startDateTime,
            enddatetime: date.endDateTime
          }).then(id=> {
            console.log('One item added')
          });
      }
      callback(null, "Success")
    },

    addUsers: async function(availabilityArray, callback) {
      for (var user of availabilityArray) {
          if (user.userid) {
            let updatedId = await knex('users').returning('id')
              .where('id', '=', user.userid)
              .update('name', user.name);
            console.log(updatedId)
            console.log(user.dateids)
            console.log(user.availability)
            try {
              for (var i =0; i < user.dateids.length; i++){
                console.log('User Updated')
                await knex('usersdates')
                  .where('userid','=',updatedId[0])
                  .andWhere('dateid',user.dateids[i])
                  .update({
                    available: user.availability[i]
                  })
                }

            } catch (e) {
              console.log(e)
            }
          } else {
            let createdId = await knex('users').returning('id')
              .insert({
                name: user.name,
                eventid: user.eventid
              });
            try {
              console.log('userid Created')
              for (var i = 0; i < user.dateids.length; i++) {
                await knex('usersdates').insert({
                  userid: createdId[0],
                  dateid: user.dateids[i],
                  available: user.availability[i]
                }).then((usersDatesId)=>{
                  console.log("userDateId Added")
                })
              }
            } catch (e) {
              console.log(e)
            }
        }

      }
    }

  }
}



