var express = require('express');

var app = express();
app.use('/', express.static(__dirname + '/public'));
var router = express.Router();

///////////////////////////////////////////////////////////////////////////////
//
//
///////////////////////////////////////////////////////////////////////////////
router.get('/', function (req, res) {
    res.json([
		{"_id":"555cb32a904e18c811dcf24a","id":"Autodesk.ADN.Viewing.Extension.ScreenShotManager","name":"ScreenShotManager ","file":"Autodesk.ADN.Viewing.Extension.ScreenShotManager.js"},
		{"_id":"545f1c0abe50d16010d233ae","id":"Autodesk.ADN.Viewing.Extension.Toolbar","name":"Toolbar ","file":"Autodesk.ADN.Viewing.Extension.Toolbar.js"}
	]);
});

app.use('/api/extensions', router);

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {

    console.log('Server listening on: ');
    console.log(server.address());
});