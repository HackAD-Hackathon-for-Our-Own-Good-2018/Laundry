$(document).ready(function(){
  $('#submitButton').on('click', function(){
    var netID = $('#netID').val();
    var building = $('#building').val();
    var washnumber = $('#washnumber').val();
    var washtype = $('#washtype').val();
    var time = $('#time').val();
    if(washnumber == null || netID == null || washtype == null) {
      $('#incorrect').show();
    }
    else{
      var data = {
        netID: netID,
        building: building,
        washnumber: washnumber,
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
            $('#incorrect').hide();
            $('#alert').show();
           }
         });
    }



       // e.preventDefault();
     });
});
