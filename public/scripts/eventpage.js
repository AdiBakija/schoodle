

$(document).ready(function(){



  let urlToPass = {short: $('.shorturl').text()}
  console.log(urlToPass)


  function useTable (input) {
    //console.log(input)
    //console.log("YES IT IS HERE")

    let eventObj = input
    let dates = eventObj.dates
    console.log(dates)


    //we need to empty table body
    var htmlToRender = ``

    $('.table-body').empty()

    var firstRow = `<tr>
                      <td>Participants</td>`

      for (i = 0; i < dates.length; i++) {
        let rowText = `<td> ${processDates(dates[i].datetime)}${processDates(dates[i].datetime)} </td>`
        firstRow += rowText
      }

      firstRow += `</tr>`
      $('.table-body').append(firstRow)


  //         <tr>
  //           <td>Participants</td>
  //           <td> October 21, 2018 </td>
  //           <td> October 22, 2018 </td>
  //         </tr>
  //         <tr>
  //           <div class="add_participant_poll">
  //             <td>
  //               <form class="add_participant">
  //                 <div class="form-group">
  //                   <input type="text" class="participant-name form-control" name="participant-name" placeholder="Name">
  //                 </div>
  //               </form>
  //             </td>
  //             <td>
  //               <form class="add_poll">
 //                   <div class="form-group">
 //                     <input class="yes-no form-check-input" type="checkbox" value="">
 //                   </div>
 //                 </form>
 //               </td>
 //               <td>
 //                 <form class="add_poll">
 //                   <div class="form-group">
 //                     <input class="yes-no form-check-input" type="checkbox" value="">
 //                   </div>
 //                 </form>
 //               </td>
 //             </div>
 //           </tr>
 //           <tr>
 //             <td class="name">John Smith</td>
 //             <td>Yes = 1</td>
 //             <td>No = 0</td>
 //           </tr>
 //           <tr>
 //             <td class="name">Jon Jones</td>
 //             <td>No = 0</td>
 //             <td>Yes = 1</td>
 //           </tr>
 //         </tbody>



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



})

