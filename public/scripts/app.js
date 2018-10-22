$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});
/*
Client Side, jQuery
The root page, user can submit an event title
Submit button:
              request: POST, '/'
              response: user input,
                        Redirect '/new/event',
*because in server.js we added /api/users to all routes, we need to add that


*/
$(document).ready(function(){
  //get the initial page with '/'
  var $event_container = $('.ol-lg-12 col-md-6 col-sm-6 col-xs-1 bg-warning');
  var $event_title = $('.event_title');
  var $event_info = $('.event_info');
  var $event_date = $('.event_date');
  var $event_creator = $('.event_creator');
  var event_title_user_input;
  var event_info_user_input_desc;
  var event_info_user_input_loc;
  var event_dates_user_input = [];
  var event_creator_name;
  var event_creator_email;



// submit event title
  $event_title.on('submit',function(event){
    event.preventDefault();
    //take the request input and send a response
    event_title_user_input = $('.event-title').val();                      ///////change the name according to Adi's id of index form textarea
    let user_input_length = event_title_user_input.length;
    //check input
    if(user_input_length==0){alert('Empty Event name input!')}
    //send response with user input as data
    //empty div
    //append #event_info
    $.ajax({
      url:'/api/users/new',
      type:'post'
    }).done(function(){
      $event_title.css('display','none');
      $event_info.css('display','block');


    })
  });


  // $("article.row").on("submit", "form.timeslot", (e) => {
  //   e.preventDefault()
  // })

  // $("article.row").on("submit", "form.event", (e) => {
  //   e.preventDefault()
  // })

// submit event info
var number_of_input_dates=[];
var datenumber = 0;
  $event_info.on('submit',function(event){
    event.preventDefault();
    event_info_user_input_desc = $(event.target).find('.event-desc').val();
    event_info_user_input_loc = $(event.target).find('.event-loc').val();
    $.ajax({
      url:'/api/users/new/event',
      type:'post'
    }).done(function(data,status,response){
      $event_info.css('display','none');
      $event_date.css('display','block');


      datenumber+=1;
      number_of_input_dates.push(datenumber);
    $('.deleteDateButton1').on('click',function(event){
    //empty container start_end1
    $(`.start_end1`).empty();

    let index = number_of_input_dates.indexOf(datenumber);
    number_of_input_dates.splice(index,1);
    console.log('after delete the original one',number_of_input_dates);
  })
    })
  })



//add date button

$('.add-date').on('click',function(event){
  event.preventDefault();
  datenumber+=1;
  number_of_input_dates.push(datenumber);
  let new_date_input = $('.start_end1').clone();
  new_date_input.removeClass('start_end1');
  new_date_input.addClass(`start_end${datenumber}`);
  let deletbutton = new_date_input.find('.deleteDateButton1');
  deletbutton.removeClass('deleteDateButton1');
  // deletbutton.addClass(`deleteDateButton${datenumber}`);
deletbutton.attr('id', `deleteDateButton${datenumber}`);
  $('.start_end_container').append(new_date_input);
  //delete button listener





    $(`#deleteDateButton${datenumber}`).on('click',function(event){
      console.log('id of this button get clicked',this.id);
      //empty container start_end1
      console.log('deletbutton clicked','button:',`.deleteDateButton${datenumber}`);
      console.log('container name',`.start_end${datenumber}`);
      //find this button's name
      let stringlength = this.id.length;
      let buttonNumber = this.id.slice(stringlength-1,stringlength);
      console.log('buttonid',buttonNumber);
      $(`.start_end${buttonNumber}`).empty();
      let index = number_of_input_dates.indexOf(buttonNumber);
      // number_of_input_dates.splice(index,1);
      datenumber = datenumber-1;
      console.log('numbber of dates',datenumber);
    })


});




let date;
//submit button on dates
$('.event_date').on('submit',function(event){
  event.preventDefault();

  for(i=1;i<=datenumber;i++){
    console.log('inside for look',datenumber,$( `.start_end${i}`).find('.starttime').val());
    date = {starttime:$( `.start_end${i}`).find('.starttime').val().toString(),
    endtime:$( `.start_end${i}`).find('.endtime').val().toString()};
    console.log("THIS IS THE DATE AFTER THE JQUERY", date)
    event_dates_user_input.push(date)
    console.log("THIS IS THE VAR DATE OBJECT WE'RE PUSHING TO", event_dates_user_input)
    ;

  }
  $.ajax({
          url:'/api/users/new/date',
          type:'post'
         })
          .done(function(data,status,respons){
            $event_date.css('display','none');
            $event_creator.css('display','block');
          });

  //store all dates in an array of objects
          //event_dates_user_input:[{startDateTime:event_date_user_input1, endDateTime:event_date_user_input2}]
          //use global variable to keep track of number of dates
          //take me to next page, creator info page
          //                             $.ajax({
                                        //   url:'/api/users/new/date',
                                        //   type:'post'
                                        // })
          //                             .done(function(data,status,respons){
          //                                $event_date.css('display','none');
   //                                      $event_creator.css('display','block');})
  //if it is the submit button
  console.log('this is submit');
  //if it is the add button
})




  //add event listener to edit button
          //


//submit event date
// $event_date.on('submit',function(event){
//   event.preventDefault();
//   event_date_user_input1 = $(event.target).find('.event-date1').val();
//   event_date_user_input2 = $(event.target).find('.event-date2').val();
//   $.ajax({
//     url:'/api/users/new/date',
//     type:'post'
//   }).done(function(data,status,response){
//       $event_date.css('display','none');
//       $event_creator.css('display','block')
//   })
// })







$event_creator.on('submit',function(){
  event.preventDefault();
  event_creator_name = $(event.target).find('.event-creator-name').val();
  event_creator_email = $(event.target).find('.event-creator-email').val();
  $.ajax({
    url:'api/users/new/creator',
    type:'post',
    data:{event_title_user_input:event_title_user_input,
      event_info_user_input_desc:event_info_user_input_desc,
      event_info_user_input_loc:event_info_user_input_loc,
      event_dates_user_input:event_dates_user_input,
      event_creator_name:event_creator_name,
      event_creator_email:event_creator_email}
  }).done(function(data,status,response){
    //got response from server
    //send get request to /api/users/shorturl
    // here data = shorturl
    window.location = 'api/users/new/'+data;
  }).done(function(data,status,respons){

  })
})
//send everything to server side, store into database, create shorurl, redirect to shorturl,



  });
