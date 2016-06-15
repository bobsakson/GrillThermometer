var dnode = require('dnode');

var pollProbe = function() {
    return Date.now();
};

dnode(function (client) {
    this.startProbe = function (cb) {
        client.poll(function () {
            setInterval(function() {
                cb(Date.now());
            }, 1000);
        });
    }; 
}).listen(6060);