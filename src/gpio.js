/*
 * This file allow you to custom the GPIO access
 */
//Load Grove Moisture modulevar
var grove_moisture = require('jsupm_grovemoisture');
var groveSensor    = require('jsupm_grove');

module.exports = function(Gpio){

	Gpio.prototype.getMoisture = function() {
		console.log('ok before get value Moisture');
		var myMoistureObj = new grove_moisture.GroveMoisture(parseInt(this.pin));
		console.log('ok after get value Moisture');
		return parseInt(myMoistureObj.value());
	};

	Gpio.prototype.getTemperature = function() {
		console.log('ok before get value temp');
		var temp = new groveSensor.GroveTemp(parseInt(this.pin));
		console.log('ok after get value temp');
		return temp.value();
	};
}