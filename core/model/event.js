var Generator = require('id-generator');
var g = new Generator();

function Event (Gpio, data) {
	var condition = "";
	data.conditions.forEach(function(element){
		condition += " this.value"+element;
	});

	var callback = 'this.'+data.callback+'()'

	this.gpio           = Gpio;
	this.thing          = this.gpio.parent;
	this.id             = g.newId();
	this.name           = data.name;
	this.condition      = condition;
	this.callback       = "this."+data.callback+"()";
}

// var buildCondition = function(conditions){
// 	var result = "";
// 	conditions.forEach(function(element){
// 		result += " this.value"+element;
// 	});
// 	return result;
// };

Event.prototype.listen = function() {
	if( eval(this.condition) ) {
		eval(this.callback);
	}
};

Event.prototype.getName = function() {
	return this.name;
};

require('../../src/gpio_callback')(Event);

module.exports = Event;