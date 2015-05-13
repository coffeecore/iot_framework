var Job = require('./job');
var Event = require('./event');
var slug = require('slug');

function Gpio (data) {
	this.name        = data.name;
	this.slug        = slug(this.name);
	this.description = data.description;
	this.accessValue = data.value;
	this.events      = new Array();
	this.jobs        = new Array();

	gpioStream(this);
}

var gpioStream = function(gpio) {
	setInterval(function(){
		gpio.value = gpio.getValue();
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