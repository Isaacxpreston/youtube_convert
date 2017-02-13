const express = require('express');
const router = express.Router()
const fs = require('fs');
const ytdl = require('ytdl-core');

router.post('/convert', (req, res) => {
  ytdl(req.body.url , { filter: (format) => { 
      return format.container === 'mp4';
    }})
    .on('error', () => {
      console.log("error");
      res.send("error")
    })
    .pipe(fs.createWriteStream('../client/app/components/' + req.body.id + '.mp4')
      .on('close', () =>{
        console.log("successfully converted")
        res.send('./' + req.body.id + '.mp4')
      })
    )
})

module.exports = router