const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const spawn = require("child_process").spawn;
const pythonProcess = spawn('python',["script.py"]);
const QrCode = require('qrcode-reader');
const qr = new QrCode();
const fs = require('fs');
var Jimp = require("jimp");
var buffer = fs.readFileSync(__dirname + '/image.png');

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


pythonProcess.stdout.on('data', (data) => {
    // Do something with the data returned from python script
    console.log(data.toString());
});


qr.callback = function(error, result) {
  if(error) {
    console.log(error)
    return;
  }
  console.log(result)
}


Jimp.read(buffer, function(err, image) {
    if (err) {
        console.error(err);
        // TODO handle error
    }
    var qr = new QrCode();
    qr.callback = function(err, value) {
        if (err) {
            console.error(err);
            // TODO handle error
        }
        console.log(value.result);
        console.log(value);
    };
    qr.decode(image.bitmap);
});
