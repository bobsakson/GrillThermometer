var express = require('express');
var router = express.Router();
var profilesRepo = require('../dal/profilesRepo');

var getProfiles = function(profiles) {
    console.log('controller', profiles);
    res.json(profiles);
};

router.get('/', function(req, res) {
    if(req.query.id) {
        res.json({ id: 1, name: 'Brisket', description: 'Franklin\'s style brisket.'});
    }
    else {
        profilesRepo.getProfiles(function(profiles) {
            console.log('controller', profiles);
            res.json(profiles);
        });
        //res.json({ profiles: [ { id: 1, name: 'Pulled Pork' } ] });
    }
});

module.exports = router;