const express = require('express');
const { upload } = require('./uploader');

const port = 3333;
const dataLocation = 'data';

const app = express();

app.use((req, res, next) => {
  req.rawBody = '';
  req.on('data', chunk => req.rawBody += chunk.toString('binary'));
  req.on('end', () => next());
});

app.post('/', (req, res) => {
  function getUrl(fileName) {
    return `${req.protocol}://${req.get('host')}/${fileName}`;
  }

  upload(req.rawBody, dataLocation).then(
    fileName => res.status(200).send({ url: getUrl(fileName) }),
    err => res.status(500).send(err)
  );
});

app.use('/', express.static(dataLocation));

console.log(`Parasitedb host listening on port ${port}.`);
app.listen(port);
