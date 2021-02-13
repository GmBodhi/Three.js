const Discord = require("discord.js");
const fs = require('fs');
const config = require('./config')


let bot = new Discord.Client({
	presence: {status: 'online',
	activity:{
		name:`${config.prefix}help`,
		type:'LISTENING'
	}}
});


//commands
bot.commands = new Discord.Collection();

const commandFiles = fs
	.readdirSync('./cmds')
	.filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./cmds/${file}`);
	bot.commands.set(command.name, command);
}


bot.on('message', message => {


	//commands
	if (message.author.bot) return;
	if (message.channel.type == "dm") return message.channel.send("Oops.. you can only test me in a server\nI'm sorry");
	if (message.content.startsWith(config.prefix)) {
		let args = message.content.slice(config.prefix.length).trim().split(' ');
		let command = args.shift().toLowerCase();

		switch (command) {
			default:
			try {
						let cmd = bot.commands.get(command);
						if (!cmd) return;
						cmd.execute(message, args);
					} catch (error) {
						//console.error(error);
						message.reply('there was an error trying to execute that command!\n' + error);
					}
				break;
		}

			
	}


});

//logging bot in
bot.on('ready', () => { 
	console.log(`Logged in as ${bot.user.tag}.`);
});


require('./server')();
bot.login(config.token);
