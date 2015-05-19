var stringify = require('json-stringify-safe');
module.exports = function(app){

	app.thingAction = function(req) {
		return stringify(app.Thing);
	}

	app.thing_gpiosAction = function(req) {
		return stringify(app.Thing.getGpios());
	}

	app.thing_gpio_nameAction = function(req) {
		return stringify(app.Thing.getGpio(req));
	}

	app.thing_gpio_eventsAction = function(req) {
		return stringify(app.Thing.getGpio(req).events);
	}

	app.thing_gpio_eventAction = function(req_slug, req_id) {
		return stringify(app.Thing.getGpio(req_slug).getEvent(req_id));
	}

	app.thing_gpio_jobsAction = function(req) {
		return stringify(app.Thing.getGpio(req).jobs);
	}

	app.thing_gpio_jobAction = function(req_slug, req_id) {
		return stringify(app.Thing.getGpio(req_slug).getJob(req_id));
	}
}