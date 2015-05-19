/*
 * This file allow you to custom the GPIO access
 */
//Load Grove Moisture modulevar
var grove_moisture = require('jsupm_grovemoisture');
var groveSensor    = require('jsupm_grove');

module.exports = function(Gpio){

	Gpio.prototype.getMoisture = function() {
		var myMoistureObj = new grove_moisture.GroveMoisture(parseInt(this.pin));
		return parseInt(myMoistureObj.value());
	};

	Gpio.prototype.getLight = function() {
		var light = new groveSensor.GroveLight(parseInt(this.pin))
		return light.value();
	};
}