const watchedDB = require('../watchedDB');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'listdeaths',
	description: 'Lists all of the information from the Recent Deaths database.',
	permission: [
		{
			id: '757632405371879655', // Management
			type: 'ROLE',
			permission: true,
		},
		{
			id: '757632408484053102', // Administration
			type: 'ROLE',
			permission: true,
		},
		{
			id: '757627529103409283', // @everyone in Crew Discord
			type: 'ROLE',
			permission: false,
		},
	],
	async execute(interaction) {
		const hexList = [];
		const hexArray = await watchedDB.listDeaths();
		if (hexArray.length > 0) {
			hexArray.forEach((element) => {
				hexList.push(element.victimHex);
			});

			let descList = '';

			for (i = 0; i < hexList.length; i++) {
				descList = descList.concat('\n', `• **${i + 1}:** ${hexList[i]}`);
			}

			const hexListEmbed = new MessageEmbed()
				.setColor('#0099ff')
				.setTitle('List of all the hexes in the Recent Deaths database')
				.setDescription(descList)
				.setTimestamp();

			interaction.reply({ embeds: [hexListEmbed] });
		}
		else {
			const descList = 'There have not been any deaths recently.';
			const hexListEmbed = new MessageEmbed()
				.setColor('#0099ff')
				.setTitle('List of all the hexes in the Recent Deaths database')
				.setDescription(descList)
				.setTimestamp();

			interaction.reply({ embeds: [hexListEmbed] });
		}
	},
};
