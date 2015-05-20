module.exports = function(app){

	app.thingAction = function(req) {
		return app.Thing.get();
	}

	app.thing_gpiosAction = function(req) {
		return app.Thing.get().gpios;
	}

	app.thing_gpio_nameAction = function(req) {
		return app.Thing.get().get_gpio(req);
	}

	app.thing_gpio_eventsAction = function(req) {
		return app.Thing.get().get_gpio(req).events;
	}

	app.thing_gpio_eventAction = function(req_slug, req_id) {
		return app.Thing.get().get_gpio(req_slug).get_event(req_id);
	}

	app.thing_gpio_jobsAction = function(req) {
		return app.Thing.get().get_gpio(req).jobs;
	}

	app.thing_gpio_jobAction = function(req_slug, req_id) {
		return app.Thing.get().get_gpio(req_slug).get_job(req_id);
	}

	app.thing_editAction = function(thing) {

		if(thing.name != app.Thing.name){
			app.Thing.name = thing.name;
		}

		app.Thing.save();
	}
}