module.exports = function(app){

	app.thingAction = function(req) {
		return JSON.stringify(app.Thing);
	}

	app.thing_gpiosAction = function(req) {
		return app.Thing.getGpios();
	}

	app.thing_gpio_nameAction = function(req) {
		return app.Thing.getGpio(req);
	}

}