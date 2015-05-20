var schedule = require('node-schedule');
var Generator = require('id-generator');
var g = new Generator();
var fs   = require('fs');

function Job (data) {
	this.id        = data.id;
	this.callback  = data.callback+"()";
	this.frequency = data.frequency;
	this.schedules = new Array();
}

Job.prototype.schedule = function() {
	var that = this;
	var cron = schedule.scheduleJob(this.frequency, function(){
		eval('that.'+that.callback);
	});
	this.schedules.push(cron);
};

Job.prototype.save = function(){

};

require('../../src/gpio_jobs_callbacks')(Job);

module.exports = Job;