module.exports = function(app){

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Cache-Control");

        if (req.method === 'OPTIONS') {
            res.statusCode = 204;
            return res.end();
        } else {
            return next();
        }
    });

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
    app.get('/thing/gpio', function(req, res){
        res.json(app.thing_gpiosAction());
    });

    // Describe the GPIO
    app.get('/thing/gpio/:slug', function(req, res){
        var r = app.thing_gpio_nameAction(req);
        res.status(204).send(r);
    });

    // List all the GPIO's events
    app.get('/thing/gpio/:slug/event', function(req, res){
        var r = app.thing_gpio_eventsAction(req.params.slug);

        res.status(r.status_code);

        res.json(r);
    });

    // Describe the event
    app.get('/thing/gpio/:slug/event/:id', function(req, res){
        res.json(app.thing_gpio_eventAction(req.params.slug, req.params.id));
    });

    // List all the GPIO's jobs
    app.get('/thing/gpio/:slug/job', function(req, res){
        res.json(app.thing_gpio_jobsAction(req.params.slug));
    });

    // Describe the job
    app.get('/thing/gpio/:slug/job/:id', function(req, res){
        res.json(app.thing_gpio_jobAction(req.params.slug, req.params.id));
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

    // Edit Thing
    app.put('/thing', function(req, res){
        res.json(app.thing_editAction(req.body.thing));
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