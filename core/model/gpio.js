var Job   = require('./job');
var Event = require('./event');
var slug  = require('slug');
var fs   = require('fs');

var AppException = function(code, message) {
	this.code    = code;
	this.message = message;
};

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

Gpio.prototype.get_event = function(req) {

	if(typeof req.params.id == 'undefined'){
		throw new AppException(400, "missing id argument");
	}

	var iter = 0;
	var result = false;
	while(iter <= this.events.length - 1) {
		if(this.events[iter].id == id){
			return this.events[iter];
		}
		iter++;
	}
	
	if(!result) {
		throw new AppException(204, "No content found for "+req.params.id);	
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

			fs.writeFile('./conf/thing.json', JSON.stringify(tampon), function(err) {
				if (err) {
					return console.log(err);
				} else {
					console.log('Gpio saved : ['+that.id+']');	
				}	
			});

			that.events.forEach(function(e){
				e.save();
			});

			that.jobs.forEach(function(j){
				j.save();
			});
		}
	});

};

require('../../src/gpio')(Gpio);

module.exports = Gpio;