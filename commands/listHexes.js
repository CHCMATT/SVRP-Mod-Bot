const watchedDB = require('../watchedDB');
const { MessageEmbed } = require('discord.js');


module.exports = {
	name: 'listhex',
	description: 'Lists all of the hexes from the Watched Players database.',
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
			id: '761125860324671499', // Moderator
			type: 'ROLE',
			permission: true,
		},
		{
			id: '757627529103409283', // @everyone in Crew Discord
			type: 'ROLE',
			permission: false,
		},
		{
			id: '888206953917075498', // @everyone in Law Discord
			type: 'ROLE',
			permission: false,
		},
	],
	async execute(interaction) {
		const hexList = [];
		const hexArray = await watchedDB.listHexes();
		hexArray.forEach(element => {
			hexList.push(element.hexID);
		});

		let descList = '';

		for (i = 0; i < hexList.length; i++) {
			descList = descList.concat('\n', `• **${i + 1}:** ${hexList[i]}`);
		}

		const hexListEmbed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('List of all the hexes in the Watched Players database')
			.setDescription(descList)
			.setTimestamp();

		interaction.reply({ embeds: [hexListEmbed] });

	},
};