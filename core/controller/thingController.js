var stringify = require('json-stringify-safe');
module.exports = function(app){

	app.thingAction = function(req) {
		return stringify(app.Thing);
	}

	app.thing_gpiosAction = function(req) {
		return app.Thing.getGpios();
	}

	app.thing_gpio_nameAction = function(req) {
		return app.Thing.getGpio(req);
	}

}