##Node class module for GpOut Sensor

#####This class module should work on any Linux platform, and has been thoroughly tested on BBB

###Install

```
npm install @agilatech/gpout
```
OR
```
git clone https://github.com/Agilatech/gpout.git
```

###Usage
#####Load the module and create an instance
```
const driver = require('@agilatech/gpout');

// create an instance 
const gpout = new driver();
```
#####Get basic device info
```
const name = gpout.deviceName();  // returns string with name of device
const type = gpout.deviceType();  // returns string with type of device
const version = gpout.deviceVersion(); // returns this software version
const active = gpout.deviceActive(); // true if active, false if inactive
const numVals =  gpout.deviceNumValues(); // returns the number of paramters sensed
```
####Send command to device
This device understands three commands:
1. high : sets the gpio output to high (also thought of as 1 or true)
2. low : sets the gpio output to low (also thought of as 0 or false)
3. toggle : flips the gpio output to the opposite of the current condition

Two functions accept commands, one syncronous and the other asynchronous
1. sendCommandSync(command) : synchronously send the string command
2. sendCommand(command, callback) : asynchronously send the string command, with the callback fucntion receiving err, status upon completion. Status is a numerical result, 1=successfull command, 0=N/A command, -1=bad command.

```
gpout.sendCommandSync('high');

// or asynchronously
gpout.sendCommand('toggle', function(err, status) {
    if (err) {
            console.err(`Error! ${err}`);
        }
        else {
            console.log(`gpio output value now set to ${gpout.valueAtIndexSync(0)}`);
        }
    });
}
```

####Get parameter info and values
```
// given a parameter index, these return parameter info
const paramName0 = gpout.nameAtIndex(0);
const paramType0 = gpout.typeAtIndex(0);
const paramVal0  = gpout.valueAtIndexSync(0);
```
####Asynchronous value collection is also available
```
//valueAtIndex(index, callback)
gpout.valueAtIndex(0, function(err, val) {
    if (err) {
        console.error(err);
    }
    else {
        console.log(`Asynchronous call return: ${val}`);
    }
});
```
####Watch for value changes
```
// watchValueAtIndex(index, callback)
gpout.watchValueAtIndex(0, function(err, val) {
	if (!err) {
		console.log("Gpout value is now : " + val);
	}
});
```

###Operation Notes
This class module is a general purpose output driver.  It is intended to be a generic driver to simply operate
a GPIO.  It makes no assumptions about what real-world function the GPIO may be doing, whether controlling a
single LED or operating coolant valves on a nuclear power plant.  It is intended for use with the Agilatech VersaLink IIoT system, but has a simple and generic enough API to be used by most anything.


###Copyright
Copyright © 2017 Agilatech. All Rights Reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

