const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// APP SETUP & MIDDLEWARE
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());

app.get('/api/:tagId', function(req, res) {
  res.send(req.params.tagId);
});

app.get("*", (req, res) => (
  res.sendFile(path.resolve(__dirname, '../../client/visualiser', 'index.html'))
));

const PORT = process.env.PORT || 4001

app.listen(PORT, () => (
  console.log("video server running on port ", PORT)
))