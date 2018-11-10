$(document).ready(function(){
  checkAvailability();
});

function checkAvailability(){
  $.ajax({
    url: '/save/av',
    type: 'get',
    dataType: 'json',
    error: function(err){
      console.log(err);
    },
    success: function(res){
      console.log(res);
      var buildings = res.result;
      for(var i = 0; i < buildings.length; i++){
        if(buildings[i].building == 'A1A'){
          for(var j = 0; j < buildings[i].result.length; j++){
            var object = $('.laundry-machines')[j];
            if(buildings[i].result[j] == 0){
              $(object).text('Occupied');
              $(object).css('text-align:center; font-size:300%; color:red');
            }
            else{
              $(object).text('Available');
              $(object).css('text-align:center; font-size:300%; color:green');
            }
          }
        }
      }
    }
  });
  setTimeout(checkAvailability, 5000);
}
