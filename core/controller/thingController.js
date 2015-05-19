var stringify = require('json-stringify-safe');
module.exports = function(app){

	app.thingAction = function(req) {
		return stringify(app.Thing);
	}

	app.thing_gpiosAction = function(req) {
		return stringify(app.Thing.gpios);
	}

	app.thing_gpio_nameAction = function(req) {
		return stringify(app.Thing.get_gpio(req));
	}

	app.thing_gpio_eventsAction = function(req) {
		return stringify(app.Thing.get_gpio(req).events);
	}

	app.thing_gpio_eventAction = function(req_slug, req_id) {
		return stringify(app.Thing.get_gpio(req_slug).getEvent(req_id));
	}

	app.thing_gpio_jobsAction = function(req) {
		return stringify(app.Thing.get_gpio(req).jobs);
	}

	app.thing_gpio_jobAction = function(req_slug, req_id) {
		return stringify(app.Thing.get_gpio(req_slug).getJob(req_id));
	}
}