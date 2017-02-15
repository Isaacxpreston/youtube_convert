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
var compress = zlib.createGzip();
const app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(__dirname + '/../../client/visualiser'));

app.post('/api/convert', function(req, res) {
  var upload = s3Stream.upload({
  "Bucket": "isaacxpreston",
  "Key": req.body.id + ".mp4",
  "ACL": "public-read"
  });
  upload.maxPartSize(20971520);
  upload.concurrentParts(5);
  ytdl(req.body.url,
    { 
      filter: (format) => { 
        return format.container === 'mp4';
      },
      quality: 18
    }
  )
  .on('error', (err) => {
    console.log("error in ytdl", err);
    res.send(err)
  })
  .pipe(upload);
  upload.on('error', function (error) {
    console.log("error in s3 upload", error);
    res.send(error)
  });
  upload.on('part', function (details) {
    console.log("s3 details", details);
  });
  upload.on('uploaded', function (details) {
    console.log("s3 uploaded!", details.Location);
    res.send(req.body.id)
  });
});

app.get('/api/file/:filename', function(req, res) {
  res.send("https://isaacxpreston.s3-us-west-1.amazonaws.com/" + req.params.filename + ".mp4")
});

app.get("*", (req, res) => (
  res.sendFile(path.resolve(__dirname, '../../client/visualiser', 'index.html'))
));

const PORT = process.env.PORT || 4001

app.listen(PORT, () => (
  console.log("video server running on port ", PORT)
))