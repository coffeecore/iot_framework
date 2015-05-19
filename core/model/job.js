var schedule = require('node-schedule');

function Job (Gpio, data) {
	this.gpio      = Gpio;
	this.callback  = data.callback;
	this.frequency = data.frequency;
	this.schedules = new Array();
}

Job.prototype.schedule = function(gpio) {
	var that = this;
	var cron = schedule.scheduleJob(this.frequency, function(){
		eval('that.'+that.callback+'()');
	});
	this.schedules.push(cron);
};

require('../../src/gpio_jobs_callbacks')(Job);

module.exports = Job;