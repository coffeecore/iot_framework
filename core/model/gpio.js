var Job   = require('./job');
var Event = require('./event');
var slug  = require('slug');

function Gpio (Thing, data) {
	this.parent      = Thing;
	this.name        = data.name;
	this.slug        = slug(this.name);
	this.description = data.description;
	this.accessValue = data.value;

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

	gpioStream(this);
}

var gpioStream = function(gpio) {
	gpio.jobs.forEach(function(element){
		element.schedule(gpio);
	});
	setInterval(function(){
		gpio.value = gpio.getValue();

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

require('../../src/gpio')(Gpio);

module.exports = Gpio;