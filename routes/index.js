var express = require('express');

var router = express.Router();

gameList = [];

router.get('/', function(req, res) {
	res.render('partials/index',{
        footer_title:" How to start ?",
        footer_content:" You can join and exiting game - click 'Join' with the correct code as input, You can start a new game by clicking 'New-Game'"
    });
});

router.get('/game/:token/:user', function(req, res) {
	var token = req.params.token;
    var user = req.params.user;
    res.render('partials/game', {
        title: 'Click Game',
        user: user,
        token: token,
        js: 'game.js',
		isHost: req.flash('isHost'),
		rows: req.flash('rows'),
		cols: req.flash('cols'),
		minPlayers: req.flash('minPlayers'),
		freezeTime: req.flash('freezeTime')
	
    });
});

module.exports = router;