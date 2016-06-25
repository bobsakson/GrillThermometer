var dnode = require('dnode');
var sqlite3 = require('sqlite3');
var mcp3008 = require('mcp3008.js');
var Probe = require('./probe.js');

var db = new sqlite3.Database('../thermometer.db');
var intervalObject = new Array();
var adc = null;

var saveReadingToDB = function(channel, fahrenheit, celsius, kelvin) {
    db.run('INSERT INTO temperaturelog VALUES($channel, $fahrenheit, $celsius, $kelvin, CURRENT_TIMESTAMP)', { $channel: channel, $fahrenheit: fahrenheit, $celsius: celsius, $kelvin: kelvin });
};

var getProbesFromDB = function(cb) {
    db.all('SELECT channel, label FROM probes', function(err, rows) {
        cb(rows);
    });
};

/*
 The simulate methods are meant to be used when the application is not running on a Rapsberry Pi.
 Start the application with a 1 as the first parameter:

 node index.js 1
 */

var simulatePollProbe = function(channel, cb) {
    var currentTemperature = Math.floor(Math.random() * 100) + 1;
    var iteration = 1;

    intervalObject.push(setInterval(function() {
        if((iteration % 10) === 0) {
            currentTemperature++;
            iteration = 1;
        }

        saveReadingToDB(channel, currentTemperature, 0, 0);

        iteration++;
        cb({ 'channel': channel, 'currentTemperature': currentTemperature });
    }, 1000));
};

var simulateStart = function(probes, cb) {
    console.log('Simulation starting.');
    console.log(probes.length);
    probes.forEach(function(element, index, array) {
        console.log('Setting up probe to poll -', element.channel);
        simulatePollProbe(element.channel, cb);
    });
};

var simulateStop = function(cb) {
    console.log('Simulation stopping.');
    intervalObject.forEach(function(element, index, array) {
        clearInterval(element);
    });
    
    intervalObject = new Array();
    cb();
};

/* End simulation methods */

var start = function(probes, cb) {
    probes.forEach(function(element, index, array) {
        console.log('Setting up probe to poll -', element.channel);
        pollProbe(element.channel, cb);
    });
};

var pollProbe = function(channel, cb) {
    adc.poll(channel, 1000, function(reading) {               
        var volts = (reading * 3.3) / 1024;
        var ohms = ((1 / volts) * 3300) - 1000;
        var lnohm = Math.log1p(ohms);
        
        var a =  0.000570569668444;
        var b =  0.000239344111326;
        var c =  0.000000047282773;
        
        var t1 = (b * lnohm);
        var c2 = c * lnohm;
        var t2 = Math.pow(c2, 3);

        var tempK = 1 / (a + t1 + t2);
        var tempC = tempK - 273.15 - 4;
        var tempF = tempC * (9 / 5) + 32;

        saveReadingToDB(tempF, tempC, tempK);

        cb({ 'channel': channel, 'currentTemperature': tempf });
    });
};

var stop = function(cb) {
    adc.stop();
    adc.close();
    cb();
};

var isSimulationMode = function() {
    if(process.argv[2] && process.argv[2] === '1') {
        return true;
    }
    else {
        return false;
    }
};

dnode(function (client) {
    this.startProbe = function (cb) {
        client.poll(function () {
            getProbesFromDB(function(probes) {
                console.log('Probe - Start');

                if(isSimulationMode()) {
                    simulateStart(probes, cb);
                }
                else {
                    if(!adc) {
                        adc = new mcp3008();
                    }
                    
                    start(probes, cb);
                }
            });        
        });
    }; 

    this.stopProbe = function (cb) {
        console.log('Probe - Stop');

        if(isSimulationMode()) {
            simulateStop(cb);
        }
        else {
            stop(cb);
            adc = null;
        }            
    };
}).listen(6060);

console.log('Probe ready');