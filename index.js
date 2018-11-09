const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const spawn = require("child_process").spawn;
const bodyParser = require("body-parser");
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
  .post('/save', (req, res) =>{
    sendEmail(req.body);
    res.send(JSON.stringify({result:'OK'}));
  }
)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

function sendEmail(data){
  // console.log(data);

  var promise1 = new Promise(function(resolve, reject){
    var email = data.netID + '@nyu.edu';
    var msg = data.building;
    var duration = '1';
    var sendData = [email, msg, duration];
    resolve(sendData);
  });

  promise1.then(function(sendData){
    const pythonProcess = spawn('python',["OnStart.py", sendData[1], sendData[2], sendData[0]]);
    pythonProcess.stdout.on('data', (data) => {
        // Do something with the data returned from python script
        console.log(data.toString());
    });
  });

}
