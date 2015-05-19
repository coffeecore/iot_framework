/*
 * This file allow you to custom the GPIO access
 */
//Load Grove Moisture modulevar
var grove_moisture = require('jsupm_grovemoisture');
var groveSensor    = require('jsupm_grove');

module.exports = function(Gpio){

	Gpio.prototype.getMoisture = function() {
		if(typeof this.moisture == 'undefined') {
			this.moisture = new grove_moisture.GroveMoisture(parseInt(this.pin));
		}
		console.log(this.name+" : "+parseInt(this.moisture.value()));
		return parseInt(this.moisture.value());
	};

	Gpio.prototype.getLight = function() {
		if(typeof this.light == 'undefined') {
			this.light = new groveSensor.GroveLight(parseInt(this.pin));
		}
		console.log(this.name+" : "+parseInt(this.light.value()));
		return parseInt(this.light.value());
	};
}