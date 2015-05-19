var Gpio = require('./gpio');

function Thing (data) {
	// Build Gpios
	var thing_gpios = new Array();
	data.gpios.forEach(function(gpio){
		thing_gpios.push(new Gpio(gpio));
	});

	this.name        = data.name;
	this.description = data.description;
	this.author      = data.author;
	this.gpios       = thing_gpios;
}

Thing.prototype.run_events = function() {
	var that = this;
	setInterval(function(){
		that.gpios.forEach(function(gpio) {
			gpio.events.forEach(function(e) {
				console.log(gpio.value);
				e.listen();
			});
		});
	}, 1000);	
}

Thing.prototype.run_jobs = function() {
	this.gpios.forEach(function(gpio) {
		gpio.jobs.forEach(function(j){
			j.schedule();
		});
	});
}

// Thing.prototype.setGpios = function(gpios){
// 	// Build GPIOs
// 	var gpio_buid = new Array();
// 	var t = this;
// 	gpios.forEach(function(element){
// 		gpio_buid.push(new Gpio(t, element));
// 	});
// 	return gpio_buid;
// }

// Thing.prototype.getName = function() {
//     return this.name;
// };

// Thing.prototype.getDescription = function() {
//     return this.description;
// };

// Thing.prototype.getAuthor = function() {
//     return this.author;
// };

// Thing.prototype.getGpios = function() {
// 	return this.gpios;
// };

Thing.prototype.add_gpio = function(gpio) {
    this.gpios.push(new Gpio(gpio));
};

Thing.prototype.get_gpio = function(slug) {
	var iter = 0;
	var result = false;
	while(iter <= this.gpios.length - 1) {
		if(this.gpios[iter].slug == slug){
			return this.gpios[iter];
		}
		iter++;
	}
	return result;
};

module.exports = Thing;