const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const ytdl = require('ytdl-core');

var AWS      = require('aws-sdk');
AWS.config.loadFromPath('../../config.json');
    var zlib     = require('zlib');
    s3Stream = require('s3-upload-stream')(new AWS.S3());
// Set the client to be used for the upload. 
// AWS.config.loadFromPath('config.json');
// Create the streams 
// var read = fs.createReadStream('/path/to/a/file');
var compress = zlib.createGzip();
// var upload = s3Stream.upload({
//   "Bucket": "isaacxpreston",
//   "Key": "uploadme.mp4"
// });
// upload.maxPartSize(20971520); // 20 MB 
// upload.concurrentParts(5);
// upload.on('error', function (error) {
//   console.log(error);
// });
// upload.on('part', function (details) {
//   console.log(details);
// });
// upload.on('uploaded', function (details) {
//   console.log(details);
// });


const app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(__dirname + '/../../client/visualiser'));

app.get('/api/convert', function(req, res) {
  var upload = s3Stream.upload({
  "Bucket": "isaacxpreston",
  "Key": "doesitstillworknoworno.mp4",
  "ACL": "public-read"
  });
  upload.maxPartSize(20971520); // 20 MB 
  upload.concurrentParts(5);
  ytdl('https://www.youtube.com/watch?v=mWISiHcGoNg' ,
    { 
      filter: (format) => { 
        return format.container === 'mp4';
      },
      quality: 18
    }
  )
  .on('error', (err) => {
    console.log("error", err);
    res.send(err)
  })
  .pipe(upload);
  upload.on('error', function (error) {
  console.log("error", error);
});
upload.on('part', function (details) {
  console.log("details", details);
});
upload.on('uploaded', function (details) {
  console.log("uploaded!", details.Location);
  res.send(details.Location)
});
  // .pipe(fs.createWriteStream('/videos/live.mp4')
  //   .on('close', () =>{
  //     //todo - setTimeout and run del
  //     console.log("successfully converted live.mp4")
  //     res.send(req.body.id)
  //   })
  // )
});

app.get('/api/file/:filename', function(req, res) {

  // var params = {
  //   localFile: '../../client/visualiser/videos/example.txt',

  //   s3Params: {
  //     Bucket: "isaacxpreston",
  //     Key: "name of file here",
  //   },
  // };
  // var uploader = client.uploadFile(params);
  // uploader.on('error', function(err) {
  //   console.error("unable to upload:", err.stack);
  // });
  // uploader.on('progress', function() {
  //   console.log("progress", uploader.progressMd5Amount,
  //             uploader.progressAmount, uploader.progressTotal);
  // });
  // uploader.on('end', function() {
  //   console.log("done uploading");
  // });

  // res.send('/videos/' + req.params.filename + '.mp4')
  res.send("https://isaacxpreston.s3-us-west-1.amazonaws.com/doesitstillworknoworno.mp4")
});

app.post('/api/convert', (req, res) => {
  ytdl(req.body.url ,
    { 
      filter: (format) => { 
        return format.container === 'mp4';
      },
      quality: 18
    }
  )
  .on('error', (err) => {
    console.log("error", err);
    res.send("error")
  })
  .pipe(fs.createWriteStream('/videos/' + req.body.id + '.mp4')
    .on('close', () =>{
      //todo - setTimeout and run del
      console.log("successfully converted: " + req.body.id + '.mp4')
      res.send(req.body.id)
    })
  )
  // res.send(req.body.url)
})

app.get("*", (req, res) => (
  res.sendFile(path.resolve(__dirname, '../../client/visualiser', 'index.html'))
));

const PORT = process.env.PORT || 4001

app.listen(PORT, () => (
  console.log("video server running on port ", PORT)
))