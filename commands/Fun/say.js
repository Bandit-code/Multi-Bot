const discord = require('discord.js')
const { MessageEmbed } = require('discord.js');
const message = require('../../events/message');

module.exports = {
    name: 'say',
    description: 'says a message as the bot client',
    usage: '<Say>',
    aliases: ['say', 'message'],
    permissions: ['MANAGE_MESSAGES'],
    botPermissions: ['MANAGE_MESSAGES'],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}
module.exports.execute = async(client, msg, args, data) => {
    msg.delete()
    const messagesay = args.join(" ")
    const sayembed = new discord.MessageEmbed()
        .setTitle(`${msg.author.tag} Says:`)
        .setDescription(`${messagesay}`)
        .setFooter('Made by The Lost Bandits#6999')
        .setColor(client.config.color)
        .setTimestamp();
    msg.channel.send(sayembed)
}