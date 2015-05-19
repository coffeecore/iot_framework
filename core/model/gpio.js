var Job   = require('./job');
var Event = require('./event');
var slug  = require('slug');

function Gpio (Thing, data) {
	this.name        = data.name;
	this.pin         = data.pin;
	this.slug        = slug(this.name);
	this.description = data.description;
	this.accessValue = data.value;

	this.value = function(){
		return eval('this.'+this.accessValue+'()');
	};

	// Build Events
	var gpio_events = new Array();
	var g = this;
	data.events.forEach(function(element){
		gpio_events.push(new Event(g, element));
	});
	this.events     = gpio_events;

	var gpio_jobs = new Array();
	data.jobs.forEach(function(element){
		gpio_jobs.push(new Job(g, element));
	});
	this.jobs        = gpio_jobs;

	//gpioStream(this);
}

var gpioStream = function(gpio) {
	gpio.jobs.forEach(function(element){
		element.schedule(gpio);
	});
	setInterval(function(){
		gpio.events.forEach(function(element){
			element.listen(gpio);
		});
	}, 1000);	
};

Gpio.prototype.getName = function() {
    return this.name;
};

Gpio.prototype.getDescription = function() {
    return this.description;
};

Gpio.prototype.getEvents = function() {
    return this.events;
};

Gpio.prototype.getJobs = function() {
    return this.jobs;
};

Gpio.prototype.getValue = function() {
    return eval('this.'+this.accessValue+'()');
};

Gpio.prototype.getEvent = function(id) {
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

Gpio.prototype.getJob = function(id) {
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

require('../../src/gpio')(Gpio);

module.exports = Gpio;