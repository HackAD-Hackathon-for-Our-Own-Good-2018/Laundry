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
    res.send(JSON.stringify({result: availabilityData}));
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
          var msg = data.building;
          var duration = calculationData[i].duration;
          var sendData = [email, msg, duration];
          resolve(sendData);
          break;
        }
      }

    }
  });

  promise1.then(function(sendData){
    console.log(sendData);
    const pythonProcess = spawn('python',["OnStart.py", sendData[1], sendData[2], sendData[0]]);
    pythonProcess.stdout.on('data', (data) => {
        // data returned from python script
        console.log(data.toString());
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


var availabilityData = [];
for(var i = 0; i < 12; i++){
  var array = [];
  for(var j = 0; j < 6; j++){
    array[j] = 0;
  }
  var one = {
    building: 'A1A',
    result: array
  };
  availabilityData.push(one);
}
