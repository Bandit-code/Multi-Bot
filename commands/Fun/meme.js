const Discord = require('discord.js');
const randomPuppy = require('random-puppy');

module.exports = {
    name: 'meme',
    description: 'Sends a meme',
    usage: 'Meme',
    aliases: ['memes'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}
module.exports.execute = async(client, msg, args, data) => {
    msg.delete()
          const subReddits = ["meme", "me_irl", "photoshop", "Photoshopbattles"]
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];
        const img = await randomPuppy(random);

        const embed = new Discord.MessageEmbed()
            .setTitle(`Generated Meme!`)
            .setURL(`http://reddit.com/${random}`)
            .setImage(img)
            .setFooter(`${msg.guild.name} |  Made by The Lost Bandits#6999`, msg.guild.iconURL({ dynamic: true }))
            .setColor(client.config.color)

        msg.channel.send(embed);
}