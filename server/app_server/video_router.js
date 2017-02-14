const express = require('express');
const router = express.Router()
const fs = require('fs');
const ytdl = require('ytdl-core');

router.post('/convert', (req, res) => {
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
  .pipe(fs.createWriteStream('../../client/visualiser/videos/' + req.body.id + '.mp4')
    .on('close', () =>{
      //todo - setTimeout and run del
      console.log("successfully converted: " + req.body.id + '.mp4')
      res.send(req.body.id)
    })
  )
})

module.exports = router