const fetch = require("node-fetch");
const Discord = require('discord.js');
const base = "https://threejs.org/docs/index.html#";

module.exports = {
	async body(url) {
		let body = await fetch(url)
			.then(res => res.text());

		let res = body.slice(body.indexOf("<body>") + 6, body.indexOf("</p>"));
		let ret = res.replace(/<code>/g, "\`\`\`")
			.replace(/<\/code>/g, "\`\`\`")
			.replace(/<br \/>/g, "")
			.replace(/<p>/g, "")
			.replace(/<\/p>/g, "")
			.replace(/<\/h1>/g, "**")
			.replace(/<h1>/g, "**")
			.replace(/<\/html>/g, "")
			.replace(/<\/body>/g, "")
			.replace(/<div>/g, "")
			.replace(/<\/div>/g, "")
			.replace(/<h2>/g, "")
			.replace(/<\/h2>/g, "")
			.trim();


		return ret;
	},
	async search(msg, args, link) {
		var lk = ``;
		for (x in link) {
			if (!link[2 * x]) break;
			let a = link[2 * x].toLowerCase().indexOf(args.join().trim().toLowerCase());
			if (a !== -1) {
				lk += `[**${link[2 * x]}**](${base+link[(2 * x) + 1]})\n`;
			}
		}
		if (!lk.length) return msg.reply("I couldn't find anything..");
		let embed = new Discord.MessageEmbed()
			.setAuthor("Three.js docs","https://aws1.discourse-cdn.com/standard17/uploads/threejs/original/2X/c/c74c5243388bbfa21a39c3e824ddba702a623dec.png", "https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene" )
			.setThumbnail("https://aws1.discourse-cdn.com/standard17/uploads/threejs/original/2X/c/c74c5243388bbfa21a39c3e824ddba702a623dec.png")
			.setDescription(lk)
			.setColor("GREEN")
			.setTimestamp();
		msg.channel.send(embed)
	}
}