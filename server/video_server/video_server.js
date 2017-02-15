const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// APP SETUP & MIDDLEWARE
const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../../client/visualiser'));

app.get('/api/file/:filename', function(req, res) {
  res.send('/videos/' + req.params.filename + '.mp4')
});

app.post('/api/test', function(req, res) {
  res.send("YEAUH")
});

app.get("*", (req, res) => (
  res.sendFile(path.resolve(__dirname, '../../client/visualiser', 'index.html'))
));

const PORT = process.env.PORT || 4001

app.listen(PORT, () => (
  console.log("video server running on port ", PORT)
))