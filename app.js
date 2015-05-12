var express = require('express');
var app = express();

// Loading models
var Thing = require('./core/model/thing');

app.Thing = new Thing({
	name: 'Micro culture'
});

app.Thing.addGpio({name: 'moisture'});

// Loading controller
require('./core/controller/thingController')(app);

// Loading routes
require('./core/routes')(app);

var server = app.listen(3000, function () {

	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);

});