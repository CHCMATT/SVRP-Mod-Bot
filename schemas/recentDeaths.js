const mongoose = require('mongoose');

const reqString = {
	type: String,
	required: true,
};

const recentDeathsSchema = mongoose.Schema({
	victimHex: reqString,
	killerHex: reqString,
	killerWeapon: reqString,
	deathTime: reqString,
});

module.exports = mongoose.model('recent-deaths', recentDeathsSchema);
