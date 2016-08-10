var sqlite3 = require('sqlite3');
var fs = require('fs');
var path = require('path');
var models = require('../models');

sqlite3.verbose();

var connectToDatabase = function() {
    console.log(__dirname + '/../thermometer.db');
    
    return new sqlite3.Database(__dirname + '/../thermometer.db');
}

var getProfiles = function(cb) {
    models.Profile.findAll({ where: { isDeleted: false } })
    .then(function(rows) {
        cb(rows);
    });
    // var db = connectToDatabase();
    // console.log('db');
    // db.all('SELECT id, name, description FROM profile WHERE isDeleted = 0', function(err, rows) {
    //     db.close();

    //     if(err) {
    //         console.log(err);
    //     }
    //     else {
    //         console.log('repo', rows);
    //         cb(rows);
    //     }
    // });
};

var getProfile = function(id, cb) {
    // models.Profile.findAll({ where: { id: id } }).then(function(rows) {
    //     cb(rows);
    // });

    models.Profile.findAll({ where: { id: id },  include: [{ model: models.ProbeProfile, as: 'ProbeProfiles' }] }).then(function(rows) {
        cb(rows);
    });

    // var db = connectToDatabase();

    // db.all('SELECT p.id, p.name, p.description, p.isDeleted, pp.id, pp.channel, pp.label, pp.upperThreshold, pp.lowerThreshold, pp.isDeleted AS isProbeDeleted FROM profile p LEFT OUTER JOIN probeProfile pp ON p.id = pp.profileId WHERE p.id = $id', { $id: id }, function(err, rows) {
    //     if(err) {
    //         db.close();
    //         console.log(err);
    //     }
    //     else {
    //         if(rows) {
    //             var profile = new Object();
    //             profile.id = rows[0].id;
    //             profile.name = rows[0].name;
    //             profile.description = rows[0].description;
    //             profile.isDeleted = rows[0].isDeleted;
    //             profile.probes = new Array();

    //             rows.forEach(function(item) {
    //                 if(!item.isDeleted) {
    //                     var probe = new Object();
    //                     probe.id = item.id;
    //                     probe.channel = item.channel;
    //                     probe.label = item.label;
    //                     probe.upperThreshold = item.upperThreshold;
    //                     probe.lowerThreshold = item.lowerThreshold;
    //                     probe.isDeleted = item.isProbeDeleted;

    //                     profile.probes.push(probe);
    //                 }
    //             }, this);

    //             db.close();

    //             cb(profile);
    //         }
    //     }
    // });
};

// TODO: If sqlite will be used, need to figure out the callbacks for saving. Not worrying about it since I am switching to Postgres.
var saveProfile = function(profile) {
    var db = connectToDatabase();

    db.run('INSERT INTO profile(name, description, isDeleted) VALUES($name, $description, $isDeleted)', { $name: profile.name, $description: profile.description, $isDeleted: 0 }, function(err, row) {
        if(err) {
            console.log(err);
        }
        else {
            var lastId = this.lastID;

            profile.probes.forEach(function(probe) {
                db.run('INSERT INTO probeProfile(channel, profileId, label, upperThreshold, lowerThreshold, isDeleted) VALUES($channel, $profileId, $label, $upperThreshold, $lowerThreshold, $isDeleted)', { $channel: probe.channel, $profileId: lastId, $label: probe.label, $upperThreshold: probe.upperThreshold, $lowerThreshold: probe.lowerThreshold, $isDeleted: 0});
            }, this);
        }
    });
};

var updateProfile = function(profile) {
    var db = connectToDatabase();
    console.log(profile);
    db.run('UPDATE profile SET name = $name, description = $description, isDeleted = $isDeleted WHERE id = $id', { $id: profile.id, $name: profile.name, $description: profile.description, $isDeleted: profile.isDeleted }, function(err, row) {
        if(err) {
            console.log(err);
        }
        else {
            profile.probes.forEach(function(probe) {
                if(probe.id) {
                    db.run('UPDATE probeProfile SET channel = $channel, label = $label, upperThreshold = $upperThreshold, lowerThreshold = $lowerThreshold, isDeleted = $isDeleted WHERE id = $id', { $channel: probe.channel, $id: probe.id, $label: probe.label, $upperThreshold: probe.upperThreshold, $lowerThreshold: probe.lowerThreshold, $isDeleted: probe.isDeleted });
                }
                else {
                    db.run('INSERT INTO probeProfile(channel, profileId, label, upperThreshold, lowerThreshold, isDeleted) VALUES($channel, $profileId, $label, $upperThreshold, $lowerThreshold, $isDeleted)', { $channel: probe.channel, $profileId: profile.id, $label: probe.label, $upperThreshold: probe.upperThreshold, $lowerThreshold: probe.lowerThreshold, $isDeleted: 0});
                }
            }, this);
        }
    });

    db.close();
};

module.exports.getProfiles = getProfiles;
module.exports.getProfile = getProfile;
module.exports.saveProfile = saveProfile;
module.exports.updateProfile = updateProfile;