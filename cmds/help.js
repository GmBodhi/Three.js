const { prefix } = require('../config.js');
const Discord = require('discord.js');

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	usage: '[command name]',
	async execute(message, args){
		let embed = new Discord.MessageEmbed()
		.setTitle("HELP MENU")
		.setColor("GREEN")
		.setTimestamp()
		.setThumbnail("https://aws1.discourse-cdn.com/standard17/uploads/threejs/original/2X/c/c74c5243388bbfa21a39c3e824ddba702a623dec.png");
		const { commands } = message.client;
		if (!args.length) {
			embed.setDescription(`Here\'s a list of all my commands:\n\n`+
		commands.map(command => "`" + command.name + "` ~ " + command.description).join('\n')+
			`\n\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

			return message.channel.send(embed)
				.catch(error => {
					console.error(`Some error occured ${message.author.tag}.\n`, error);
					message.reply('Some error occured. Here is the error :' + error);
				});
		}


		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}
		embed.setDescription(
			`**Description:**  ${command.description}\n
			**Usage:**  \`\`\`${prefix}${command.name} ${command.usage}\`\`\`\n`)
			.setTitle(`Command ~ ${command.name}`);


		message.channel.send(embed);
	},
};
