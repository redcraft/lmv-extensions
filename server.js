var express = require('express');
var https = require('https');
var formurlencoded = require('form-urlencoded');

var config = {};
if (process.env.CLIENT_ID && process.env.CLIENT_SECRET) {
    config.client_id = process.env.CLIENT_ID;
    config.client_secret = process.env.CLIENT_SECRET;
} else {
    try {
        config = require('./config.json');
    } catch(e) {
        console.log("No config defined");
    }
}
config.grant_type = 'client_credentials';

var app = express();
app.use('/', express.static(__dirname + '/public'));

var router = express.Router();
router.get('/extensions', function (req, res) {
    res.json([
		{"_id":"555cb32a904e18c811dcf24a","id":"Autodesk.ADN.Viewing.Extension.ScreenShotManager","name":"ScreenShotManager ","file":"Autodesk.ADN.Viewing.Extension.ScreenShotManager.js"},
		{"_id":"545f1c0abe50d16010d233ae","id":"Autodesk.ADN.Viewing.Extension.Toolbar","name":"Toolbar ","file":"Autodesk.ADN.Viewing.Extension.Toolbar.js"},
		{"_id":"546530bd342d865016c6839d","id":"Autodesk.ADN.Viewing.Extension.DockingPanel","name":"Docking Panel ","file":"Autodesk.ADN.Viewing.Extension.DockingPanel.js"},
		{"_id":"551844023dfebce004ce4010","id":"Autodesk.ADN.Viewing.Extension.Explorer","name":"Explorer ","file":"Autodesk.ADN.Viewing.Extension.Explorer.js"}
	]);
});

var authWithCredentials = function(req, authRes) {
    var options = {
        host: 'developer.api.autodesk.com',
        path: '/authentication/v1/authenticate',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    var post_req = https.request(options, function(res) {
        var body = '';
        res.on('data', function(chunk) {
            body += chunk;
        });
        res.on('end', function() {
            authRes.setHeader("Content-Type", "application/json");
            authRes.end(body);
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });

    post_req.write(formurlencoded.encode(config));
    post_req.end();
}

var authWithoutCredentials = function(req, authRes) {
    var options = {
        host: 'examples.developer.autodesk.com',
        path: '/lmv-extensions/api/auth',
        method: 'GET'
    };

    https.get(options, function(res) {
        var body = '';
        res.on('data', function(chunk) {
            body += chunk;
        });
        res.on('end', function() {
            authRes.setHeader("Content-Type", "application/json");
            authRes.end(body);
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });

}

router.get('/auth', function (req, authRes) {
    if(config.client_id && config.client_secret) {
        authWithCredentials(req, authRes);
    }
    else {
        authWithoutCredentials(req, authRes)
    }
});



app.use('/api', router);

app.set('port', process.env.PORT || process.argv[2] || 3000);
var server = app.listen(app.get('port'), function() {

    console.log('Server listening on: ');
    console.log(server.address());
    console.log('Open this link to see the app: http://localhost:' + app.get('port') + '/');
});