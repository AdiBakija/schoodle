
$(document).ready(function(){

  console.log(urlToPass);

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


})

