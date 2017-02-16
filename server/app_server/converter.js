const express = require('express');
const router = express.Router()
const ytdl = require('ytdl-core');
const AWS = require('aws-sdk');
// AWS.config.loadFromPath('../../config.json');
const zlib = require('zlib');
s3Stream = require('s3-upload-stream')(new AWS.S3());
const compress = zlib.createGzip();
const PubNub = require('pubnub')
pubnub = new PubNub({
    publishKey : 'pub-c-6d1cc120-4d11-4db6-8d32-e617c064a066',
    subscribeKey : 'sub-c-6fa72432-f415-11e6-b0ac-0619f8945a4f'
})

let pubStatus = (message) => {
    pubnub.publish(
    {
      channel : "convert_percent",
      message
    },
    (status, response) => {
      if (status.error !== false) {
        console.log("pubnub error", status)
      }
    }
  )
}

router.post('/convert', function(req, res) {
  pubStatus("starting conversion")
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
        pubStatus("converting " +  prevPercent + "%")
      }
      if(currentPercent > 99) {
        pubStatus("uploading")
      }
    });
  })
  .on('error', (error) => {
    console.log("error in ytdl", error);
    pubStatus("error")
    res.send(error)
  })
  .pipe(upload)
  .on('error', function (error) {
    console.log("error in s3 upload", error);
    pubStatus("error")
    res.send(error)
  })
  .on('uploaded', function (details) {
    pubStatus("uploaded!")
    setTimeout(() => {
      pubStatus(" ")
    }, 2000)
    console.log("uploaded!", details.Location);
    res.send(req.body.id)
  });
});

module.exports = router