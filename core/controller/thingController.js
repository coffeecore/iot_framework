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

		thing.gpios.forEach(function(gpio){
			app.Thing.gpios.forEach(function(g){
				if(g.id == gpio.id) {

					if(g.name != gpio.name) {
						g.name = gpio.name;
					}

					if(g.pin != gpio.pin){
						g.pin = gpio.pin;
					}

					if(g.description != gpio.description){
						g.description = gpio.description;
					}

					gpio.events.forEach(function(evt){
						g.events.forEach(function(e){
							if(evt.id == e.id) {
								if(evt.name != e.name) {
									g.name = evt.name;
								}
							}
						});
					});
					// gpio.jobs.forEach(function(job){
					// 	g.jobs.forEach(function(j){
					// 		if(job.id == j.id) {
					// 			if(job.name != j.name) {
					// 				j.name = job.name;
					// 			}
					// 		}
					// 	});
					// });
				}
			});
		});
		console.log(app.Thing);
		app.Thing.save();
	}
}