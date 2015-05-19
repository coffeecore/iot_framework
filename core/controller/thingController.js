module.exports = function(app){

	app.thingAction = function(req) {
		var result = app.Thing;
		return result;
	}

	app.thing_gpiosAction = function(req) {
		return app.Thing.getGpios();
	}

	app.thing_gpio_nameAction = function(req) {
		return app.Thing.getGpio(req);
	}

}