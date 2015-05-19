var schedule = require('node-schedule');
var Generator = require('id-generator');
var g = new Generator();

function Job (data) {
	this.id        = g.newId();
	this.callback  = "this."+data.callback+"()";
	this.frequency = data.frequency;
	this.schedules = new Array();
}

Job.prototype.schedule = function() {
	var that = this;
	var cron = schedule.scheduleJob(this.frequency, function(){
		eval(this.callback);
	});
	this.schedules.push(cron);
};

require('../../src/gpio_jobs_callbacks')(Job);

module.exports = Job;