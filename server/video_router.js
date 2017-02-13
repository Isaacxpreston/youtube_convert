const express = require('express');
const router = express.Router()
const fs = require('fs');
const ytdl = require('ytdl-core');
const cloudinary = require('cloudinary');
const api_keys = require('../api_keys.js')
console.log(api_keys.cloudinary)

cloudinary.config({ 
  cloud_name: api_keys.cloudinary.name, 
  api_key: api_keys.cloudinary.key, 
  api_secret: api_keys.cloudinary.secret 
});

router.post('/convert', (req, res) => {
  ytdl(req.body.url , { filter: (format) => { 
      return format.container === 'mp4';
    }})
    .on('error', () => {
      console.log("error");
      res.send("error")
    })
    .pipe(fs.createWriteStream('../videos' + req.body.id + '.mp4')
      .on('close', () =>{
        console.log("successfully converted, uploading to cloudinary...")

        res.send('./' + req.body.id + '.mp4')
      })
    )
})

module.exports = router