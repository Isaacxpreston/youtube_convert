var AWS      = require('aws-sdk'),
    zlib     = require('zlib'),
    fs       = require('fs');
    s3Stream = require('s3-upload-stream')(new AWS.S3()),
// Set the client to be used for the upload. 
AWS.config.loadFromPath('./config.json');
// Create the streams 
var read = fs.createReadStream('/path/to/a/file');
var compress = zlib.createGzip();
var upload = s3Stream.upload({
  "Bucket": "isaacxpreston",
  "Key": "some name here"
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
 
// Pipe the incoming filestream through compression, and up to S3. 
read.pipe(compress).pipe(upload);