const Gpio = require('onoff').Gpio;

module.exports = class Gpout {

    constructor(gpio) {

    	if ((gpio == null) || (gpio === 'undefined')) {
    		throw 'Gpout exception: gpio pin not defined';
    	}

    	this.name = "GPOUT";
		this.type = "gpio";

		this.valueNames  = ["current"];
		this.valueTypes  = ["string"];
		this.values      = ['low'];
 		this.callbacks   = [];
 
 		try {
 			this.gp = new Gpio(gpio, 'out');
 		}
 		catch (err) {
 			throw 'Gpout exception: cannot connect to gpio ' + gpio + '. Exception ' + err;
 		}

 		this.gp.writeSync(0);

        this.active = true;
        this.constructed = true;

    }

    deviceName() {
    	return this.name;
	}

	deviceType() {
		return this.type;
	}

	deviceVersion() {
		return "1.0.0";
	}

	deviceNumValues() {
		return this.valueNames.length;
	}

	typeAtIndex(index) {
		if ((index < 0) || (index > this.valueTypes.length)) {
        	return "none";
    	}
    	else {
			return this.valueTypes[index];
		}
	}

	nameAtIndex(index) {
		if ((index < 0) || (index > this.valueNames.length)) {
        	return "none";
    	}
    	else {
			return this.valueNames[index];
		}
	}

	deviceActive() {
		return this.active;
	}

	// Checks the command, then checks to see if it applies, then returns status.
	// Status: 1 if good and applied, 0 if good but not applied, -1 if not good
	sendCommandSync(command) {
		if (command == 'toggle') {
			this.values[0] == 'high' ? this._sendLow() : this._sendHigh();
			return 1;
		}

		else if ((command === 1) || (command === true) || (command == 'high')) {
			if (this.values[0] == 'low') {
				this._sendHigh();
				return 1;
			}
			return 0;
		}

		else if ((command === 0) || (command === false) || (command == 'low')) {
			if (this.values[0] == 'high') {
				this._sendLow();
				return 1;
			}
			return 0;
		}

		else {
			return -1;
		}
	}

	sendCommand(command, callback) {
		const status = this.sendCommandSync(command);

		if (status === 1) { 
			callback(null, status); 
		}
		else if (status === 0) {
			callback('redundant command', status);
		}
		else {
			callback('bad command', status);
		}

	}

	_sendHigh() {
		this.gp.writeSync(1);
		this._changeState('high');
	}

	_sendLow() {
		this.gp.writeSync(0);
		this._changeState('low');
	}

	_changeState(state) {
		this.values[0] = state;

		this.callbacks.forEach(function(cb) {
			cb(null, state);
		});
	}

	valueAtIndexSync(index) {
		if ((index < 0) || (index > this.values.length)) {
        	return "none";
    	}
    	else {
			return this.values[index];
		}
	}

	valueAtIndex(index, callback) {
		var err = null;
		var val = 0;

		if ((index < 0) || (index > this.values.length)) {
			err = "Value Index Out Of Range";
		}
		else {
			val = this.values[index];
		}

		callback(err, val);
	}

	watchValueAtIndex(index, callback) {
		this.callbacks[index] = callback;
	}

	resetValueAtIndex(index) {
		if (this.values[index] !== 'undefined') {
			this.values[index] = 0;
		}
    }
    
}








