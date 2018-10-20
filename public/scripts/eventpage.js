
$(document).ready(function(){
  let urlToPass = {short: '12345678'}

  function useTable (input) {
    console.log(input)
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

