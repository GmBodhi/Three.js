const Discord = require('discord.js');
const docs = require('./list.json');
const base = "https://threejs.org/docs/index.html#";
const base2 = "https://threejs.org/docs/";
const des = require('../des');

//entries
let l1 = Object.entries(docs.en.Manual);
let l2 = Object.entries(docs.en.Reference);
let l3 = Object.entries(docs.en.Examples);
let l4 = Object.entries(docs.en['Developer Reference']);

let link = [];

//for loop 1
let lk1 = [];
for (x of l1) {
	lk1 = Object.keys(x[1]);
	var j = 0;
	for (i in x[1]) {
		link.push(lk1[j], `${x[1][i]}`);
		j++;
	}
}
//foor loop 2
let lk2 = [];
for (x of l2) {
	lk2 = Object.keys(x[1]);
	var j = 0;
	for (i in x[1]) {
		link.push(lk2[j], `${x[1][i]}`);
		j++;
	}
}
//for loop 3
let lk3 = [];
for (x of l3) {
	lk3 = Object.keys(x[1]);
	var j = 0;
	for (i in x[1]) {
		link.push(lk3[j], `${x[1][i]}`);
		j++;
	}
}
//for loop 4
let lk4 = [];
for (x of l4) {
	lk4 = Object.keys(x[1]);
	var j = 0;
	for (i in x[1]) {
		link.push(lk4[j], `${x[1][i]}`);
		j++;
	}
}
//console.log(link);




let embed = new Discord.MessageEmbed()
	.setURL("https://threejs.org/")
	.setTitle("Three.js Docs")
	.setAuthor("Three.js docs","https://aws1.discourse-cdn.com/standard17/uploads/threejs/original/2X/c/c74c5243388bbfa21a39c3e824ddba702a623dec.png", "https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene" )
	.setThumbnail("https://aws1.discourse-cdn.com/standard17/uploads/threejs/original/2X/c/c74c5243388bbfa21a39c3e824ddba702a623dec.png")
	.setTimestamp()
	.setColor("GREEN");

//command start..!
module.exports = {
	name: 'docs',
	description: 'Query to Three.js documentation..!',
	usage: '<query>',
	async execute(message, args) {
		if (!args[0]) {
			embed.setColor("RED")
				.setTitle('Incorrect usage')
				.setDescription("```?docs <query>```")
			return message.channel.send(embed);
		};
		let indx = link.findIndex(e => e.toLowerCase() == args.join(" ").toLowerCase());
		if (indx == -1){
			return des.search(message, args, link);
		}
		let res = await des.body(base2 + link[indx + 1] + '.html');


		embed.setDescription(res)
			.setURL(base + link[indx + 1])
			.setTitle(link[indx]);
		message.channel.send(embed);
	}
}