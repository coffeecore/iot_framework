var express    = require('express');
var bodyParser = require("body-parser");
var app        = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var file_object = require('./conf/thing');

// Loading models
var Thing = require('./core/model/thing');

app.Thing = new Thing(file_object);
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