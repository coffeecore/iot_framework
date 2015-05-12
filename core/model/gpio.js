var Job = require('./job');
var Event = require('./event');

function Gpio (data) {

	this.name        = data.name;
	this.description = data.description;  
	this.value       = this.getValue();
	this.events      = new Array();
	this.jobs        = new Array();

}
  
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
    return eval('this.get_'+this.name+'Value()');
};

require('../../src/gpio')(Gpio);

module.exports = Gpio;