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
  var $event_container = $('#event');
  var $event_title = $('#event_title');
  var $event_info = $('#event_info');
  var $event_date = $('#event_date');
  var $event_creator = $('#event_creator');
  var $event_info_html = $(document).find('#event_info').clone();
  var $event_date_html = $(document).find('#event_date').clone();
  var $event_creator_html = $(document).find('#event_creator').clone();
  var event_title_user_input=1;
  var event_info_user_input_desc=2;
  var event_info_user_input_loc=3;
  var event_date_user_input1=4;
  var event_date_user_input2=5;
  var event_creator_name=6;
  var event_creator_email=7;


// submit event title
  $event_title.on('submit',function(event){
    event.preventDefault();
    //take the request input and send a response
    event_title_user_input = $('#textarea').val();                      ///////change the name according to Adi's id of index form textarea
    let user_input_length = event_title_user_input.length;
    console.log(event_title_user_input);
    //check input
    if(user_input_length==0){alert('Empty Event name input!')}
    //send response with user input as data
    //empty div
    //append #event_info
    $.ajax({
      url:'/api/users/new',
      type:'post'
    }).done(function(){
      //put data into cookie to carry on to next page
      console.log(event_title_user_input);
      $event_container.empty();
      $event_container.append($event_info_html);
    })
  });


// submit event info
  $event_info.on('submit',function(event){
    event.preventDefault();
    event_info_user_input_desc = $('#event-desc').val();
    event_info_user_input_loc = $('#event-loc').val();
    //Add check for no input

    $.ajax({
      url:'/api/users/new/event',
      type:'post'
    }).done(function(data,status,response){
      $event_container.empty();
      $event_container.append($event_date_html);
      console.log(event_info_user_input_desc);
      console.log(event_info_user_input_loc);
    })
  })


//submit event date
$event_date.on('submit',function(event){
  event.preventDefault();
  event_date_user_input1 = $('#event-date1').val();
  event_date_user_input2 = $('#event-date2').val();
  $.ajax({
    url:'/api/users/new/date',
    type:'post'
  }).done(function(data,status,response){
    $event_container.empty();
    $event_container.append($event_creator_html);
  })
})

$event_creator.on('submit',function(){
  event.preventDefault();
  event_creator_name = $('#event-creator-name').val();
  event_creator_email = $('#event-creator-email').val();
  $.ajax({
    url:'api/users/new/creator',
    type:'post',
    data:{event_title_user_input:event_title_user_input,
      event_info_user_input_desc:event_info_user_input_desc,
      event_info_user_input_loc:event_info_user_input_loc,
      event_date_user_input1:event_date_user_input1,
      event_date_user_input2:event_date_user_input2,
      event_creator_name:event_creator_name,
      event_creator_email:event_creator_email}
  })
})
//send everything to server side, store into database, create shorurl, redirect to shorturl,



  });
