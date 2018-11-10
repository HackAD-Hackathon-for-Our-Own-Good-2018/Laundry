const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const spawn = require("child_process").spawn;
const bodyParser = require("body-parser");
const fs = require('fs');
//for python script

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/index.ejs', (req, res) => res.render('pages/index'))
  .get('/av.ejs', (req, res) => res.render('pages/av'))
  .get('/db.ejs', (req,res) => res.render('pages/db'))
  .get('/registration.ejs', (req, res) => res.render('pages/registration'))
  .get('/save/av', (req,res) => {
    checkAvailability();
    function checkAvailability(){
      var availabilityData = [];
      const pythonProcess = spawn('python',["check_available.py"]);
      var result;
      var promise3 = new Promise(function(resolve, reject){
        var done = false;
        pythonProcess.stdout.on('data', (data) => {
            console.log('hereeee');
            // data returned from python script
            // console.log(data.toString());
            myData = data.toString().split(',');
            for(var i = 0; i < myData.length - 1; i++){
              var b;
              if(myData[i][0] < 6) b = 'A1A';
              else if(myData[i][0] < 12) b = 'A1B';
              else if(myData[i][0] < 18) b = 'A1C';
              else if(myData[i][0] < 24) b = 'A2A';
              else if(myData[i][0] < 30) b = 'A2B';
              else if(myData[i][0] < 36) b = 'A2C';
              else if(myData[i][0] < 42) b = 'A5A';
              else if(myData[i][0] < 48) b = 'A5B';
              else if(myData[i][0] < 54) b = 'A5C';
              else if(myData[i][0] < 60) b = 'A6A';
              else if(myData[i][0] < 66) b = 'A6B';
              else b = 'A6C';

              var one = {
                building: b,
                machineID: myData[i][0],
                result: array
              };
              availabilityData.push(one);
            }
            done = true;
        });
        if(done == true) resolve(availabilityData);
      });
      promise3.then(function(availabilityData){
        res.send(JSON.stringify({result: availabilityData}));
      });
    };
  })
  .post('/save', (req, res) =>{
    sendEmail(req.body);
    res.send(JSON.stringify({result:'OK'}));
  }
)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


//send info to the database
function sendEmail(data){
  var promise1 = new Promise(function(resolve, reject){
    if(ready == true){
      for(var i = 0; i < calculationData.length; i++){
        //find the correct type
        if(data.washtype == calculationData[i].material && calculationData[i].duration > 0){
          var email = data.netID + '@nyu.edu';
          var msg;
          if(data.building == 'A1A') msg = 0;
          else if(data.building == 'A1B') msg = 6;
          else if(data.building == 'A1C') msg = 12;
          else if(data.building == 'A2A') msg = 18;
          else if(data.building == 'A2B') msg = 24;
          else if(data.building == 'A2C') msg = 30;
          else if(data.building == 'A5A') msg = 36;
          else if(data.building == 'A5B') msg = 42;
          else if(data.building == 'A5c') msg = 48;
          else if(data.building == 'A6A') msg = 54;
          else if(data.building == 'A6B') msg = 60;
          else if(data.building == 'A6C') msg = 66;
          else msg = 72;
          msg = msg + 1;
          var duration = calculationData[i].duration;
          var sendData = [email, msg, duration];
          resolve(sendData);
          break;
        }
      }

    }
  });

  promise1.then(function(sendData){
    const pythonProcess = spawn('python',["OnStart.py", sendData[1], sendData[2], sendData[0]]);
    pythonProcess.stdout.on('data', (data) => {
        // data returned from python script
        console.log(data.toString());
        if(data.toString() == 'ERROR'){
          console.log('something went wrong');
        }
    });
  });
}

var ready = false;
var calculationData = [];
//get the calculation data
var filename = 'LaundryData.txt';
var promise2 = new Promise(function(resolve, reject){
  fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    var laundryData = [];
    var cut = data.split('\n');
    console.log('OK: ' + filename);
    // console.log(cut.length)
    for(var i = 0; i < cut.length - 1; i++){
      var cut2 = cut[i].split(' ');
      entry = {
        material: cut2[0],
        temperature: cut2[1],
        option1: cut2[2],
        option2: cut2[3],
        duration: cut2[4].split('\r')[0]
      }
      // console.log(entry);
      laundryData.push(entry);
    }
    resolve(laundryData);
  });
});

promise2.then(function(laundryData){
  calculationData = laundryData;
  ready = true;
});
