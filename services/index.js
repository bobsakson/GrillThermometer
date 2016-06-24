var dnode = require('dnode');
var sqlite3 = require('sqlite3');
var mcp3008 = require('mcp3008.js');

var db = new sqlite3.Database('../thermometer.db');
var intervalObject = null;
var adc = new mcp3008();

dnode(function (client) {
    this.startProbe = function (cb) {
        client.poll(function () {
            console.log('Probe - Start');

            // currentTemp = 40;
            // iteration = 1;

            // intervalObject = setInterval(function() {
            //     if((iteration % 10) === 0) {
            //         currentTemp++;
            //         iteration = 1;
            //     }

            //     var currentdate = new Date();
            //     var readingDateTime =   (currentdate.getMonth()+1) + "/"
            //                             + currentdate.getDate() + "/" 
            //                             + currentdate.getFullYear() + " "  
            //                             + currentdate.getHours() + ":"  
            //                             + currentdate.getMinutes() + ":" 
            //                             + currentdate.getSeconds();

            //     db.run('INSERT INTO temperaturelog VALUES($temperature, $readingDateTime)', { $temperature: currentTemp, $readingDateTime: readingDateTime});

            //     iteration++;
            //     cb(currentTemp);
            // }, 1000);

            adc.poll(0, 1000, function(currentTemp) {
               
                var currentdate = new Date();
                var readingDateTime =   (currentdate.getMonth()+1) + "/"
                                        + currentdate.getDate() + "/" 
                                        + currentdate.getFullYear() + " "  
                                        + currentdate.getHours() + ":"  
                                        + currentdate.getMinutes() + ":" 
                                        + currentdate.getSeconds();
                
                var volts = (currentTemp * 3.3) / 1024
                var ohms = ((1/volts)*3300)-1000

                var lnohm = Math.log1p(ohms)
                var a =  0.000570569668444
                var b =  0.000239344111326
                var c =  0.000000047282773

                var t1 = (b*lnohm)

                var c2 = c*lnohm

                var t2 = math.pow(c2,3)

                var temp = 1/(a + t1 + t2)

                var tempc = temp - 273.15 - 4
                var tempf = tempc*9/5 + 32
                
                console.log('Reading ', tempf);
                db.run('INSERT INTO temperaturelog VALUES($temperature, $readingDateTime)', { $temperature: tempf, $readingDateTime: readingDateTime});

                cb(tempf);
            });
        });
    }; 

    this.stopProbe = function (cb) {
        console.log('Probe - Stop');

        //clearInterval(intervalObject);
        adc.stop();
        adc.close();
        cb();
    };
}).listen(6060);

console.log('Probe ready');