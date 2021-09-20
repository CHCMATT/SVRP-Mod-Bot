module.exports = {
	name: 'ping',
	description: 'Replies with Pong!',
	permission: [
		{
			id: '757627529103409283', // @everyone in Crew Discord
			type: 'ROLE',
			permission: true,
		},
		{
			id: '888206953917075498', // @everyone in Law Discord
			type: 'ROLE',
			permission: false,
		},
	],
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};