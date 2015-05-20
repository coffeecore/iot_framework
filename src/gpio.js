/*
 * This file allow you to custom the GPIO access
 */
//Load Grove Moisture modulevar
var grove_moisture = require('jsupm_grovemoisture');
var groveSensor    = require('jsupm_grove');
var MaxSonarEZ = require('jsupm_maxsonarez');

module.exports = function(Gpio){

	Gpio.prototype.getMoisture = function() {
		if(typeof this.moisture == 'undefined') {
			this.moisture = new grove_moisture.GroveMoisture(parseInt(this.pin));
		}
		return parseInt(this.moisture.value());
	};

	Gpio.prototype.getLight = function() {
		if(typeof this.light == 'undefined') {
			this.light = new groveSensor.GroveLight(parseInt(this.pin));
		}
		return parseInt(this.light.value());
	};

	Gpio.prototype.getRange = function(){
		if(typeof this.range == 'undefined') {
			this.range = new MaxSonarEZ.MAXSONAREZ(parseInt(this.pin), 5.0);
		}
		return this.range.inches();
	}
}