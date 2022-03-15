const { Client, Collection, Intents } = require('discord.js');
const mongo = require('./mongo');
const fs = require('fs');

const config = require('./config.json');

const messageLog = require('./watchDog');

const interact = require('./interactions');

const myIntents = new Intents();
myIntents.add(
	Intents.FLAGS.GUILDS,
	Intents.FLAGS.GUILD_MEMBERS,
	Intents.FLAGS.GUILD_BANS,
	Intents.FLAGS.GUILD_INVITES,
	Intents.FLAGS.GUILD_PRESENCES,
	Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
	Intents.FLAGS.DIRECT_MESSAGES,
);
const client = new Client({ intents: myIntents });
client.commands = new Collection();
client.buttons = new Collection();

client.once('ready', async () => {
	console.log('[app-mod.js] The client is starting up!');
	client.user.setPresence({
		status: 'online',
		activities: {
			name: 'For Naughty Folks',
			type: 'WATCHING',
		},
	});
	await mongo().then((mongoose) => {
		try {
			console.log('[app-mod.js] Connected to mongo!');
		}
		finally {
			mongoose.connection.close();
		}
	});

	const commandFiles = fs
		.readdirSync('./commands')
		.filter((file) => file.endsWith('.js')); // Find all the files in the command folder that end with .js
	const cmdList = []; // Create an empty array for pushing each command file to
	for (const file of commandFiles) {
		// For each file in command files group
		const command = require(`./commands/${file}`); // Get the information that is in the file
		console.log(`[app-mod.js] Added ${file}!`); // Log that the command was added
		cmdList.push(command); // push that command to the array
		client.commands[command.name] = command; // Save the command name and command information to the client
	}
	const allCommands = await client.guilds.cache
		.get('888571619734339594')
		.commands.set(cmdList) // Sets all the commands
		.catch(console.error);
	const cmdIDs = allCommands.keys();
	for (let i = 0; i < allCommands.size; i++) {
		const cmdID = cmdIDs.next().value;
		const cmdName = await allCommands.get(cmdID).name;
		let permission = client.commands[cmdName].permission;
		if (permission != undefined) {
			// If no permissions are given, don't update any permissions
			if (permission.length == undefined) {
				// If the permission isn't already an array (more than 1 permission), turn it into an array as that is what the function requires
				permission = [permission];
			}
			client.guilds.cache
				.get('888571619734339594')
				.commands.permissions.set({ command: cmdID, permissions: permission })
				.catch(console.error);
		}
	}
	interact(client); // Fire whenever an interaction is created
	messageLog(client);
	console.log('[app-mod.js] The client is ready!');
});

client.login(config.token);
