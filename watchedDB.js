const mongo = require('./mongo');
const watchedPlayers = require('./schemas/watchedPlayers');

module.exports.checkHex = async (hexID) => {
	return await mongo().then(async (mongoose) => {
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
			mongoose.connection.close();
		}
	});
};

module.exports.addHex = async (hexID) => {
	return await mongo().then(async (mongoose) => {
		try {
			await watchedPlayers.findOneAndUpdate(
				{ hexID },
				{ hexID },
				{ upsert: true,
					new: true },
			);
		}
		finally {
			mongoose.connection.close();
		}
	});
};

module.exports.removeHex = async (hexID) => {
	return await mongo().then(async (mongoose) => {
		try {
			const checkForHex = await watchedPlayers.findOne({
				hexID,
			});
			if (checkForHex) {
				await watchedPlayers.findOneAndDelete(
					{
						hexID,
					},
				);
				return true;
			}
			else {
				return false;
			}
		}
		finally {
			mongoose.connection.close();
		}
	});
};

module.exports.listHexes = async () => {
	return await mongo().then(async (mongoose) => {
		try {
			const list = (await watchedPlayers.find({}, { hexID: 1, _id: 0 }));
			return list;
		}
		finally {
			mongoose.connection.close();
		}
	});
};