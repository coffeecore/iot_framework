module.exports = function(app){

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Cache-Control");

        if (req.method === 'OPTIONS') {
            console.log('IN OPTION REQUEST');
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
        var r = app.thingAction();
        res.status(r.status_code).json(r);
    });

    // List all the thing's GPIOs
    app.get('/thing/gpio', function(req, res){
        var r = app.thing_gpiosAction();
        res.status(r.status_code).json(r);
    });

    // Describe the GPIO
    app.get('/thing/gpio/:slug', function(req, res){
        var r = app.thing_gpio_nameAction(req);
        console.log(r);
        res.json(r);
    });

    // List all the GPIO's events
    app.get('/thing/gpio/:slug/event', function(req, res){
        var r = app.thing_gpio_eventsAction(req);
        res.status(r.status_code).json(r);
    });

    // Describe the event
    app.get('/thing/gpio/:slug/event/:id', function(req, res){
        var r = app.thing_gpio_eventAction(req);
        res.status(r.status_code).json(r);
    });

    // List all the GPIO's jobs
    app.get('/thing/gpio/:slug/job', function(req, res){
        var r = app.thing_gpio_jobsAction(req);
        res.status(r.status_code).json(r);
    });

    // Describe the job
    app.get('/thing/gpio/:slug/job/:id', function(req, res){
        var r = app.thing_gpio_jobAction(req);
        res.status(r.status_code).json(r);
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
        var r = app.thing_editAction(req.body.thing);
        res.status(r.status_code).json(r);
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