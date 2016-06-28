var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    if(req.query.id) {
        res.json({ id: 1, name: 'Brisket', description: 'Franklin\'s style brisket.'});
    }
    else {
        res.json({ profiles: [ { id: 1, name: 'Pulled Pork' } ] });
    }
});