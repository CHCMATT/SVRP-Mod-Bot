const mongo = require('./mongo');
const watchedPlayers = require('./schemas/watchedPlayers');
const recentDeaths = require('./schemas/recentDeaths');

module.exports.checkWatched = async (hexID) => {
	return await mongo().then(async () => {
		try {
			const result = await watchedPlayers.findOne({
				hexID,
			});
			let found = false;
			if (result) {
				found = true;
			}
			else {
				return;
			}
			return found;
		}
		finally {
			// mongoose.connection.close();
		}
	});
};

module.exports.addHex = async (hexID) => {
	return await mongo().then(async () => {
		try {
			await watchedPlayers.findOneAndUpdate(
				{ hexID },
				{ hexID },
				{ upsert: true, new: true },
			);
		}
		finally {
			// mongoose.connection.close();
		}
	});
};

module.exports.removeHex = async (hexID) => {
	return await mongo().then(async () => {
		try {
			const checkForHex = await watchedPlayers.findOne({
				hexID,
			});
			if (checkForHex) {
				await watchedPlayers.findOneAndDelete({
					hexID,
				});
				return true;
			}
			else {
				return false;
			}
		}
		finally {
			// mongoose.connection.close();
		}
	});
};

module.exports.listWatched = async () => {
	return await mongo().then(async () => {
		try {
			const list = await watchedPlayers.find({}, { hexID: 1, _id: 0 });
			return list;
		}
		finally {
			// mongoose.connection.close();
		}
	});
};

module.exports.addDeath = async (victimHex, killerHex, killerWeapon, deathTime) => {
	return await mongo().then(async () => {
		try {
			await recentDeaths.findOneAndUpdate(
				{ victimHex },
				{ victimHex, killerHex, killerWeapon, deathTime },
				{ upsert: true, new: true },
			);
		}
		finally {
			// mongoose.connection.close();
		}
	});
};

module.exports.checkDeath = async (victimHex) => {
	return await mongo().then(async () => {
		try {
			const result = await recentDeaths.findOne({
				victimHex,
			});
			return result;
		}
		finally {
			// mongoose.connection.close();
		}
	});
};

module.exports.removeDeath = async (victimHex) => {
	return await mongo().then(async () => {
		try {
			await recentDeaths.findOneAndDelete({
				victimHex,
			});
		}
		finally {
			// mongoose.connection.close();
		}
	});
};

module.exports.listDeaths = async () => {
	return await mongo().then(async () => {
		try {
			const deathList = await recentDeaths.find({}, { victimHex: 1, _id: 0 });
			return deathList;
		}
		finally {
			// mongoose.connection.close();
		}
	});
};