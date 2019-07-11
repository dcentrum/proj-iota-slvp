var express = require('express');
var bodyParser = require('body-parser');
var appSrv = require('./AppService.js');
var express = require('express');
var multer = require('multer');
var mongoose = require('mongoose');
var upload = multer()
//var TChallan = require('./models/TChallan');
var models = require('./models');
var app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

models.connectDb().then(async () => {
  console.log("mongodb connected")
});

//try http://localhost:4000/api/hello
app.get('/api/hello', async (req, res) => {
  try {
    res.status(200).json({ message: "hello" });
  } catch (err) {
    throw res.status(500).json({ error: err.toString() })
  }
});

//try http://localhost:4000/api/ipfs/getimage?ipfshash=QmRuDCUrEx3FTLLebdmC71TySwcXaWJCxzioWzoeSnHHSv
app.get('/api/ipfs/getimage', async (req, res) => {
  try {
    var img = await appSrv.getImage(req.query.ipfshash);
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': img.length
    });
    res.end(img);
  } catch (err) {
    throw res.status(500).json({ error: err.toString() })
  }
});
app.post('/api/challan/appeal/action', upload.single('ipfsfile'), async (req, res) => {
  try {
    const result = await appSrv.appealAction(req.body.challannum,req.body.accept,req.body.comments);
    return res.status(200).json(result)
  } catch (err) {
    throw res.status(500).json({ error: err.toString() })
  }
});
app.post('/api/challan/appeal', upload.single('ipfsfile'), async (req, res) => {
  try {
   
    const result = await appSrv.appealChallan(req.body.challannum, req.body.comments);
    return res.status(200).json(result)
  } catch (err) {
    throw res.status(500).json({ error: err.toString() })
  }
});
app.post('/api/ipfs/file', upload.single('ipfsfile'), async (req, res) => {
  try {
    //console.log(req);
    const result = await appSrv.addChallan(req.body.platenum, req.file.buffer, req.body.geoLat, req.body.geoLng, req.body.desc)
    //appSrv.ProcessFile(req.body.platenum, req.file.buffer, req.body.geoLat, req.body.geoLng, req.body.desc);
    return res.status(200).json(result)
  } catch (err) {
    throw res.status(500).json({ error: err.toString() })
  }
});
//http://localhost:4000/api/iota/channel/VSVIGXXT9SPPKPAOSNTPRAYSEMHWLYEYKTVHBWLT9RIZYHRNPTBGVASNVMLZ9LXJZHYWIXZJBDDUT9TVX
app.get('/api/iota/channel/:root', async (req, res) => {
  try {
    var result = await appSrv.getChannel(req.params.root);
    res.status(200).json(result);
  } catch (err) {
    throw res.status(500).json({ error: err.toString() })
  }
});
app.get('/api/challans/:platenum?/:date?/:isAppealed?/:isPaid?', async (req, res) => {
  try {
    var platenum = req.params.platenum; //either a value or undefined
    var date = req.params.date;
    var isAppealed = req.params.isAppealed;
    var isPaid = req.params.isPaid;
    var result = await appSrv.getMChallans(platenum, date, isAppealed, isPaid)
    return res.status(200).json(result);
  } catch (err) {
    throw res.status(500).json({ error: err.toString() })
  }
});



app.listen(4000, function () {
  console.log('App listening on port 4000!');
});
