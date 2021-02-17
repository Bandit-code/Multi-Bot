const discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Pings the bot from a local IP',
    usage: 'Ping [replys with ping!]',
    aliases: ['ms'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}
module.exports.execute = async(client, msg, args, data) => {
  msg.delete()
    const sayembed = new discord.MessageEmbed()
    .setTitle(`Bots latency`)
    .setDescription(`Pong!\n🏓Latency is ${Date.now() - msg.createdTimestamp}ms\n🏓API Latency is ${Math.round(client.ws.ping)}ms`)
    .setFooter(`${msg.guild.name} |  Made by The Lost Bandits#6999`, msg.guild.iconURL({ dynamic: true }))
    .setColor(client.config.color)
    .setTimestamp();
  await msg.channel.send(sayembed)
}