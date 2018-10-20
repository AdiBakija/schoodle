

$(document).ready(function(){



  let urlToPass = {short: $('.shorturl').text()}
  var eventObj
  var dates
  var users
  var availabiltiyArray = []
  var yesNo = []


  function useTable (input) {
    //console.log(input)
    //console.log("YES IT IS HERE")
    eventObj = input
    dates = eventObj.dates
    users = eventObj.availableArray

    //we need to empty table body
    var htmlToRender = ``

    $('.table-body').empty()

    var firstRow = `<tr class="${eventObj.eventid}">
                      <td class="col1">Participants</td>`

      for (i = 0; i < dates.length; i++) {
    /*EDIT DATE FORMAT */
        console.log(dates[i].datetime);
        console.log(dates[i].enddatetime);
        let start = new Date(dates[i].datetime);
        let end = new Date(dates[i].enddatetime);
        let start_weekDay = start.toString().slice(0,3);
        let start_month = start.toString().slice(4,7);
        let start_day = start.toString().slice(8,10);
        let start_hour = dates[i].datetime.slice(11,13);
        let start_minutes=start.getUTCMinutes();

        let end_weekDay = end.toString().slice(0,3);
        let end_month= end.toString().slice(4,7);
        let end_day=end.toString().slice(8,10);
        let end_hour= dates[i].enddatetime.slice(11,13);
        let end_minutes= end.getUTCMinutes();

    /*end of EDIT DATE FORMAT*/

        let rowText = `<td class="${dates[i].id}"> ${start_month}${start_day} ${start_weekDay} ${start_hour}:${start_minutes} -
          ${end_month}${end_day} ${end_weekDay} ${end_hour}:${end_minutes} </td>`
        firstRow += rowText
      }

      firstRow += `</tr>`
      $('.table-body').append(firstRow)

    var addUser = `
          <tr>
            <div class="add_participant_poll">

              <td class="participant col1">
                <form class="add_participant">
                  <div class="form-group">
                    <input type="text" class="participant-name form-control" name="participant-name" placeholder="Name">
                  </div>
                </form>
              </td>`
    for (i = 0; i < dates.length; i++) {
      let availableBoxes =
              `<td class="poll">
                <form class="add_poll">
                  <div class="form-group">
                    <input class="yes-no form-check-input" id="box${i}" type="checkbox" value="">
                  </div>
                </form>`
       addUser += availableBoxes
       yesNo.push(0)
    }
    $('.table-body').append(addUser)

   var userRows = ``

  for (i = 0; i < users.length; i++) {
    rowItem =`<tr class="${users[i][0]}">
                <td class="name col1">
                  <button class="edit btn btn-info btn-xs" type="button">
                    <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                  </button>${users[i][1]}
                </td>`

    availabilityObject = {}
    availabilityObject.eventid = eventObj.eventid
    availabilityObject.userid = users[i][0]
    availabilityObject.name = users[i][1]
    availabilityObject.dateids = []
    availabilityObject.availability = []

     for (j = 2;j < users[0].length; j++) {
       columnItem = `<td>${users[i][j]}</td>`
       rowItem += columnItem

       let k = j - 2
       availabilityObject.dateids.push(dates[k].id)
       availabilityObject.availability.push(users[i][j])
     }
     rowItem += `</tr>`
     userRows += rowItem
     availabiltiyArray.push(availabilityObject)
   }
   $('.table-body').append(userRows)


//var availabiltiyArray = [
//  {userid: 4000, dateids: [4000, 5000, 6000], availability: [1, 1, 1], name: 'Sir Dr. Mr. Professor Spaghetti Esq.', eventid: 2000},
//  {dateids:[4000, 5000, 6000], availability: [0,0,0] ,name: 'N. Person', eventid: 3000}
//]

  }

function addEventListeners() {




  $('#buttonforadding').on('click', function(event){
    event.preventDefault();

    let newParticipant = {eventid: eventObj.eventid, dateids: [], availability: []}
    for (i = 0; i < dates.length; i++){
      newParticipant.dateids.push(dates[i].id)
    }
    if ($('.participant-name').val()) {
      newParticipant.name = $('.participant-name').val()

      for (var date = 0; date < dates.length; date++) {
        console.log(`#box${date}`)
        let newParticipantAvailable = $(`#box${date}`).val()
        newParticipant.availability.push(newParticipantAvailable)
      }
      availabiltiyArray.push(newParticipant)
    }

    console.log(availabiltiyArray)

  })
}



  function getEvent () {
    $.ajax({
        url: '/api/users/loadEvent',
        type: 'PUT',
        dataType: "JSON",
        data: urlToPass,
        success: useTable
    })
  }

  getEvent()



  function processDates (date) {
    let returnedDate = date.toLocaleString()
    return returnedDate
  }

$('.participant-name').on('click', function(event){
    event.preventDefault()
    console.log("WORKING")
  })
$(`.yes-no`).is(':checked', function(event) {
    console.log("EVENT ID",event.id)
    console.log("EVENT",event)
  })

$('input[type="checkbox"]').click(function(){
           if($(this).prop("checked") == true){
               alert("Checkbox is checked.");
           }
           else if($(this).prop("checked") == false){
               alert("Checkbox is unchecked.");
           }
});



addEventListeners()

})

