module.exports = function(app){

	app.get('/', function(req, res) {
		res.redirect('/thing');
	});

    /*
    	GET method route
    */
   
   	// Describe all the thing
    app.get('/thing', function(req, res){
        res.json(app.thingAction());
    });

    // List all the thing's GPIOs
    app.get('/thing/gpios', function(req, res){
        res.json(app.thing_gpiosAction());
    });

    // Describe the GPIO
    app.get('/thing/gpio/:slug', function(req, res){
        res.json(app.thing_gpio_nameAction(req.params.slug));
    });

    // List all the GPIO's events
    app.get('/thing/gpio/:slug/events', function(req, res){
        res.send('@TODO');
    });

    // Describe the event
    app.get('/thing/gpio/:slug/event/:id', function(req, res){
        res.send('@TODO');
    });

    // List all the GPIO's jobs
    app.get('/thing/gpio/:slug/jobs', function(req, res){
        res.send('@TODO');
    });

    // Describe the job
    app.get('/thing/gpio/:slug/job/:id', function(req, res){
        res.send('@TODO');
    });


    /*
    	POST method route
    */
    
    // Add a new GPIO to the Thing
    app.post('/thing/gpio/add', function(req, res){
        res.send('@TODO');
    });

	// Add a new event to a GPIO    
    app.post('/thing/gpio/:slug/event/add', function(req, res){
        res.send('@TODO');
    });

	// Add a new job to a GPIO    
    app.post('/thing/gpio/:slug/job/add', function(req, res){
        res.send('@TODO');
    });


    /*
    	PUT method route
    */
   
    // Edit a GPIO
    app.put('/thing/gpio/:slug', function(req, res){
        res.send('@TODO');
    });

	// Edit an event to a GPIO    
    app.put('/thing/gpio/:slug/event', function(req, res){
        res.send('@TODO');
    });

	// Edit a job to a GPIO    
    app.put('/thing/gpio/:slug/job', function(req, res){
        res.send('@TODO');
    });


    /*
    	DELETE method route
    */

    // Remove a GPIO to the Thing
    app.delete('/thing/gpio/:slug/delete', function(req, res){
        res.send('@TODO');
    });

	// Remove an event to a GPIO    
    app.delete('/thing/gpio/:slug/event/delete', function(req, res){
        res.send('@TODO');
    });

    // Remove a job to a GPIO    
    app.delete('/thing/gpio/:slug/job/delete', function(req, res){
        res.send('@TODO');
    });
}