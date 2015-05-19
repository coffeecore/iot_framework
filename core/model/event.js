var Generator = require('id-generator');
var g = new Generator();

function Event (data) {
	var condition = "";
	data.conditions.forEach(function(element){
		condition += " value"+element;
	});

	this.id             = g.newId();
	this.name           = data.name;
	this.condition      = condition;
	this.callback       = "this."+data.callback+"()";
}

Event.prototype.listen = function(value) {
	if( eval(this.condition) ) {
		eval(this.callback);
	}
};

Event.prototype.getName = function() {
	return this.name;
};

require('../../src/gpio_callback')(Event);

module.exports = Event;