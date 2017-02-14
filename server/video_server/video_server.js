const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// APP SETUP & MIDDLEWARE
const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../../videos'));

app.get('/api/:tagId', function(req, res) {
  console.log(__dirname)
  res.send('/' + req.params.tagId + '.mp4')
  // res.sendFile(express.static(__dirname + '/../../videos/' + req.params.tagId + '.mp4'));
});

app.get("*", (req, res) => (
  res.sendFile(path.resolve(__dirname, '../../client/visualiser', 'index.html'))
));

const PORT = process.env.PORT || 4001

app.listen(PORT, () => (
  console.log("video server running on port ", PORT)
))