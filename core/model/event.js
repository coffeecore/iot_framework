function Event (Gpio, data) {
	this.gpio           = Gpio;
	this.thing          = this.gpio.parent;
	this.name           = data.name;
	this.conditions     = data.conditions;
	this.builtcondition = buildCondition(this.conditions);
	this.callback       = data.callback;
}

var buildCondition = function(conditions){
	var result = "";
	conditions.forEach(function(element){
		result += " this.value"+element;
	});
	return result;
};

Event.prototype.listen = function(gpio) {
	if( eval(this.builtcondition) ) {
		eval('this.'+this.callback+'()')
	}
};

Event.prototype.getName = function() {
	return this.name;
};

require('../../src/gpio_callback')(Event);

module.exports = Event;