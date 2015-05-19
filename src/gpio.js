/*
 * This file allow you to custom the GPIO access
 */
//Load Grove Moisture modulevar
var grove_moisture = require('jsupm_grovemoisture');
var groveSensor    = require('jsupm_grove');

module.exports = function(Gpio){

	Gpio.prototype.getMoisture = function() {
		return Math.random();
		// if(typeof this.moisture == 'undefined') {
		// 	this.moisture = new grove_moisture.GroveMoisture(parseInt(this.pin));
		// }
		// return parseInt(this.moisture.value());
	};

	Gpio.prototype.getLight = function() {
		return Math.random();
		// if(typeof this.light == 'undefined') {
		// 	this.light = new groveSensor.GroveLight(parseInt(this.pin));
		// }
		// return parseInt(this.light.value());
	};
}