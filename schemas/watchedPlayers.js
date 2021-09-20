const mongoose = require('mongoose');

const reqString = {
	type: String,
	required: true,
};

const watchedSchema = mongoose.Schema({
	hexID: reqString,
});

module.exports = mongoose.model('watched-players', watchedSchema);
