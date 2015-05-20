var Job   = require('./job');
var Event = require('./event');
var slug  = require('slug');
var fs   = require('fs');

function Gpio (data) {
	// Build Events
	var gpio_events = new Array();
	data.events.forEach(function(e){
		gpio_events.push(new Event(e));
	});

	// Build Jobs
	var gpio_jobs = new Array();
	data.jobs.forEach(function(j){
		gpio_jobs.push(new Job(j));
	});

	this.name           = data.name;
	this.id             = data.id;
	this.pin            = data.pin;
	this.slug           = slug(this.name);
	this.description    = data.description;
	this.function_value = data.value+"()";
	this.events         = gpio_events;
	this.jobs           = gpio_jobs;
}

Gpio.prototype.value = function(){
	return eval('this.'+this.function_value);
}

Gpio.prototype.get_event = function(id) {
	var iter = 0;
	var result = false;
	while(iter <= this.events.length - 1) {
		if(this.events[iter].id == id){
			return this.events[iter];
		}
		iter++;
	}
	return result;    
};

Gpio.prototype.get_job = function(id) {
	var iter = 0;
	var result = false;
	while(iter <= this.jobs.length - 1) {
		if(this.jobs[iter].id == id){
			return this.jobs[iter];
		}
		iter++;
	}
	return result;    
};

Gpio.prototype.save = function() {
	var tampon = require('../../conf/thing.json');
	var that = this;

	tampon.gpios.forEach(function(gpio){
		if(gpio.id == that.id) {

			if(that.name != gpio.name){
					gpio.name = that.name;
			}

			if(that.pin != gpio.pin){
					gpio.pin = that.pin;
			}

			if(that.description != gpio.description){
					gpio.description = that.description;
			}
		}
	});

	fs.writeFile('./conf/thing.json', JSON.stringify(tampon), function(err) {
		if (err) {
			return console.log(err);
		} else {
			console.log('Gpio saved : ['+this.id+']');	
		}	
	});
};

require('../../src/gpio')(Gpio);

module.exports = Gpio;

// var gpioStream = function(gpio) {
// 	gpio.jobs.forEach(function(element){
// 		element.schedule(gpio);
// 	});
// 	setInterval(function(){
// 		gpio.events.forEach(function(element){
// 			element.listen(gpio);
// 		});
// 	}, 1000);	
// };

// Gpio.prototype.getName = function() {
//     return this.name;
// };

// Gpio.prototype.getDescription = function() {
//     return this.description;
// };

// Gpio.prototype.getEvents = function() {
//     return this.events;
// };

// Gpio.prototype.getJobs = function() {
//     return this.jobs;
// };

// Gpio.prototype.getValue = function() {
//     return eval('this.'+this.accessValue+'()');
// };