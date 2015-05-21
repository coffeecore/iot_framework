var Gpio = require('./gpio');
var fs   = require('fs');

var AppException = function(code, message) {
	this.code    = code;
	this.message = message;
};

function Thing (data) {
	// Build Gpios
	var thing_gpios = new Array();
	data.gpios.forEach(function(gpio){
		thing_gpios.push(new Gpio(gpio));
	});

	this.name        = data.name;
	this.description = data.description;
	this.author      = data.author;
	this.gpios       = thing_gpios;
}

Thing.prototype.run_events = function() {
	var that = this;
	setInterval(function(){
		that.gpios.forEach(function(gpio) {
			gpio.events.forEach(function(e) {
				e.listen(gpio.value());
			});
		});
	}, 1000);	
}

Thing.prototype.run_jobs = function() {
	this.gpios.forEach(function(gpio) {
		gpio.jobs.forEach(function(j){
			j.schedule();
		});
	});
}

Thing.prototype.get = function(){
	this.gpios.forEach(function(gpio) {
		gpio.val = gpio.value();
	});

	return this;
}

Thing.prototype.save = function() {
	var tampon = require('../../conf/thing.json');
	var that = this;
	
	if(this.name != tampon.name)
	{
		tampon.name = this.name;
	}

	if(this.description != tampon.description)
	{
		tampon.description = this.description;
	}

	if(this.author != tampon.author)
	{
		tampon.author = this.author;
	}

	fs.writeFile('./conf/thing.json', JSON.stringify(tampon), function(err) {
		if (err) {
			return console.log(err);
		} else {
			console.log('Thing saved : ['+that.name+']');	
		}	
	});

	this.gpios.forEach(function(gpio){
		gpio.save();
	});
}

Thing.prototype.add_gpio = function(gpio) {
    this.gpios.push(new Gpio(gpio));
};

Thing.prototype.get_gpio = function(req) {

	if(typeof req.params.slug == 'undefined'){
		throw new AppException(400, "missing slug argument");
	}

	var iter = 0;
	var result = false;
	while(iter <= this.gpios.length - 1) {
		if(this.gpios[iter].slug == req.params.slug){
			return this.gpios[iter];
		}
		iter++;
	}
	
	if(!result) {
		throw new AppException(204, "No content found for "+req.params.slug);	
	}

	return result;
};

module.exports = Thing;