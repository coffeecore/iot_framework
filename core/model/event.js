var Generator = require('id-generator');
var g = new Generator();
var fs   = require('fs');

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

Event.prototype.save = function(){
	var tampon = require('../../conf/thing.json');
	var that = this;

	tampon.gpios.forEach(function(gpio){
		gpio.events.forEach(function(g){
			if(that.id == g.id) {
				if(that.name != g.name) {
					that.name = g.name;
				}
			}
		});
	});

	fs.writeFile('./conf/thing.json', JSON.stringify(tampon), function(err) {
		if (err) {
			return console.log(err);
		} else {
			console.log('Event saved : ['+that.id+']');	
		}	
	});
};

require('../../src/gpio_callback')(Event);

module.exports = Event;