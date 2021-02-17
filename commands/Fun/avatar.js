const Discord = require('discord.js');

module.exports = {
    name: 'avatar',
    description: 'Sends your current pfp',
    usage: 'Avatar Sends pfp',
    aliases: ['pfp', 'av'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 5,
    ownerOnly: false
}
module.exports.execute = async(client, msg, args, data) => {
          const embed = new Discord.MessageEmbed()
          .setTitle(`Generated!`)
          .setFooter(`${msg.guild.name} |  Made by The Lost Bandits#6999`, msg.guild.iconURL({ dynamic: true }))
          .setColor(client.config.color)
          .setImage(msg.author.displayAvatarURL({dynamic: true, format: 'png', size: 512}));
          
          await msg.channel.send(embed)
}