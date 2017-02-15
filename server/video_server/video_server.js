const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const ytdl = require('ytdl-core');
var s3 = require('s3');

// APP SETUP & MIDDLEWARE
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
  .pipe(fs.createWriteStream('/videos/live.mp4')
    .on('close', () =>{
      //todo - setTimeout and run del
      console.log("successfully converted live.mp4")
      res.send(req.body.id)
    })
  )

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
  var client = s3.createClient({
  maxAsyncS3: 20,     // this is the default
  s3RetryCount: 3,    // this is the default
  s3RetryDelay: 1000, // this is the default
  multipartUploadThreshold: 20971520, // this is the default (20 MB)
  multipartUploadSize: 15728640, // this is the default (15 MB)
  s3Options: {
    accessKeyId: "AKIAIPHGWAUV5F5J4AIA",
    secretAccessKey: "5Bx1WvpIDdRUYAnxlpvZz/1KrUSJmvHxZ/Uy9CQJ",
    region: "us-west-1",
    // endpoint: 's3.yourdomain.com',
    // sslEnabled: false
    // any other options are passed to new AWS.S3()
    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
  },
});

  var params = {
    localFile: '../../client/visualiser/videos/example.txt',

    s3Params: {
      Bucket: "isaacxpreston",
      Key: "AKIAIPHGWAUV5F5J4AIA",
      // other options supported by putObject, except Body and ContentLength.
      // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
    },
  };
  var uploader = client.uploadFile(params);
  uploader.on('error', function(err) {
    console.error("unable to upload:", err.stack);
  });
  uploader.on('progress', function() {
    console.log("progress", uploader.progressMd5Amount,
              uploader.progressAmount, uploader.progressTotal);
  });
  uploader.on('end', function() {
    console.log("done uploading");
  });
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