var schedule = require('node-schedule');
var Generator = require('id-generator');
var g = new Generator();
var fs   = require('fs');

function Job (data) {
	this.id        = data.id;
	this.callback  = data.callback+"()";
	this.name      = data.name;
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
	var tampon = require('../../conf/thing.json');
	var that = this;

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
						return console.log(err);
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