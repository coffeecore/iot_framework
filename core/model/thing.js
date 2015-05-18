var Gpio = require('./gpio');

function Thing (data) {
	this.name        = data.name;
	this.description = data.description;
	this.author      = data.author;
	this.gpios       = this.setGpios(data.gpios);
}

Thing.prototype.setGpios = function(gpios){
	// Build GPIOs
	var gpio_buid = new Array();
	var t = this;
	gpios.forEach(function(element){
		gpio_buid.push(new Gpio(t, element));
	});
	return gpio_buid;
}

Thing.prototype.getName = function() {
    return this.name;
};

Thing.prototype.getDescription = function() {
    return this.description;
};

Thing.prototype.getAuthor = function() {
    return this.author;
};

Thing.prototype.getGpios = function() {
	return this.gpios;
};

Thing.prototype.addGpio = function(gpio) {
    this.gpios.push(new Gpio(gpio));
};

Thing.prototype.getGpio = function(slug) {
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