var crypto = require('crypto');

var gameList = [];

module.exports = {
	
	getgameList: function(){
		return gameList;
	},
	
    encrypt: function (plainText) {
        return crypto.createHash('md5').update(plainText).digest('hex');
    },

    randomString: function (length) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz';

        var string = '';

        for (var i = 0; i < length; i++) {
            var randomNumber = Math.floor(Math.random() * chars.length);
            string += chars.substring(randomNumber, randomNumber + 1);
        }

        return string;
    },

    randomLetter : function(){
        var alpha = "abcdefghijklmnopqrstuvwxyz";
        var rand = alpha[Math.floor(Math.random() * (alpha.length-1))];
        return rand;
    }
};