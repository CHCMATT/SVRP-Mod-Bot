module.exports = {
	name: 'ping',
	description: 'Replies with Pong!',
	permission: [
		{
			id: '757627529103409283', // @everyone in Crew Discord
			type: 'ROLE',
			permission: true,
		},
	],
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};
