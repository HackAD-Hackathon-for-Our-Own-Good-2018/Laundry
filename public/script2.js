$(document).ready(function(){
  checkAvailability();
});

$('#building').click(function(){
  checkAvailability();
})

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
      console.log(res.result);
      for(var i = 0; i < buildings.length; i++){
        if(buildings[i].building == $('#building').val()){
          console.log($('#building').val());
          
          for(var j = 0; j < buildings[i].result.length; j++){
            var object = $('.laundry-machines')[j];
            if(buildings[i].result[j] == 0){
              $(object).text('Occupied');
            }
            else{
              $(object).text('Available');
            }
          }
        }
      }
    }
  });
  // setTimeout(checkAvailability, 5000);
}
