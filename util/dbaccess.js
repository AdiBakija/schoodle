module.exports = function makeDbAccess (knex, dataHelpers) {
  return {
    urlToTableRender: function (url, callback) {
      dataHelpers.getEventId(url, (err, eventIdResult) => {
        if (err) {
          console.log(err)
        }
        var returnObject = {}
        var eventid = eventIdResult[0].id
        returnObject.eventid = eventIdResult[0].id

        dataHelpers.getAllFromEventId(eventid, function(err, eventInfoResult) {
          if (err) {
            console.log(err)
          }
          returnObject.title = eventInfoResult[0].title
          returnObject.description = eventInfoResult[0].description
          returnObject.location = eventInfoResult[0].location
          returnObject.creatorname = eventInfoResult[0].name

          dataHelpers.getDates(eventid, (err, datesResult) => {
            if (err) {
              console.log(err)
            }
            returnObject.dates = datesResult

            dataHelpers.getUserAvailabilityFromEventId(eventid,(err, availabilityResult) => {
              if (err) {
                console.log(err)
              }

              returnObject.availableArray = availabilityResult

              callback(null, returnObject)
           })
         })
        })
      })
    }

  }
}
