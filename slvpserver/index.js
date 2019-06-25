var express = require('express');
var bodyParser = require('body-parser');
var appSrv = require('./AppService.js');
var express = require('express');
var multer = require('multer');
var upload = multer()
//var TChallan = require('./models/TChallan');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
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

app.post('/api/ipfs/file', upload.single('ipfsfile'), async (req, res) => {
  try {
    const result = await appSrv.ProcessFile(req.body.platenum, req.file.buffer, req.body.geoLat, req.body.geoLng, req.body.desc);
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
app.get('/api/challans/:platenum', async (req, res) => {
  try {
    var result = await appSrv.getChallans(req.params.platenum);
    res.status(200).json(result);
  } catch (err) {
    throw res.status(500).json({ error: err.toString() })
  }
});
// app.get('/v2/users/:username',
//   findUserByUsernameMiddleware,
//   function(request, response, next){
//   return response.render('user', request.user);
// });
// app.get('/v2/admin/:username',
//   findUserByUsernameMiddleware,
//   function(request, response, next){
//   return response.render('admin', request.user);
// });

app.listen(4000, function () {
  console.log('App listening on port 4000!');
});