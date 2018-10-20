

$(document).ready(function(){



  let urlToPass = {short: $('.shorturl').text()}



  function useTable (input) {
    //console.log(input)
    //console.log("YES IT IS HERE")

    let eventObj = input
    let dates = eventObj.dates
    let users = eventObj.availableArray

    //we need to empty table body
    var htmlToRender = ``

    $('.table-body').empty()

    var firstRow = `<tr class="${eventObj.eventid}">
                      <td>Participants</td>`

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

              <td>
                <form class="add_participant">
                  <div class="form-group">
                    <input type="text" class="participant-name form-control" name="participant-name" placeholder="Name">
                  </div>
                </form>
              </td>`
    for (i = 0; i < dates.length; i++) {
      let availableBoxes =
              `<td>
                <form class="add_poll">
                  <div class="form-group">
                    <input class="yes-no form-check-input" type="checkbox" value="">
                  </div>
                </form>`
       addUser += availableBoxes
    }
    $('.table-body').append(addUser)

   var userRows = ``

   for (i = 0; i < users.length; i++) {
     rowItem =`<tr class="${users[i][0]}">
                <td class="name">${users[i][1]}</td>`
     for (j = 2;j < users[0].length; j++) {
       columnItem = `<td>${users[i][j]}</td>`
       rowItem += columnItem
     }
     rowItem += `</tr>`
     userRows += rowItem
   }
   $('.table-body').append(userRows)
//
//var availabiltiyArray = [
//  {userid: 4000, dateids: [4000, 5000, 6000], availability: [1, 1, 1], name: 'Sir Dr. Mr. Professor Spaghetti Esq.', eventid: 2000},
//  {dateids:[4000, 5000, 6000], availability: [0,0,0] ,name: 'N. Person', eventid: 3000}
//]

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

});

