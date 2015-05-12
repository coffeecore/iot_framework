/*
 * This file allow you to custom the GPIO access
 */
module.exports = function(Gpio){

	Gpio.prototype.get_moistureValue = function() {
		//@TODO call groove lib
	    return 'wet';
	};

	Gpio.prototype.get_temperatureValue = function() {
		//@TODO call groove lib
	    return '17 °';
	};
}