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
			data : []
	    };
	    			
		try {
		    response.data.push(app.Thing.get().get_gpio(req));
		}
		catch(err) {
			response.status_code = err.code;
			response.message     = err.message;
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

	app.thing_editAction = function(req) {
	    var response = {
			status_code : 200,
			message : "success",
			data : {}
	    };
	    
		if(typeof req.body.thing == 'undefined') {
			throw new AppException(400, "missing thing argument");
		}

		if(req.body.thing.name != app.Thing.name){
			app.Thing.name = req.body.thing.name;
		}

		if(req.body.thing.description != app.Thing.description){
			app.Thing.description = req.body.thing.description;
		}

		if(req.body.thing.author != app.Thing.author){
			app.Thing.author = req.body.thing.author;
		}

		app.Thing.gpios.forEach(function(gpio){
			req.body.thing.gpios.forEach(function(g){
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

	app.thing_gpio_editAction =function(req) {
	    var response = {
			status_code : 200,
			message : "success",
			data : {}
	    };
	    
		if(typeof req.body.gpio == 'undefined') {
			throw new AppException(400, "missing gpio argument");
		}

		app.Thing.gpios.forEach(function(gpio){
			req.body.gpio.forEach(function(g){
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

		try {
			response.data = app.Thing.save();	
		} catch(err) {
			response.status_code = err.code;
			response.message     = err.message;
		}

		return response;	
	}
}