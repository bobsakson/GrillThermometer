var dnode = require('dnode');
var sqlite3 = require('sqlite3');
var mcp3008 = require('mcp3008.js');
var Probe = require('./probe.js');

var db = new sqlite3.Database('../thermometer.db');
var intervalObject = new Array();
var adc = null;

var saveReadingToDB = function(fahrenheit, celsius, kelvin) {
    db.run('INSERT INTO temperaturelog VALUES($fahrenheit, $celsius, $kelvin, CURRENT_TIMESTAMP)', { $fahrenheit: fahrenheit, $celsius: celsius, $kelvin: kelvin });
};

var getProbesFromDB = function() {
    var probes = new Array();

    db.each('SELECT channel, label FROM probes', function(err, row) {
        var probe = new Probe(row.channel, row.label);
        probes.push(probe);
    });

    return probes;
};

/*
 The simulate methods are meant to be used when the application is not running on a Rapsberry Pi.
 Start the application with a 1 as the first parameter:

 node index.js 1
 */

var simulatePollProbe = function(channel, cb) {
    currentTemperature = Math.floor(Math.random() * (max - min + 1)) + min;
    iteration = 1;

    intervalObject.push(setInterval(function() {
        if((iteration % 10) === 0) {
            currentTemperature++;
            iteration = 1;
        }

        saveReadingToDB(currentTemperature, 0, 0);

        iteration++;
        cb(currentTemperature);
    }, 1000));
};

var simulateStart = function(probes, cb) {
    probes.forEach(function(element, index, array) {
        simulatePollProbe(element.channel, cb);
    });
};

var simulateStop = function(cb) {
    intervalObject.forEach(function(element, index, array) {
        clearInterval(element);
    });
    
    intervalObject = new Array();
    cb();
};

/* End simulation methods */

var start = function(probes, cb) {
    adc.poll(0, 1000, function(reading) {               
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

        cb(tempf);
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
            var probes = getProbesFromDB();

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