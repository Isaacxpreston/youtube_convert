const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const ytdl = require('ytdl-core');
const AWS = require('aws-sdk');
AWS.config.loadFromPath('../../config.json');
const zlib = require('zlib');
s3Stream = require('s3-upload-stream')(new AWS.S3());
const compress = zlib.createGzip();
const PubNub = require('pubnub')
pubnub = new PubNub({
    publishKey : 'pub-c-6d1cc120-4d11-4db6-8d32-e617c064a066',
    subscribeKey : 'sub-c-6fa72432-f415-11e6-b0ac-0619f8945a4f'
})
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
  pubnub.publish(
    {
      channel : "convert_percent",
      message : "starting conversion"
    },
    (status, response) => {
      if (status.error !== false) {
        console.log("pubnub error", status)
      }
    }
  )
  let upload = s3Stream.upload({
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
  .on('response', (res) => {
    let totalSize = res.headers['content-length'];
    let dataRead = 0;
    let prevPercent = 0;
    let currentPercent = 0
    res.on('data', function(data) {
      dataRead += data.length;
      currentPercent = ((dataRead / totalSize) * 100).toFixed()
      if(prevPercent !== currentPercent) {
        prevPercent = currentPercent
        pubnub.publish(
          {
            channel : "convert_percent",
            message : "converting: " +  prevPercent + "%"
          },
          (status, response) => {
            if (status.error !== false) {
              console.log("pubnub error", status)
            }
          }
        )
      }
      if(currentPercent > 99) {
        pubnub.publish(
          {
            channel : "convert_percent",
            message : "successfully converted, uploading to s3"
          },
          (status, response) => {
            if (status.error !== false) {
              console.log("pubnub error", status)
            }
          }
        )
      }
    });
  })
  .on('error', (err) => {
    console.log("error in ytdl", err);
    res.send(err)
  })
  .pipe(upload)
  .on('error', function (error) {
    console.log("error in s3 upload", error);
    res.send(error)
  })
  .on('uploaded', function (details) {
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