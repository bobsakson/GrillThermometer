var dnode = require('dnode');
var sqlite3 = require('sqlite3');
var mcp3008 = require('mcp3008.js');

var db = new sqlite3.Database('../thermometer.db');
var intervalObject = null;
//var adc = new mcp3008();
var adc = null;

var currentDateTime = function() {
    var now = new Date();
    var readingDateTime =   (now.getMonth()+1) + "/"
                            + now.getDate() + "/" 
                            + now.getFullYear() + " "  
                            + now.getHours() + ":"  
                            + now.getMinutes() + ":" 
                            + now.getSeconds();

    return readingDateTime;
};

var saveReadingToDB = function(fahrenheit, celsius, kelvin) {
    db.run('INSERT INTO temperaturelog VALUES($fahrenheit, $celsius, $kelvin, $readingDateTime)', { $fahrenheit: fahrenheit, $celsius: celsius, $kelvin: kelvin, $readingDateTime: currentDateTime() });
};

var simulateStart = function() {
    currentTemperature = 40;
    iteration = 1;

    intervalObject = setInterval(function() {
        if((iteration % 10) === 0) {
            currentTemperature++;
            iteration = 1;
        }

        saveReadingToDB(currentTemperature, 0, 0);

        iteration++;
        cb(currentTemperature);
    }, 1000);
};

var simulateStop = function() {
    clearInterval(intervalObject);
};

var start = function() {
    adc = new mcp3008();

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
        
        console.log('Reading ', tempf);
        saveReadingToDB(tempF, tempC, tempK);

        cb(tempf);
    });
};

var stop = function() {
    adc.stop();
    adc.close();
    cb();
};

dnode(function (client) {
    this.startProbe = function (cb) {
        client.poll(function () {
            console.log('Probe - Start');

            simulateStart();
            //start();            
        });
    }; 

    this.stopProbe = function (cb) {
        console.log('Probe - Stop');

        simulateStop();
        //stop();
    };
}).listen(6060);

console.log('Probe ready');