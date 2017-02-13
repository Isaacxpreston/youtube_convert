const express = require('express');
const router = express.Router()
const fs = require('fs');
const ytdl = require('ytdl-core');
const cloudinary = require('cloudinary');
const api_keys = require('../api_keys.js')

cloudinary.config({ 
  cloud_name: api_keys.cloudinary.name, 
  api_key: api_keys.cloudinary.key, 
  api_secret: api_keys.cloudinary.secret 
});

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
    .pipe(fs.createWriteStream('../videos/' + req.body.id + '.mp4')
      .on('close', () =>{
        console.log("successfully converted, uploading to cloudinary...")
        cloudinary.uploader.upload_large('../videos/' + req.body.id + '.mp4', 
          function(result) {
            console.log("cloudinary response", result.public_id)

            //todo - destroy upload after set amount of time (ie. 5 minutes after upload)
            // cloudinary.uploader.destroy(result.public_id, function(result) {
            //   console.log("destroyed upload", result)
            // });
            res.send(result.secure_url)
          },
        { resource_type: "video" })
      })
    )
})

module.exports = router