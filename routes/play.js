var express = require('express');
var util = require('../config/utils.js');

var router = express.Router();

router.post('/', function(req, res) {
    var user = req.body.user; 
    var token;
	var isHost;
    if("key" in req.body){
        token=req.body.key;
		isHost = false;
	}
    else{
        token=util.randomString(20);
		isHost = true;
		req.flash('rows',req.body.rows);
		req.flash('cols',req.body.cols);
		req.flash('minPlayers',req.body.minPlayers);
		req.flash('freezeTime',req.body.freezeTime);
	}
	req.flash('isHost',isHost);
    res.redirect('/game/' + token + '/' + user);
});

module.exports = router;