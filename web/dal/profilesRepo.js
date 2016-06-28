var sqlite3 = require('sqlite3');

var connectToDatabase = function() {
    var db = new sqlite3.Database('../../thermometer.db');
}

var getProfiles = function() {
    db.all('SELECT id, name, description FROM profile WHERE isDeleted = 0', function(err, rows) {
        if(err) {
            console.log(err);
        }
        else {
            return rows;
        }
    });
};

var getProfile = function(id) {
    db.all('SELECT p.id, p.name, p.description, pp.id, pp.channel, pp.label, pp.upperThreshold, pp.lowerThreshold FROM profile p INNER JOIN profileProbe pp ON p.id = pp.profileId WHERE p.id = $id AND pp.isDeleted = 0', { $id: id }, function(err, rows) {
        if(err) {
            console.log(err);
        }
        else {
            if(rows) {
                var profile = new Object();
                profile.id = rows[0].id;
                profile.name = rows[0].name;
                profile.description = rows[0].descriptionl
                profile.probes = new Array();

                rows.forEach(function(element) {
                    var probe = new Object();
                    probe.channel = item.channel;
                    probe.label = item.label;
                    probe.upperThreshold = item.upperThreshold;
                    probe.lowerThreshold = item.lowerThreshold;

                    profile.probes.push(probe);
                }, this);
            }
        }
    });
};

var saveProfile = function(profile) {
    
};

module.exports.getProfiles = getProfiles;
module.exports.getProfile = getProfile;
module.exports.saveProfile = saveProfile;