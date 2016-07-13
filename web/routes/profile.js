var express = require('express');
var router = express.Router();
var profilesRepo = require('../dal/profilesRepo');

var getProfiles = function(profiles) {
    console.log('controller', profiles);
    res.json(profiles);
};

router.get('/', function(req, res) {
    if(req.query.id) {
        profilesRepo.getProfile(req.query.id, function(profile) {
            console.log('controller', profile);
            res.json(profile);
        });
    }
    else {
        profilesRepo.getProfiles(function(profiles) {
            console.log('controller', profiles);
            res.json(profiles);
        });
    }
});

router.post('/', function(req, res) {
    console.log('post');
    profilesRepo.saveProfile(req.body.profile, function() {
        res.send(true);
    });
});

router.put('/', function(req, res) {
    console.log('put');
    profilesRepo.updateProfile(req.body.profile, function() {
        res.send(true);
    });
});

module.exports = router;