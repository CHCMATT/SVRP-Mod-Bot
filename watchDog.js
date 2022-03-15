const getDB = require('./watchedDB');

module.exports = (client) => {
	client.on('messageCreate', async (message) => {
		const name = message.channel.name;
		if (name == 'join-leave-log-main-mod') {
			watchedCheck(message.content, message.guild);
			combatLogCheck(message.content, message.guild);
		}
		else if (name == 'death-log-main-mod') {
			addDeath(message.content, message.guild);
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

async function addDeath(discordmessage) {
	const split = discordmessage.split('\n');
	const victimHex = split[9].split(':')[2];
	const killerHex = split[10].split(':')[2];
	global.killerWeapon = split[4].split(': ')[1];
	if (global.killerWeapon == 'null') {
		global.killerWeapon = 'no_weapon';
	}
	const now = Math.floor(new Date().getTime() / 1000.0);
	if (killerHex) {
		await getDB.addDeath(victimHex, killerHex, global.killerWeapon, now);
		setTimeout(async function() {
			getDB.removeDeath(victimHex);
		}, 30000);
	}
}

async function combatLogCheck(discordmessage, guild) {
	const split = discordmessage.split('\n');
	const joinleave = split[0].split(' ')[2];
	const logOutHex = split[5].split(':')[2];
	const charName = split[3].split(': ')[1];
	const playerID = split[2].split(': ')[1];
	const leaveReason = split[6].split(': ')[1];
	const now = Math.floor(new Date().getTime() / 1000.0);
	const time = `<t:${now}:t>`;
	if (joinleave === 'Dropped') {
		if (leaveReason === 'Exiting') {
			const diedRecently = await getDB.checkDeath(logOutHex);
			if (diedRecently) {
				const diffTime = now - diedRecently.deathTime;
				const killerWeapon = diedRecently.killerWeapon;
				const killerHex = diedRecently.killerHex;
				text = `❗ [\`${playerID}\`] \`${charName}\` (\`${logOutHex}\`) may have combat logged at ${time}. They logged out \`${diffTime}\` seconds after dying to \`${killerHex}\` who had \`${killerWeapon}\` equipped.`;
				await guild.channels.cache.get('941191317067825204').send(text);
			}
		}
	}
}