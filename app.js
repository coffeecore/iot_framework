var express = require('express');
var app = express();

// Loading models
var Thing = require('./core/model/thing');

app.Thing = new Thing(require('./conf/thing'));
console.log(app.Thing);
app.Thing.run_events();
app.Thing.run_jobs();

// Loading controller
require('./core/controller/thingController')(app);

// Loading routes
require('./core/routes')(app);

var server = app.listen(8080, function () {

	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);

});