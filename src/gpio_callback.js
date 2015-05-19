module.exports = function(Event){

	Event.prototype.event1_callback = function() {
		console.log('['+this.thing.name+'] '+this.name+' fired on : '+this.gpio.name+' | value = '+this.gpio.value);
	};

}