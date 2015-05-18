/*
 * This file allow you to custom the GPIO access
 */
module.exports = function(Gpio){

	Gpio.prototype.getMoisture = function() {
		//@TODO call groove lib
		return 100;
	};

	Gpio.prototype.getTemperature = function() {
		//@TODO call groove lib
		return Math.random();
	};
}