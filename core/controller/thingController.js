module.exports = function(app){



	app.thingAction = function(req) {
	    var response = {
			status_code : 200,
			message : "success",
			data : {}
	    };

		try {
		    response.data = app.Thing.get();
		}
		catch(err) {
			response.status_code = err.code;
			response.message     = err.message;
		}

		return response;
	}

	app.thing_gpiosAction = function(req) {
	    var response = {
			status_code : 200,
			message : "success",
			data : {}
	    };
	    	
		try {
		    response.data = app.Thing.get().gpios;
		}
		catch(err) {
			response.status_code = err.code;
			response.message     = err.message;
		}

		return response;
	}

	app.thing_gpio_nameAction = function(req) {
	    var response = {
			status_code : 200,
			message : "success",
			data : {}
	    };
	    			
		try {
		    response.data = app.Thing.get().get_gpio(req);
		}
		catch(err) {
			response.status_code = err.code;
			response.message     = err.message;
			console.log(response);
		}

		return response;
	}

	app.thing_gpio_eventsAction = function(req) {
	    var response = {
			status_code : 200,
			message : "success",
			data : {}
	    };
	    			
		try {
		    response.data = app.Thing.get().get_gpio(req).events;
		}
		catch(err) {
			response.status_code = err.code;
			response.message     = err.message;
		}

		return response;
	}

	app.thing_gpio_eventAction = function(req) {
	    var response = {
			status_code : 200,
			message : "success",
			data : {}
	    };
	    	
		try {
		    response.data = app.Thing.get().get_gpio(req).get_event(req);
		}
		catch(err) {
			response.status_code = err.code;
			response.message     = err.message;
		}

		return response;
	}

	app.thing_gpio_jobsAction = function(req) {
	    var response = {
			status_code : 200,
			message : "success",
			data : {}
	    };
	    			
		try {
		    response.data = app.Thing.get().get_gpio(req).jobs;
		}
		catch(err) {
			response.status_code = err.code;
			response.message     = err.message;
		}

		return response;
	}

	app.thing_gpio_jobAction = function(req) {
	    var response = {
			status_code : 200,
			message : "success",
			data : {}
	    };
	    			
		try {
		    response.data = app.Thing.get().get_gpio(req).get_job(req);
		}
		catch(err) {
			response.status_code = err.code;
			response.message     = err.message;
		}

		return response;
	}

	app.thing_editAction = function(thing) {
	    var response = {
			status_code : 200,
			message : "success",
			data : {}
	    };
	    	
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
								if(j.frequency != job.frequency) {
									job.frequency = j.frequency;
								}								
							}
						});
					});
				}
			});
		});

	    var response = {
			status_code : 200,
			message : "success",
			data : {}
	    };

		try {
			response.data = app.Thing.save();	
		} catch(err) {
			response.status_code = err.code;
			response.message     = err.message;
		}

		return response;
	}
}