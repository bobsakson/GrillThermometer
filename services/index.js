var dnode = require('dnode');
var sqlite3 = require('sqlite3');

var db = new sqlite3.Database('../thermometer.db');
var intervalObject = null;

dnode(function (client) {
    this.startProbe = function (cb) {
        client.poll(function () {
            console.log('Probe - Start');

            currentTemp = 40;
            iteration = 1;

            intervalObject = setInterval(function() {
                if((iteration % 10) === 0) {
                    currentTemp++;
                    iteration = 1;
                }

                var currentdate = new Date();
                var readingDateTime =   (currentdate.getMonth()+1) + "/"
                                        + currentdate.getDate() + "/" 
                                        + currentdate.getFullYear() + " "  
                                        + currentdate.getHours() + ":"  
                                        + currentdate.getMinutes() + ":" 
                                        + currentdate.getSeconds();

                db.run('INSERT INTO temperaturelog VALUES($temperature, $readingDateTime)', { $temperature: currentTemp, $readingDateTime: readingDateTime});

                iteration++;
                cb(currentTemp);
            }, 1000);
        });
    }; 

    this.stopProbe = function (cb) {
        console.log('Probe - Stop');

        clearInterval(intervalObject);
        cb();
    };
}).listen(6060);

console.log('Probe ready');