/*
 * This file allow you to custom the GPIO access
 */
//Load Grove Moisture modulevar
var grove_moisture = require('jsupm_grovemoisture');

module.exports = function(Gpio){

	Gpio.prototype.getMoisture = function() {
		var myMoistureObj = new grove_moisture.GroveMoisture(Gpio.pin);
		return parseInt(myMoistureObj.value());
	};

	Gpio.prototype.getTemperature = function() {
		//@TODO call groove lib
		return Math.random();
	};
}