const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const ytdl = require('ytdl-core');
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
  console.log("yo")
  res.send("OK!")
  // .on('error', (err) => {
  //   console.log("error", err);
  //   res.send(err)
  // })
  // .on('close', () =>{
  //   //todo - setTimeout and run del
  //   console.log("successfully converted live.mp4")
  //   res.send(req.body.id)
  // })
  // .pipe(fs.createWriteStream('/videos/live.mp4')
  //   .on('close', () =>{
  //     //todo - setTimeout and run del
  //     console.log("successfully converted live.mp4")
  //     res.send(req.body.id)
  //   })
  // )
});

app.get('/api/file/:filename', function(req, res) {
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