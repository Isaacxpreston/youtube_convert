const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const webpack = require('webpack');
const videoRoute = require('./video_router.js')
const config = require('../../webpack.config.js');

// APP SETUP & MIDDLEWARE
const app = express();
const compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));
app.use(bodyParser.json());
app.use('/video', videoRoute)

app.get("*", (req, res) => (
  res.sendFile(path.resolve(__dirname, '../../client/app', 'index.html'))
));

const PORT = process.env.PORT || 4000

app.listen(PORT, () => (
  console.log("App running on port ", PORT)
))