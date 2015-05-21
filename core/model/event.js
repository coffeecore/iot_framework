var Generator = require('id-generator');
var g = new Generator();
var fs   = require('fs');

var AppException = function(code, message) {
	this.code    = code;
	this.message = message;
};

function Event (data) {
	var condition = "";
	data.conditions.forEach(function(element){
		condition += " value"+element;
	});

	this.id             = data.id;
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

	if(typeof tampon !== 'undefined') {
		throw new AppException(404, "Can't find the file conf/thing.json");	
	}

	tampon.gpios.forEach(function(gpio){
		gpio.events.forEach(function(g){
			if(that.id == g.id) {
				if(that.name != g.name) {
					g.name = that.name;
				}

				fs.writeFile('./conf/thing.json', JSON.stringify(tampon), function(err) {
					if (err) {
						throw new AppException(503, "Can't save the event | "+err.message);
					} else {
						console.log('Event saved : ['+that.id+']');	
					}	
				});
			}
		});
	});
};

require('../../src/gpio_callback')(Event);

module.exports = Event;