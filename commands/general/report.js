const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    name: 'report',
    description: 'reports a user',
    usage: 'Report target',
    aliases: ['member-report', 'user-report'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}
module.exports.execute = async(client, msg, args, data) => {
    const tag = msg.mentions.users.first()
    if (!tag) return msg.reply('You must mention a user before you can report it!')

    const reason = msg.content.split(' ').slice(2).join(' ');
    if (!reason) return msg.reply('You must put a reason to report this user!')

    const avatar = msg.author.displayAvatarURL();

    const reportlog = new Discord.MessageEmbed()
        .setColor(client.config.color)
        .setDescription(`Name: ${msg.author.username}\n\nReported user: ${tag}\n\nReason: ${reason}`)
        .setThumbnail(`${avatar}`)
        .setFooter('Made by The Lost Bandits#6999 (Report System)')
    client.channels.cache.get(client.config.reportchannel).send(reportlog)
    msg.delete()
    msg.channel.stopTyping()
}