const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const ytdl = require('ytdl-core');

var AWS      = require('aws-sdk');
AWS.config.loadFromPath('config.json');
    var zlib     = require('zlib');
    s3Stream = require('s3-upload-stream')(new AWS.S3()),
// Set the client to be used for the upload. 
// AWS.config.loadFromPath('config.json');
 AWS.config.update({ "accessKeyId": "AKIAIPHGWAUV5F5J4AIA", "secretAccessKey": "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", "region": "us-west-1" });
// Create the streams 
// var read = fs.createReadStream('/path/to/a/file');
var compress = zlib.createGzip();
var upload = s3Stream.upload({
  "Bucket": "isaacxpreston",
  "Key": "uploadme.mp4"
});
upload.maxPartSize(20971520); // 20 MB 
upload.concurrentParts(5);
upload.on('error', function (error) {
  console.log(error);
});
upload.on('part', function (details) {
  console.log(details);
});
upload.on('uploaded', function (details) {
  console.log(details);
});

// const s3 = require('s3');
// const client = s3.createClient({
//   maxAsyncS3: 20,
//   s3RetryCount: 3,
//   s3RetryDelay: 1000,
//   multipartUploadThreshold: 20971520,
//   multipartUploadSize: 15728640,
//   s3Options: {
//     accessKeyId: "AKIAIPHGWAUV5F5J4AIA",
//     secretAccessKey: "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",
//     region: "us-west-1",
//   },
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
  // .pipe(fs.createWriteStream('/videos/live.mp4')
  //   .on('close', () =>{
  //     //todo - setTimeout and run del
  //     console.log("successfully converted live.mp4")
  //     res.send(req.body.id)
  //   })
  // )

  // todo - implement
  // .pipe(uploadFromStream(s3));

  // function uploadFromStream(s3) {
  //   var pass = new stream.PassThrough();

  //   var params = {Bucket: BUCKET, Key: KEY, Body: pass};
  //   s3.upload(params, function(err, data) {
  //     console.log(err, data);
  //   });

  //   return pass;
  // }
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
  res.send("https://s3-us-west-1.amazonaws.com/isaacxpreston/testing.mp4")
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