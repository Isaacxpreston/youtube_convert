const express = require('express');
const path = require('path')
const app = express();
app.use(express.static(__dirname + '/../../client/visualiser'));

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