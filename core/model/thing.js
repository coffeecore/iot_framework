var Gpio = require('./gpio');
var fs   = require('fs');

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
	var tampon = require('../../conf/thing');

	if(this.name != tampon.name)
	{
		tampon.name = this.name;
	}

	fs.writeFile('../../conf/thing.json', tampon, function(err) {
		console.log(err);
		console.log('It\'s saved!');
	});
}

Thing.prototype.add_gpio = function(gpio) {
    this.gpios.push(new Gpio(gpio));
};

Thing.prototype.get_gpio = function(slug) {
	var iter = 0;
	var result = false;
	while(iter <= this.gpios.length - 1) {
		if(this.gpios[iter].slug == slug){
			return this.gpios[iter];
		}
		iter++;
	}
	return result;
};

module.exports = Thing;