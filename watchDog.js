const getDB = require('./watchedDB');

module.exports = (client) => {
	client.on('messageCreate', async (message) => {
		const name = message.channel.name;
		if (name == 'join-leave-log-main') {
			watchedCheck(message.content, message.guild);
			staffCheck(message.content, message.guild);
		}
	});
};

async function watchedCheck(discordmessage, guild) {
	const split = discordmessage.split('\n');
	const joinleave = split[0].split(' ')[2];
	const playerID = split[2].split(': ')[1];
	const charName = split[3].split(': ')[1];
	const hex = split[5].split(':')[2];
	if (joinleave === 'Joined') {
		const isWatched = await getDB.checkWatched(hex);
		if (isWatched) {
			const now = Math.floor(new Date().getTime() / 1000.0);
			const time = `<t:${now}:R>`;
			text = `❗ A player to watch joined the server ${time} with Player ID \`${playerID}\` with Hex ID \`${hex}\` and is playing Character \`${charName}\`.`;
			ch = guild.channels.cache.get('888606131683987456');
			await ch.send(text);
		}
		else {
			return;
		}
	}
	else {
		return;
	}
}

async function staffCheck(discordmessage, guild) {
	const split = discordmessage.split('\n');
	const joinleave = split[0].split(' ')[2];
	const hex = split[5].split(':')[2];
	const charName = split[3].split(': ')[1];
	const isStaff = await getDB.checkStaff(hex);
	if (isStaff) {
		if (joinleave === 'Joined') {
			const now = Math.floor(new Date().getTime() / 1000.0);
			const time = `<t:${now}:f>`;
			text = `🛠 Staff member with hex \`${hex}\` joined the server at ${time} and is playing Character \`${charName}\`.`;
			ch = guild.channels.cache.get('888606131683987456');
			await ch.send(text);
		}
		else if (joinleave === 'Dropped') {
			const now = Math.floor(new Date().getTime() / 1000.0);
			const time = `<t:${now}:f>`;
			text = `🛠 Staff member with hex \`${hex}\` left the server at ${time} and played for a total time of ``.`;
			ch = guild.channels.cache.get('888606131683987456');
			await ch.send(text);
		}
		else {
			console.log('There was an error parsing the information found in the logs.');
			return;
		}
	}
	else {
		return;
	}
}