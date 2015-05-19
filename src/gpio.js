/*
 * This file allow you to custom the GPIO access
 */
//Load Grove Moisture modulevar
var grove_moisture = require('jsupm_grovemoisture');
var groveSensor    = require('jsupm_grove');

module.exports = function(Gpio){

	Gpio.prototype.getMoisture = function() {
		var myMoistureObj = new grove_moisture.GroveMoisture(parseInt(this.pin));
		console.log(this.name+" : "+parseInt(myMoistureObj.value()));
		return parseInt(myMoistureObj.value());
	};

	Gpio.prototype.getTemperature = function() {
		var temp = new groveSensor.GroveTemp(parseInt(this.pin));
		console.log(this.name+" : "+temp.value());
		return temp.value();
	};
}