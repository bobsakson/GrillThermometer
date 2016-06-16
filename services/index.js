var dnode = require('dnode');
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