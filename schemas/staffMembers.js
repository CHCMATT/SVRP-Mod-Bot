const mongoose = require('mongoose');

const reqString = {
	type: String,
	required: true,
};

const staffSchema = mongoose.Schema({
	hexID: reqString,
	lastJoined,
	weeklyHours,
});

module.exports = mongoose.model('staff-members', staffSchema);
