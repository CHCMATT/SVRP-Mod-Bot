const getDB = require('./watchedDB');

module.exports = (client) => {
	client.on('messageCreate', async (message) => {
		const name = message.channel.name;
		if (name == 'join-leave-log-main') {
			joinLeave(message.content, message.guild);
		}
	});
};

async function joinLeave(discordmessage, guild) {
	const split = discordmessage.split('\n');
	const joinleave = split[0].split(' ')[2];
	const playerID = split[2].split(': ')[1];
	const charName = split[3].split(': ')[1];
	const hex = split[5].split(':')[2];
	if (joinleave === 'Joined') {
		const isWatched = await getDB.checkHex(hex);
		if (isWatched) {
			const now = Math.floor(new Date().getTime() / 1000.0);
			const time = `<t:${now}:R>`;
			text = `❗ A player to watch joined the server ${time} with Player ID \`${playerID}\` with Hex ID \`${hex}\` and is playing Character \`${charName}\`.`;
			ch = guild.channels.cache.get('757627529103409283');
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
