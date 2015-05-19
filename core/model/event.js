function Event (Gpio, data) {
	this.gpio      = Gpio;
	this.thing     = this.gpio.parent;
	this.name      = data.name;
	this.condition = data.condition;
	this.callback  = data.callback;
}

Event.prototype.listen = function(gpio) {
	if( eval(gpio.value + this.condition) ) {
		eval('this.'+this.callback+'()')
	}
};

Event.prototype.getName = function() {
	return this.name;
};

require('../../src/gpio_callback')(Event);

module.exports = Event;