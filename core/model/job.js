var schedule     = require('node-schedule');
var Generator    = require('id-generator');
var g            = new Generator();
var fs           = require('fs');
var EventEmitter = require("events").EventEmitter;
var ee           = new EventEmitter();

Date.prototype.timeNow = function () {
     return this.getDate()+" : "+((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

var AppException = function(code, message) {
	this.code    = code;
	this.message = message;
};

function Job (data) {
	this.id        = data.id;
	this.callback  = data.callback+"()";
	this.name      = data.name;
	this.frequency = data.frequency;
	this.schedules = new Array();
	this.history   = new Array();
}

Job.prototype.schedule = function() {
	var that = this;

	var cron = schedule.scheduleJob(this.frequency, function(){
		ee.emit("JOB - "+that.id, {date: new Date().timeNow(), job: that.name});
		eval('that.'+that.callback);		
	});

	ee.on("JOB - "+that.id, function (data) {
		that.history.push(data);
	});

	this.schedules.push(cron);
};

Job.prototype.save = function(){
	var tampon = require('../../conf/thing.json');
	var that = this;

	if(typeof tampon == 'undefined') {
		throw new AppException(404, "Can't find the file conf/thing.json");	
	}

	tampon.gpios.forEach(function(gpio){
		gpio.jobs.forEach(function(g){
			if(that.id == g.id) {
				if(that.name != g.name) {
					g.name = that.name;
				}

				if(that.frequency != g.frequency) {
					g.frequency = that.frequency;
				}
				
				fs.writeFile('./conf/thing.json', JSON.stringify(tampon), function(err) {
					if (err) {
						throw new AppException(503, "Can't save the job | "+err.message);
					} else {
						console.log('Job saved : ['+that.id+']');	
					}	
				});
			}
		});
	});
};

require('../../src/gpio_jobs_callbacks')(Job);

module.exports = Job;