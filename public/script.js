$(document).ready(function(){
  $('#submitButton').on('click', function(){
    var netID = $('#netID').val();
    var building = $('#building').val();
    var washtype = $('#washtype').val();
    var time = $('#time').val();
    console.log('here');
    var data = {
      netID: netID,
      building: building,
      washtype: washtype,
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
          // alert("We got your submission");
          $('#alert').show();
         }
       });
       // e.preventDefault();
     });
});
