$(document).ready(function(){
  $('#submitButton').on('click', function(){
    var netID = $('#netID').val();
    var building = $('#building').val();
    var washtype = $('#washtype').val();
    var temperature = $('#temperature').val();
    var otherOptions = $('#otherOptions').val();
    var otherOtherOptions = $('#otherOtherOptions').val();
    var time = $('#time').val();

    var data = {
      netID: netID,
      building: building,
      washtype: washtype,
      temperature: temperature,
      otherOptions: otherOptions,
      otherOtherOptions: otherOtherOptions,
      time: time
    }

    $('#formParameters').each(function(){
      this.reset();
    });

    console.log(data);
    $.ajax({
         type: 'post',
         url: '/save',
         contentType : "application/json",
         data: JSON.stringify(data),
         dataType: 'json',
         error: function(err){
           console.log(err);
         },
         success: function (res) {
           console.log(res);
          alert("We got your submission");
         }
       });
       // e.preventDefault();
     });
});
