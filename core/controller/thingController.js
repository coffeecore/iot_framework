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

		if(thing.description != app.Thing.description){
			app.Thing.description = thing.description;
		}

		if(thing.author != app.Thing.author){
			app.Thing.author = thing.author;
		}

		app.Thing.gpios.forEach(function(gpio){
			thing.gpios.forEach(function(g){
				if(gpio.id == g.id) {
					if(g.name != gpio.name) {
						gpio.name = g.name;
					}

					if(g.pin != gpio.pin){
						gpio.pin = g.pin;
					}

					if(g.description != gpio.description){
						gpio.description = g.description;
					}

					gpio.events.forEach(function(evt){
						g.events.forEach(function(e){
							if(evt.id == e.id){
								if(e.name != evt.name) {
									evt.name = e.name;
								}								
							}
						});
					});

					gpio.jobs.forEach(function(job){
						g.jobs.forEach(function(j){
							if(job.id == j.id){
								if(j.name != job.name) {
									job.name = j.name;
								}								
							}
						});
					});
				}
			});
		});

		app.Thing.save();
	}
}