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
                    <input class="yes-no form-check-input" id="boxN${i}" type="checkbox" value="">
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
                  <button class="delete${users[i][0]} btn btn-danger btn-xs" type="button">
                    <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                  </button>
                  <button class="edit${users[i][0]} btn btn-info btn-xs" type="button">
                    <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                  </button>
                  <button class="save${users[i][0]} btn btn-info btn-xs" type="button">
                    <span aria-hidden="true">Save</span>
                  </button>    ${users[i][1]}
                </td>`

    availabilityObject = {}
    availabilityObject.eventid = eventObj.eventid
    availabilityObject.userid = users[i][0]
    availabilityObject.name = users[i][1]
    availabilityObject.dateids = []
    availabilityObject.availability = []

     for (j = 2;j < users[0].length; j++) {
      let k = j - 2
      if (users[i][j] === 1) {
       columnItem = `<td><input class="yes-no form-check-input" id = ${i}_${k}_${j} type="checkbox" value="yes" checked disabled></td>`
       rowItem += columnItem
       console.log(j);

      } else {
        console.log(j);
        columnItem = `<td><input class="yes-no form-check-input" id = ${i}_${k}_${j}  type="checkbox" value="no" disabled></td>`
        rowItem += columnItem
      }


       availabilityObject.dateids.push(dates[k].id)
       availabilityObject.availability.push(users[i][j])
     }
     rowItem += `</tr>`
     userRows += rowItem
     availabiltiyArray.push(availabilityObject)
  }
  $('.table-body').append(userRows)

    for (i = 0; i < users.length; i++) {
    console.log('in edit button listner');
    let editbutton = `.edit${users[i][0]}`
    let checkboxClass = $( `.${users[i][0]}`)
      $(editbutton).on('click',function(event){
        event.preventDefault();
        //take the user name value
        console.log(checkboxClass);
        console.log($(checkboxClass).find('.yes-no'));
        $(checkboxClass).find('.yes-no').prop( "disabled", false );
        //enable the checkboxes
      })
    }

   for (i = 0; i < users.length; i++) {
    console.log('in edit button listner');
      let editbutton = `.edit${users[i][0]}`
      let checkboxClass = $( `.${users[i][0]}`)
      let changed_user_id = users[i][0];
      $(editbutton).on('click',function(event){
        event.preventDefault();
        //take the user name value
        console.log(checkboxClass);
        console.log($(checkboxClass).find('.yes-no'));
        checkboxClass.find('.yes-no').prop( "disabled", false );
        //enable the checkboxes
      })

      //save button handler
      let savebutton = `.save${users[i][0]}`

      $(savebutton).on('click',function(event){
        event.preventDefault();
        //disable checkboxes
        checkboxClass.find('.yes-no').prop( "disabled", true );
      //Update availabiltiyArray
      console.log('Changed button ID in save',chengedUserID);

      })

      //Delete Button
      //empty the class with userid
      let deletebutton = `.delete${users[i][0]}`;
      let deletuserid = users[i][0];
      $(deletebutton).on('click',function(event){
        event.preventDefault();
        $(`.${deletuserid}`).css('display','none');
      })

   }



//var availabiltiyArray = [
//  {userid: 4000, dateids: [4000, 5000, 6000], availability: [1, 1, 1], name: 'Sir Dr. Mr. Professor Spaghetti Esq.', eventid: 2000},
//  {dateids:[4000, 5000, 6000], availability: [0,0,0] ,name: 'N. Person', eventid: 3000}
//]

  }

function addEventListeners() {



//The bug could potentially be within this block of code
  $('#buttonforadding').on('click', function(event){
    event.preventDefault();

    let newParticipant = {eventid: eventObj.eventid, dateids: [], availability: []}
    for (i = 0; i < dates.length; i++){
      newParticipant.dateids.push(dates[i].id)
    }
    if ($('.participant-name').val()) {
      newParticipant.name = $('.participant-name').val()

      newParticipant.availability = yesNo
      availabiltiyArray.push(newParticipant)
      newParticipant = {eventid: eventObj.eventid, dateids: [], availability: []};
    }

    let availabilityToDatabase = {avArray: availabiltiyArray}

    emailObj = {
      name: $('.email-name').val(),
      email: $('email-email').val(),
      eventid: eventObj.eventid
    }

    emailToDatabase = {emailObj: emailObj}

    $.ajax({
        url: '/api/users/addemail',
        type: 'POST',
        dataType: 'JSON',
        data:emailToDatabase
    })


    $.ajax({
        url: '/api/users/loadEvent',
        type: 'POST',
        dataType: "JSON",
        data: availabilityToDatabase
    }).then(getEvent())
    window.location.reload();

  })
}



  function getEvent () {
    console.log("inside getEvent")
    $.ajax({
        url: '/api/users/loadEvent',
        type: 'PUT',
        dataType: "JSON",
        data: urlToPass
    }).done(function(data,status,response){
      console.log('in done function')
      console.log(data);
      useTable(data);
    })
  }

  getEvent()



  function processDates (date) {
    let returnedDate = date.toLocaleString()
    return returnedDate
  }

$('.form-check-input').on('click', function(event){
    event.preventDefault()
    console.log("WORKING")
  })


$( function() {


  $( document ).on( "change", ":checkbox", function () {
    console.log(this.id.slice(3,4))
    if (this.id.slice(3,4) == 'N') {
    console.log("NEW USER ONE")
      if (yesNo[this.id.slice(4,)] == 1) {
        yesNo[this.id.slice(4,)] = 0
      }else {
        yesNo[this.id.slice(4,)] = 1
      }
    } else {
    console.log("NON NEW USER CHECK BOX")
    //find this user and this checkbox name
    //uding these to update avalibility array
    let datecolumn = this.id;
    let user_position = this.id.split('_')[0];
    let date_position = this.id.split('_')[1];
    console.log('user position',user_position);
    console.log('date',date_position);

    //var availabiltiyArray = [
//  {userid: 4000, dateids: [4000, 5000, 6000], availability: [1, 1, 1], name: 'Sir Dr. Mr. Professor Spaghetti Esq.', eventid: 2000},
//{userid: 4000, dateids: [4000, 5000, 6000], availability: [1, 1, 1], name: 'Sir Dr. Mr. Professor Spaghetti Esq.', eventid: 2000}
//  {dateids:[4000, 5000, 6000], availability: [0,0,0] ,name: 'N. Person', eventid: 3000}

//]

  if(availabiltiyArray[user_position].availability[date_position]===1){
    vailabiltiyArray[user_position].availability[date_position]=0;
  }else{availabiltiyArray[user_position].availability[date_position]=1}


    }
  });


});


addEventListeners()

})
