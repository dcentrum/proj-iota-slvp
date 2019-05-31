var express = require('express');
var bodyParser = require('body-parser');
var ipfs = require('./ipfsService.js');

var express = require('express');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//try http://localhost:4000/ipfs/get?ipfshash=QmTgC2pWbbAfZ5UpRYsLgi62qbcormwnA1QBH2jarFwJ8Z
app.get('/ipfs/get', async (req, res) => {
  ipfs.get(req.query.ipfshash).then((result) => {
    res.status(200).json({ path: result[0].path, content: result[0].content.toString('utf8') });
  }).catch((err) => {
    res.status(500).json({ error: err.toString() })
  });
});
app.post('/ipfs/files', upload.array('ipfsfiles'), function (req, res, next) {
  req.files.forEach(file => {
    ipfs.add(file.buffer).then((result) => {
      res.status(200).json({ hash: result[0].hash });
    }).catch((err) => {
      res.status(500).json({ error: err.toString() })
    });
  });
});

app.post('/ipfs/file', upload.single('ipfsfile'), function (req, res, next) {
  ipfs.add(req.file.buffer).then((result) => {
    res.status(200).json({ hash: result[0].hash });
  }).catch((err) => {
    res.status(500).json({ error: err.toString() })
  });
});

app.post('/ipfs/add', async (req, res) => {
  ipfs.add(req.body.data).then((result) => {
    res.status(200).json({ hash: result[0].hash });
  }).catch((err) => {
    res.status(500).json({ error: err.toString() })
  });
});

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});