require('dependency');

var app        = express();
app.use(BodyParser.json());

// Loading controller
require('./core/controller/thingController')(app);

// Loading routes
require('./core/routes')(app);

app.Thing = new Thing(ConfThing);
app.Thing.run_events();
app.Thing.run_jobs();

var server = app.listen(8080, function () {

	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);

});