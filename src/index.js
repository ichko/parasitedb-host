const express = require('express');
const { upload } = require('./uploader');

const port = 3000;
const dataLocation = 'pieces';

const app = express();

app.use(`/${dataLocation}`, express.static(dataLocation));

app.use(function (req, res, next) {
  req.rawBody = '';
  req.on('data', chunk => req.rawBody += chunk.toString('binary'));
  req.on('end', () => next());
});

app.post('/upload', function (req, res) {
  function getUrl(fileName) {
    return `${req.protocol}://${req.get('host')}/${dataLocation}/${fileName}`;
  }

  upload(req.rawBody, dataLocation).then(
    fileName => res.status(200).send({ url: getUrl(fileName) }),
    err => res.status(500).send(err)
  );
});

console.log(`Parasitedb host listening on port ${port}.`);
app.listen(port);
