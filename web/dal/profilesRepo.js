var sqlite3 = require('sqlite3');
var fs = require('fs');
var path = require('path');
var Promise = require('bluebird');
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
};

var getProfile = function(id, cb) {
    models.Profile.findAll({ where: { id: id },  include: [{ model: models.ProbeProfile, as: 'ProbeProfiles' }] }).then(function(rows) {
        cb(rows);
    });
};

// TODO: Include transaction.
var saveProfile = function(profile, cb) {
    models.Profile.create({
        name: profile.name,
        description: profile.description,
        isDeleted: 0
    }).then(function(dbProfile) {
        Promise.map(profile.ProbeProfiles, function(probe) {
            models.ProbeProfile.create({
                label: probe.label,
                upperThreshold: probe.upperThreshold,
                lowerThreshold: probe.lowerThreshold,
                probeChannel: probe.probeChannel,
                profileId: dbProfile.id,
                isDeleted: 0
            }).catch(function(err){
                console.log(err);
                console.log('Error saving the probe profile.')
                cb(false);
            });
        });
    }).then(function() {
        cb(true);
    }).catch(function(err){
        console.log(err);
        console.log('Error saving the profile.')
        cb(false);
    });
};

var updateProfile = function(profile, cb) {
    models.Profile.update({
        name: profile.name,
        description: profile.description,
        isDeleted: profile.isDeleted
    }, { where: { id: profile.id }}).then(function(dbProfile) {
        Promise.map(profile.ProbeProfiles, function(probe) {
            if(probe.id) {
                models.ProbeProfile.create({
                    label: probe.label,
                    upperThreshold: probe.upperThreshold,
                    lowerThreshold: probe.lowerThreshold,
                    probeChannel: probe.probeChannel,
                    profileId: dbProfile.id,
                    isDeleted: 0
                }).catch(function(err){
                    console.log(err);
                    console.log('Error saving the probe profile.')
                    cb(false);
                });
            }
            else {
                models.ProbeProfile.update({
                    label: probe.label,
                    upperThreshold: probe.upperThreshold,
                    lowerThreshold: probe.lowerThreshold,
                    probeChannel: probe.probeChannel,
                    profileId: dbProfile.id,
                    isDeleted: probe.isDeleted
                }, { where: { id: probe.id }}).catch(function(err){
                    console.log(err);
                    console.log('Error saving the probe profile.')
                    cb(false);
                });
            }
        });
    }).then(function() {
        cb(true);
    }).catch(function(err){
        console.log(err);
        console.log('Error saving the profile.')
        cb(false);
    });
};

module.exports.getProfiles = getProfiles;
module.exports.getProfile = getProfile;
module.exports.saveProfile = saveProfile;
module.exports.updateProfile = updateProfile;