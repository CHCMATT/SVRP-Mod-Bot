const watchedDB = require('../watchedDB');

module.exports = {
	name: 'checkwatched',
	description: 'Checks a hex to see if it is located in the Watched Players database.',
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
	options: [
		{
			name: 'hex',
			description: 'Steam Hex ID',
			type: 'STRING',
			required: true,
		},
	],
	async execute(interaction) {
		const hex = interaction.options.getString('hex');
		const checkForHex = await watchedDB.checkWatched(hex);
		if (checkForHex) {
			interaction.reply(`Steam Hex \`${hex}\` **was found** in the database!`);
		}
		else {
			interaction.reply(`Steam Hex \`${hex}\` **was not found** in the database.`);
		}
	},
};