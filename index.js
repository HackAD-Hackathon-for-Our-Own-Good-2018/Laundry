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
    console.log(req.body);
    res.send(JSON.stringify({result:'OK'}));
  }
)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

// var promise1 = new Promise(function(resolve, reject){
//   var email = 'ao1385@nyu.edu';
//   var msg = 'msg';
//   var sendData = [email, msg];
//   resolve(sendData);
// });
//
// promise1.then(function(sendData){
//   const pythonProcess = spawn('python',["send_email.py", sendData[0], sendData[1]]);
//   pythonProcess.stdout.on('data', (data) => {
//       // Do something with the data returned from python script
//       console.log(data.toString());
//   });
// });
